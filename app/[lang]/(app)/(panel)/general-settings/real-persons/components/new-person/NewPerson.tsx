'use client';
import { useState, useEffect } from 'react';
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
 CommandEmpty,
 CommandGroup,
 CommandInput,
 CommandItem,
 CommandList,
} from '@/components/ui/command';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type RealPersonSchema,
 createRealPersonSchema,
 defaultValues,
} from '../../schemas/realPersonSchema';
import { Spinner } from '@/components/ui/spinner';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 type SaveRealPersonPackage,
 realPersonsBasePath,
 saveRealPerson,
 getPerson,
 updateRealPerson,
} from '../../services/personsApiActions';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import NoItemFound from '../../../../components/NoItemFound';
import { PersonsConfig } from '../../services/personsConfigContext';

export default function NewPerson({
 dic,
 personID,
 onSuccess,
}: {
 dic: RealPersonsDictionary;
 personID?: number | null;
 onSuccess?: PersonsConfig['persons']['onNewPersonSuccess'];
}) {
 const queryClient = useQueryClient();
 // form
 const { control, register, handleSubmit, formState, reset, setValue } =
  useForm<RealPersonSchema>({
   resolver: zodResolver(createRealPersonSchema({ dic })),
   defaultValues: {
    ...defaultValues,
   },
  });
 //
 const [openBirthDateCalendar, setOpenBirthDateCalendar] = useState(false);
 const [openNationalityCombo, setOpenNationalityCombo] = useState(false);
 const [openGenderCombo, setOpenGenderCombo] = useState(false);
 const [openEducationGradeCombo, setOpenEducationGradeCombo] = useState(false);
 const [openEducationFieldCombo, setOpenEducationFieldCombo] = useState(false);
 //
 const { mutate, isPending } = useMutation({
  mutationFn({
   name,
   email,
   fatherName,
   gender,
   mobileNo,
   nationalCode,
   address,
   birthDate,
   educationField,
   educationGrade,
   lastName,
   nationality,
   postalCode,
   zone,
  }: RealPersonSchema) {
   const newPerson: SaveRealPersonPackage = {
    id: personID || 0,
    name: name || null,
    address: address || null,
    birthDate: null,
    email: email || null,
    fatherName: fatherName || null,
    lastName: lastName || null,
    mobileNo: mobileNo || null,
    nationalCode: null,
    postalCode: null,
    educationFieldID: null,
    educationGradeID: null,
    genderID: 1,
    nationalityZoneID: null,
    zoneNameID: null,
   };
   return personID ? updateRealPerson(newPerson) : saveRealPerson(newPerson);
  },
  onSuccess(res) {
   reset();
   queryClient.invalidateQueries({
    queryKey: [realPersonsBasePath, 'all'],
   });
   if (onSuccess) {
    onSuccess({
     mode: personID ? 'edit' : 'add',
     personID: res.data,
    });
   }
   if (personID) {
    queryClient.invalidateQueries({
     queryKey: [realPersonsBasePath, 'person', personID.toString()],
    });
   } else {
    toast.success(dic.newPerson.newPersonAdded);
   }
  },
  onError(err: AxiosError<string>) {
   toast.error(err.response?.data);
  },
 });
 //
 const { data, isLoading, isError, isSuccess } = useQuery({
  enabled: !!personID,
  queryKey: [realPersonsBasePath, 'person', personID?.toString()],
  async queryFn({ signal }) {
   const res = await getPerson({ signal, personID: personID! });
   return res.data;
  },
 });

 useEffect(() => {
  if (!personID) return;
  reset();
 }, [personID, reset]);

 useEffect(() => {
  if (!personID || !isSuccess) return;
  const {
   name,
   lastName,
   address,
   email,
   fatherName,
   mobileNo,
   nationalCode,
   postalCode,
  } = data;
  setValue('name', name || '');
  setValue('lastName', lastName || '');
  setValue('address', address || '');
  setValue('email', email || '');
  setValue('fatherName', fatherName || '');
  setValue('mobileNo', mobileNo || '');
  setValue('nationalCode', nationalCode || '');
  setValue('postalCode', postalCode || '');
 }, [personID, isSuccess, data, setValue]);

 if (personID && isError) return <NoItemFound />;
 if (personID && isLoading)
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
    <div className='grid grid-cols-2 md:grid-cols-3 gap-3 gap-y-5'>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.name}</FieldLabel>
      <InputGroup>
       <InputGroupInput {...register('name')} />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.lastName}</FieldLabel>
      <InputGroup>
       <InputGroupInput {...register('lastName')} />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.fatherName}</FieldLabel>
      <InputGroup>
       <InputGroupInput {...register('fatherName')} />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.gender}</FieldLabel>
      <Popover open={openGenderCombo} onOpenChange={setOpenGenderCombo}>
       <PopoverTrigger asChild>
        <Button
         variant='outline'
         role='combobox'
         aria-expanded={openGenderCombo}
         className='justify-between'
        >
         Select framework...
         <ChevronsUpDown className='opacity-50' />
        </Button>
       </PopoverTrigger>
       <PopoverContent className='w-[200px] p-0'>
        <Command>
         <CommandInput placeholder='Search framework...' className='h-9' />
         <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
           {[{ value: 'test' }].map((framework) => (
            <CommandItem
             key={framework.value}
             value={framework.value}
             onSelect={(currentValue) => {
              setOpenNationalityCombo(false);
             }}
            >
             test
             <Check
              className={cn(
               'ml-auto',
               '' === framework.value ? 'opacity-100' : 'opacity-0',
              )}
             />
            </CommandItem>
           ))}
          </CommandGroup>
         </CommandList>
        </Command>
       </PopoverContent>
      </Popover>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.naitonality}</FieldLabel>
      <Popover
       open={openNationalityCombo}
       onOpenChange={setOpenNationalityCombo}
      >
       <PopoverTrigger asChild>
        <Button
         variant='outline'
         role='combobox'
         aria-expanded={openNationalityCombo}
         className='justify-between'
        >
         Select framework...
         <ChevronsUpDown className='opacity-50' />
        </Button>
       </PopoverTrigger>
       <PopoverContent className='w-[200px] p-0'>
        <Command>
         <CommandInput placeholder='Search framework...' className='h-9' />
         <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
           {[{ value: 'test' }].map((framework) => (
            <CommandItem
             key={framework.value}
             value={framework.value}
             onSelect={(currentValue) => {
              setOpenNationalityCombo(false);
             }}
            >
             test
             <Check
              className={cn(
               'ml-auto',
               '' === framework.value ? 'opacity-100' : 'opacity-0',
              )}
             />
            </CommandItem>
           ))}
          </CommandGroup>
         </CommandList>
        </Command>
       </PopoverContent>
      </Popover>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.nationalCode}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel htmlFor='date' className='px-1'>
       {dic.newPerson.form.birthDate}
      </FieldLabel>
      <Popover
       open={openBirthDateCalendar}
       onOpenChange={setOpenBirthDateCalendar}
      >
       <PopoverTrigger asChild>
        <Button
         variant='outline'
         id='date'
         className='justify-between font-normal'
        >
         <span></span>
         <ChevronDownIcon />
        </Button>
       </PopoverTrigger>
       <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
        <Calendar mode='single' captionLayout='dropdown' />
       </PopoverContent>
      </Popover>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.mobileNo}</FieldLabel>
      <InputGroup>
       <InputGroupInput {...register('mobileNo')} />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.email}</FieldLabel>
      <InputGroup>
       <InputGroupInput {...register('email')} />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.educationGrade}</FieldLabel>
      <Popover
       open={openEducationGradeCombo}
       onOpenChange={setOpenEducationGradeCombo}
      >
       <PopoverTrigger asChild>
        <Button
         variant='outline'
         role='combobox'
         aria-expanded={openEducationGradeCombo}
         className='justify-between'
        >
         Select framework...
         <ChevronsUpDown className='opacity-50' />
        </Button>
       </PopoverTrigger>
       <PopoverContent className='w-[200px] p-0'>
        <Command>
         <CommandInput placeholder='Search framework...' className='h-9' />
         <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
           {[{ value: 'test' }].map((framework) => (
            <CommandItem
             key={framework.value}
             value={framework.value}
             onSelect={(currentValue) => {
              setOpenNationalityCombo(false);
             }}
            >
             test
             <Check
              className={cn(
               'ml-auto',
               '' === framework.value ? 'opacity-100' : 'opacity-0',
              )}
             />
            </CommandItem>
           ))}
          </CommandGroup>
         </CommandList>
        </Command>
       </PopoverContent>
      </Popover>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.educationField}</FieldLabel>
      <Popover
       open={openEducationFieldCombo}
       onOpenChange={setOpenEducationFieldCombo}
      >
       <PopoverTrigger asChild>
        <Button
         variant='outline'
         role='combobox'
         aria-expanded={openEducationFieldCombo}
         className='justify-between'
        >
         Select framework...
         <ChevronsUpDown className='opacity-50' />
        </Button>
       </PopoverTrigger>
       <PopoverContent className='w-[200px] p-0'>
        <Command>
         <CommandInput placeholder='Search framework...' className='h-9' />
         <CommandList>
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
           {[{ value: 'test' }].map((framework) => (
            <CommandItem
             key={framework.value}
             value={framework.value}
             onSelect={(currentValue) => {
              setOpenNationalityCombo(false);
             }}
            >
             test
             <Check
              className={cn(
               'ml-auto',
               '' === framework.value ? 'opacity-100' : 'opacity-0',
              )}
             />
            </CommandItem>
           ))}
          </CommandGroup>
         </CommandList>
        </Command>
       </PopoverContent>
      </Popover>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.postalCode}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2 col-span-full'>
      <FieldLabel>{dic.newPerson.form.address}</FieldLabel>
      <InputGroup>
       <InputGroupTextarea {...register('address')} />
      </InputGroup>
     </Field>
    </div>
    <div className='flex justify-between items-center gap-4'>
     <Button
      data-disabled={!!personID}
      disabled={!!personID}
      variant='outline'
      className='text-rose-700! dark:text-rose-400! border-rose-700! dark:border-rose-400! data-[disabled="true"]:opacity-0'
      type='button'
      onClick={() => reset()}
     >
      {isPending && <Spinner />}
      {dic.newPerson.form.clearForm}
     </Button>
     <Button
      className='min-w-28'
      type='submit'
      disabled={isPending || isLoading}
      onClick={(e) => {
       e.preventDefault();
       handleSubmit((data) => mutate(data))();
      }}
     >
      {(isPending || isLoading) && <Spinner />}
      {dic.newPerson.form.save}
     </Button>
    </div>
   </FieldGroup>
  </form>
 );
}
