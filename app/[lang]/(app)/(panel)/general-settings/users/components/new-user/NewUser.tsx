'use client';
import { useEffect, useState } from 'react';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type UserSchema,
 createUserSchema,
 defaultValues,
} from '../../schemas/userSchema';
import { Spinner } from '@/components/ui/spinner';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 type SaveUserPackage,
 usersBasePath,
 saveUser,
 getUser,
 updateUser,
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

export default function NewUser({
 dic,
 userID,
 onSuccess,
 realPersonDic,
}: {
 dic: UsersDictionary;
 userID?: number | null;
 realPersonDic: RealPersonsDictionary;
 onSuccess?: UsersConfig['users']['onNewUserSuccess'];
 onCancel?: UsersConfig['users']['onCancelNewUser'];
}) {
 const [showRealPerson, setShowRealPerson] = useState(false);
 const [personID, setPersonID] = useState(0);
 const queryClient = useQueryClient();
 // form
 const {
  reset,
  register,
  setValue,
  formState: { errors },
 } = useForm<UserSchema>({
  resolver: zodResolver(createUserSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 //
 const {} = useMutation({
  mutationFn({}: UserSchema) {
   const newUser: SaveUserPackage = {
    personID: 0,
   };
   return userID ? updateUser(newUser) : saveUser(newUser);
  },
  onSuccess(res) {
   reset();
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
 }, [userID, reset]);

 useEffect(() => {
  if (!userID || !isSuccess) return;
  setValue('userName', data.userName || '');
  setValue('name', data.name || '');
  setValue('lastName', data.lastName || '');
  setValue('phoneNumber', data.phoneNumber || '');
  setPersonID(data.personID);
 }, [isSuccess, userID, data, setValue]);

 if (userID && isError) return <NoItemFound />;
 if (userID && isLoading)
  return (
   <div className='min-h-40 grid place-content-center text-primary'>
    <Spinner className='size-12' />
   </div>
  );
 return (
  <div role={userID ? 'none' : 'form'} className='w-[min(25rem,100%)] mx-auto'>
   <div
    role={userID ? 'form' : 'none'}
    className='p-4 mb-1 bg-background border border-input rounded-md'
   >
    <Field className='gap-2' data-invalid={!!errors.userName}>
     <FieldLabel htmlFor='userName'>{dic.newUser.form.userName} *</FieldLabel>
     <InputGroup data-invalid={!!errors.userName}>
      <InputGroupInput id='userName' {...register('userName')} />
     </InputGroup>
    </Field>
    <div className='mt-4'>
     {personData && personIsSuccess ? (
      <div className='p-4 border-2 border-dashed border-teal-400 dark:border-teal-600 bg-teal-50 dark:bg-teal-950 rounded-md'>
       <div>
        <FieldGroup className='gap-5 mb-4'>
         <div className='grid gap-2 grid-cols-2'>
          <Field className='gap-2'>
           <FieldLabel htmlFor='name'>{dic.newUser.form.name}</FieldLabel>
           <InputGroup>
            <InputGroupInput id='name' readOnly value={personData.name || ''} />
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
     <div className='mt-4 flex sm:justify-end'>
      <Button type='submit' className='w-full sm:w-28'>
       {dic.newUser.form.confirm}
      </Button>
     </div>
    )}
   </div>
   <div
    role={userID ? 'form' : 'none'}
    className='p-4 bg-background border border-input rounded-md'
   >
    <FieldGroup className='gap-5'>
     <Field className='gap-2'>
      <FieldLabel htmlFor='password'>{dic.newUser.form.password} *</FieldLabel>
      <InputGroup>
       <InputGroupInput id='password' />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel htmlFor='confirmPassword'>
       {dic.newUser.form.confirmPassword} *
      </FieldLabel>
      <InputGroup>
       <InputGroupInput id='confirmPassword' />
      </InputGroup>
     </Field>
    </FieldGroup>
    {userID && (
     <div className='mt-4 flex sm:justify-end'>
      <Button type='submit' className='w-full sm:w-28'>
       {dic.newUser.form.confirm}
      </Button>
     </div>
    )}
   </div>
   {!userID && (
    <div className='mt-4 flex sm:justify-end'>
     <Button type='submit' className='w-full sm:w-28'>
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
     onChangePerson(personID) {
      setPersonID(personID);
      setShowRealPerson(false);
     },
    }}
   />
  </div>
 );
}
