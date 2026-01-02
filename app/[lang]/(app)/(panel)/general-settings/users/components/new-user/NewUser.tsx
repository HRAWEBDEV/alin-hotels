'use client';
import { ReactNode, useEffect, useState } from 'react';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type UserSchema,
 type UserCredentialsSchema,
 createUserSchema,
 createUserCredentialsSchema,
 defaultValues,
} from '../../schemas/userSchema';
import { Spinner } from '@/components/ui/spinner';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 usersBasePath,
 saveUser,
 getUser,
 updateUser,
 updateUserPassword,
} from '../../services/usersApiActions';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import NoItemFound from '../../../../components/NoItemFound';
import { type UsersConfig } from '../../services/usersConfigContext';
import {
 FieldGroup,
 Field,
 FieldLabel,
 FieldError,
} from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import RealPersonFinder from '../../../real-persons/components/real-person-finder/RealPersonFinder';
import {
 realPersonsBasePath,
 getPerson,
} from '../../../real-persons/services/personsApiActions';
import { useUserInfoContext } from '../../../../services/user-info/userInfoContext';

export default function NewUser({
 dic,
 userID,
 onSuccess,
 realPersonDic,
 onCancel,
}: {
 dic: UsersDictionary;
 userID?: number | null;
 realPersonDic: RealPersonsDictionary;
 onSuccess?: UsersConfig['users']['onNewUserSuccess'];
 onCancel?: UsersConfig['users']['onCancelNewUser'];
}) {
 const {
  data: { personID: activeUserID },
 } = useUserInfoContext();
 const [showRealPerson, setShowRealPerson] = useState(false);
 const [personID, setPersonID] = useState(0);
 const queryClient = useQueryClient();
 // form
 const {
  reset,
  register,
  setValue,
  formState: { errors },
  handleSubmit,
  setFocus: userInfoSetFocus,
 } = useForm<UserSchema>({
  resolver: zodResolver(createUserSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 const {
  reset: resetUserCredentials,
  register: registerUserCredentials,
  formState: { errors: userCredentialsErrors },
  handleSubmit: handleSubmitUserCredentials,
  setFocus,
 } = useForm<UserCredentialsSchema>({
  resolver: zodResolver(
   createUserCredentialsSchema({ dic, editMode: !!userID }),
  ),
  defaultValues: {
   confirmPassword: '',
   password: '',
   oldPassword: '',
  },
 });

 //
 const { mutate: mutateUserInfo, isPending: mutateUserInfoPending } =
  useMutation({
   mutationFn({ userName, password }: UserSchema & { password: string }) {
    const newUser = {
     personID,
     userName,
     disabled: false,
     addByPersonID: activeUserID,
    };
    return userID
     ? updateUser({ ...newUser })
     : saveUser({ ...newUser, password });
   },
   onSuccess(res) {
    reset();
    userInfoSetFocus('userName');
    queryClient.invalidateQueries({
     queryKey: [usersBasePath, 'all'],
    });
    if (onSuccess) {
     onSuccess({
      mode: userID ? 'edit' : 'add',
      userID: res.data,
     });
    }
    if (userID) {
     queryClient.invalidateQueries({
      queryKey: [usersBasePath, 'user', userID.toString()],
     });
    } else {
     toast.success(dic.newUser.newUserAdded);
     resetUserCredentials();
     setPersonID(0);
    }
    setTimeout(() => {
     userInfoSetFocus('userName');
    }, 200);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });
 //

 const {
  mutate: mutateUserCredentials,
  isPending: mutateUserCredentialsPending,
 } = useMutation({
  mutationFn({
   confirmPassword,
   password,
   oldPassword,
  }: UserCredentialsSchema) {
   return updateUserPassword({
    personID: personID,
    confirmNewPassword: confirmPassword,
    oldPassword: oldPassword!,
    newPassword: password,
   });
  },
  onSuccess(res) {
   resetUserCredentials();
   queryClient.invalidateQueries({
    queryKey: [usersBasePath, 'all'],
   });
   if (onSuccess) {
    onSuccess({
     mode: userID ? 'edit' : 'add',
     userID: res.data,
    });
   }
   if (userID) {
    queryClient.invalidateQueries({
     queryKey: [usersBasePath, 'user', userID.toString()],
    });
   } else {
    toast.success(dic.newUser.updatePasswordSuccess);
   }
  },
  onError(err: AxiosError<string>) {
   toast.error(err.response?.data);
  },
 });
 // get person
 const {
  data: personData,
  isLoading: personLoading,
  isSuccess: personIsSuccess,
 } = useQuery({
  enabled: !!personID,
  queryKey: [realPersonsBasePath, 'person', personID.toString()],
  async queryFn({ signal }) {
   const res = await getPerson({
    personID,
    signal,
   });
   return res.data;
  },
 });
 //
 const { data, isLoading, isError, isSuccess } = useQuery({
  enabled: !!userID,
  queryKey: [usersBasePath, 'user', userID?.toString()],
  refetchOnWindowFocus: false,
  async queryFn({ signal }) {
   const res = await getUser({ signal, userID: userID! });
   return res.data;
  },
 });

 useEffect(() => {
  if (!userID) return;
  reset();
  resetUserCredentials();
 }, [userID, reset, resetUserCredentials]);

 useEffect(() => {
  if (!userID || !isSuccess) return;
  setValue('userName', data.userName || '');
  setValue('name', data.name || '');
  setValue('lastName', data.lastName || '');
  setValue('phoneNumber', data.phoneNumber || '');
  setPersonID(data.personID);
 }, [isSuccess, userID, data, setValue]);

 function getWrapper(children: ReactNode) {
  const className = 'w-[min(25rem,100%)] mx-auto';
  return userID ? (
   <div className={className}>{children}</div>
  ) : (
   <form className={className}>{children}</form>
  );
 }

 function getWrapperBox(children: ReactNode) {
  const className = 'mb-2 p-4 bg-background border border-input rounded-md';
  return userID ? (
   <form className={className}>{children}</form>
  ) : (
   <div className={className}>{children}</div>
  );
 }

 if (userID && isError) return <NoItemFound />;
 if (userID && isLoading)
  return (
   <div className='min-h-40 grid place-content-center text-primary'>
    <Spinner className='size-12' />
   </div>
  );

 return getWrapper(
  <>
   {getWrapperBox(
    <div>
     <Field className='gap-2' data-invalid={!!errors.userName}>
      <FieldLabel htmlFor='userName'>{dic.newUser.form.userName} *</FieldLabel>
      <InputGroup data-invalid={!!errors.userName}>
       <InputGroupInput id='userName' {...register('userName')} />
      </InputGroup>
     </Field>
     <div className='mt-4'>
      {personID && personData && personIsSuccess ? (
       <div className='p-4 border-2 border-dashed border-teal-400 dark:border-teal-600 bg-teal-50 dark:bg-teal-950 rounded-md'>
        <div>
         <FieldGroup className='gap-5 mb-4'>
          <div className='grid gap-2 grid-cols-2'>
           <Field className='gap-2'>
            <FieldLabel htmlFor='name'>{dic.newUser.form.name}</FieldLabel>
            <InputGroup>
             <InputGroupInput
              id='name'
              autoComplete='off'
              readOnly
              value={personData.name || ''}
             />
            </InputGroup>
           </Field>
           <Field className='gap-2'>
            <FieldLabel htmlFor='lastName'>
             {dic.newUser.form.lastName}
            </FieldLabel>
            <InputGroup>
             <InputGroupInput
              id='lastName'
              readOnly
              value={personData.lastName || ''}
             />
            </InputGroup>
           </Field>
          </div>
          <Field className='gap-2'>
           <FieldLabel htmlFor='phoneNumber'>
            {dic.newUser.form.phoneNumber}
           </FieldLabel>
           <InputGroup>
            <InputGroupInput
             id='phoneNumber'
             readOnly
             value={personData.mobileNo || ''}
            />
           </InputGroup>
          </Field>
         </FieldGroup>
        </div>
        <div className='flex justify-end'>
         <Button
          disabled={isLoading}
          type='button'
          variant={'outline'}
          onClick={() => setShowRealPerson(true)}
         >
          {isLoading && <Spinner />}
          {dic.newUser.form.editPerson}
         </Button>
        </div>
       </div>
      ) : (
       <div className='h-20 border-2 border-dashed border-primary bg-sky-100 dark:bg-sky-900 rounded-md grid place-content-center'>
        <Button
         disabled={personLoading}
         type='button'
         onClick={() => setShowRealPerson(true)}
        >
         {personLoading && <Spinner />}
         {dic.newUser.form.addPerson}
        </Button>
       </div>
      )}
     </div>
     {userID && (
      <div className='mt-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-4'>
       <Button
        type='button'
        disabled={mutateUserInfoPending}
        className='w-full sm:w-28'
        variant='outline'
        onClick={() => {
         onCancel?.({ mode: 'edit', userID });
        }}
       >
        {mutateUserInfoPending && <Spinner />}
        {dic.newUser.form.cancel}
       </Button>
       <Button
        type='submit'
        disabled={mutateUserInfoPending}
        className='w-full sm:w-28'
        onClick={(e) => {
         e.preventDefault();
         handleSubmit((data) => mutateUserInfo({ ...data, password: '' }))();
        }}
       >
        {mutateUserInfoPending && <Spinner />}
        {dic.newUser.form.confirm}
       </Button>
      </div>
     )}
    </div>,
   )}
   {getWrapperBox(
    <div>
     <FieldGroup className='gap-5'>
      {userID && (
       <Field
        className='gap-2'
        data-invalid={!!userCredentialsErrors.oldPassword}
       >
        <FieldLabel htmlFor='oldPassword'>
         {dic.newUser.form.oldPassword} *
        </FieldLabel>
        <InputGroup data-invalid={!!userCredentialsErrors.oldPassword}>
         <InputGroupInput
          id='oldPassword'
          autoComplete='off'
          type='password'
          {...registerUserCredentials('oldPassword')}
         />
        </InputGroup>
       </Field>
      )}
      <Field className='gap-2' data-invalid={!!userCredentialsErrors.password}>
       <FieldLabel htmlFor='password'>
        {dic.newUser.form.password} {userID ? dic.newUser.form.new : ''} *
       </FieldLabel>
       <InputGroup data-invalid={!!userCredentialsErrors.password}>
        <InputGroupInput
         id='password'
         autoComplete='off'
         type='password'
         {...registerUserCredentials('password')}
        />
       </InputGroup>
      </Field>
      <Field
       className='gap-2'
       data-invalid={!!userCredentialsErrors.confirmPassword}
      >
       <FieldLabel htmlFor='confirmPassword'>
        {dic.newUser.form.confirmPassword} {userID ? dic.newUser.form.new : ''}{' '}
        *
       </FieldLabel>
       <InputGroup data-invalid={!!userCredentialsErrors.confirmPassword}>
        <InputGroupInput
         autoComplete='off'
         type='password'
         id='confirmPassword'
         {...registerUserCredentials('confirmPassword')}
        />
       </InputGroup>
       {!!userCredentialsErrors.confirmPassword && (
        <FieldError>{userCredentialsErrors.confirmPassword.message}</FieldError>
       )}
      </Field>
     </FieldGroup>
     {userID && (
      <div className='mt-4 flex sm:justify-end'>
       <Button
        disabled={mutateUserCredentialsPending}
        type='submit'
        className='w-full sm:w-28'
        onClick={(e) => {
         e.preventDefault();
         handleSubmitUserCredentials((data) => {
          mutateUserCredentials(data);
         })();
        }}
       >
        {mutateUserCredentialsPending && <Spinner />}
        {dic.newUser.form.confirm}
       </Button>
      </div>
     )}
    </div>,
   )}
   {!userID && (
    <div className='mt-4 flex sm:justify-end'>
     <Button
      disabled={mutateUserInfoPending}
      type='submit'
      className='w-full sm:w-28'
      onClick={(e) => {
       e.preventDefault();
       if (!personID) {
        toast.error(dic.newUser.selectPerson);
        return;
       }
       handleSubmit((data) => {
        handleSubmitUserCredentials((credit) => {
         mutateUserInfo({ ...data, password: credit.password });
        })();
       })();
      }}
     >
      {mutateUserInfoPending && <Spinner />}
      {dic.newUser.form.confirm}
     </Button>
    </div>
   )}
   <RealPersonFinder
    dic={realPersonDic}
    open={showRealPerson}
    onOpenChange={(open) =>
     setShowRealPerson((pre) => (open === undefined ? !pre : open))
    }
    wrapperType={{
     personID,
     onChangePerson(personID) {
      setPersonID(personID);
      setShowRealPerson(false);
      setTimeout(() => {
       setFocus('password');
      }, 100);
     },
    }}
   />
  </>,
 );
}
