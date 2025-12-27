'use client';
import { useState, useEffect } from 'react';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FieldLabel, Field, FieldGroup } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupTextarea,
} from '@/components/ui/input-group';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
 Command,
 CommandGroup,
 CommandInput,
 CommandItem,
 CommandList,
} from '@/components/ui/command';
import { useForm, Controller } from 'react-hook-form';
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
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { NumericFormat } from 'react-number-format';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function NewUser({
 dic,
 userID,
 realPersonDic,
 onSuccess,
 onCancel,
}: {
 dic: UsersDictionary;
 userID?: number | null;
 realPersonDic: RealPersonsDictionary;
 onSuccess?: UsersConfig['users']['onNewUserSuccess'];
 onCancel?: UsersConfig['users']['onCancelNewUser'];
}) {
 const queryClient = useQueryClient();
 // form
 const {
  control,
  register,
  handleSubmit,
  formState: { errors },
  reset,
  setValue,
 } = useForm<UserSchema>({
  resolver: zodResolver(createUserSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 //
 const { locale } = useBaseConfig();
 //
 const [openBirthDateCalendar, setOpenBirthDateCalendar] = useState(false);
 const [openNationalityCombo, setOpenNationalityCombo] = useState(false);
 const [openGenderCombo, setOpenGenderCombo] = useState(false);
 const [openEducationGradeCombo, setOpenEducationGradeCombo] = useState(false);
 const [openEducationFieldCombo, setOpenEducationFieldCombo] = useState(false);
 //
 const { mutate, isPending } = useMutation({
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

 if (userID && isError) return <NoItemFound />;
 if (userID && isLoading)
  return (
   <div className='min-h-40 grid place-content-center text-primary'>
    <Spinner className='size-12' />
   </div>
  );
 return (
  <form className='bg-background p-4 border border-input rounded-md w-[min(35rem,100%)] mx-auto'>
   <div className='grid place-content-center mb-3'>
    <Avatar className='size-32'>
     <AvatarFallback>H</AvatarFallback>
    </Avatar>
   </div>
   <FieldGroup className='gap-5'>
    <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
     <Button
      data-disabled={!!userID}
      disabled={!!userID}
      variant='outline'
      className='text-rose-700! dark:text-rose-400! border-rose-700! dark:border-rose-400! data-[disabled="true"]:opacity-0'
      type='button'
      onClick={() => reset()}
     >
      {isPending && <Spinner />}
      {dic.newUser.form.clearForm}
     </Button>
     <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
      <Button
       className='sm:min-w-28'
       type='button'
       variant='outline'
       disabled={isPending || isLoading}
       onClick={() => {
        onCancel?.({
         mode: userID ? 'edit' : 'add',
         userID: userID || 0,
        });
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newUser.form.cancel}
      </Button>
      <Button
       className='sm:min-w-28'
       type='submit'
       disabled={isPending || isLoading}
       onClick={(e) => {
        e.preventDefault();
        handleSubmit((data) => mutate(data))();
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newUser.form.save}
      </Button>
     </div>
    </div>
   </FieldGroup>
  </form>
 );
}
