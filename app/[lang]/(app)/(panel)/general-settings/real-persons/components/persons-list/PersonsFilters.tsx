import { useState } from 'react';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
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
import { usePersonsConfigContext } from '../../services/personsConfigContext';
import { LiaTimesSolid } from 'react-icons/lia';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Spinner } from '@/components/ui/spinner';
import { type RealPersonSchema } from '../../schemas/realPersonSchema';
import { useFormContext, Controller } from 'react-hook-form';

export default function PersonsFitlers({
 dic,
}: {
 dic: RealPersonsDictionary;
}) {
 const { register, reset, control } = useFormContext<RealPersonSchema>();
 const {
  showFilters,
  changeShowFilters,
  initialData: { data: initialData, isLoading: initialDataLoading },
  persons: { data, isLoading },
 } = usePersonsConfigContext();
 const [openGenderCombo, setOpenGenderCombo] = useState(false);
 const [openNationalityCombo, setOpenNationalityCombo] = useState(false);
 return (
  <div
   data-show-filters={showFilters}
   className='absolute inset-0 lg:static hidden data-[show-filters="true"]:flex bg-background border border-input rounded lg:rounded-ee-none lg:rounded-se-none lg:border-e-0 lg:flex! flex-col overflow-hidden z-4'
  >
   <div className='p-2 border-b border-input flex justify-between items-center min-h-12'>
    <div className='basis-9 flex'>
     <Button
      variant='ghost'
      size='icon-lg'
      className='text-red-700 dark:text-red-400 h-auto'
      onClick={() => {
       reset();
      }}
     >
      <FaRegTrashAlt className='size-4' />
     </Button>
    </div>
    <div className='flex gap-2 items-center'>
     <p className='text-base font-medium text-neutral-600 dark:text-neutral-400 grow text-center'>
      {dic.filters.title}
     </p>
     <div className='text-xs flex items-center'>
      ({dic.filters.results}:{' '}
      {isLoading ? <Spinner className='text-primary' /> : data?.rowsCount || ''}
      )
     </div>
    </div>
    <div className='basis-9 flex'>
     <Button
      variant='ghost'
      size='icon-lg'
      className='text-red-700 dark:text-red-400 lg:hidden'
      onClick={() => changeShowFilters(false)}
     >
      <LiaTimesSolid className='size-5' />
     </Button>
    </div>
   </div>
   <div className='grow overflow-auto p-2 py-4'>
    <FieldGroup className='gap-5'>
     <Field className='gap-2'>
      <FieldLabel htmlFor='name'>{dic.filters.name}</FieldLabel>
      <InputGroup>
       <InputGroupInput type='search' id='name' {...register('name')} />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel htmlFor='fatherName'>{dic.filters.fatherName}</FieldLabel>
      <InputGroup>
       <InputGroupInput
        type='search'
        id='fatherName'
        {...register('fatherName')}
       />
      </InputGroup>
     </Field>
     <Controller
      control={control}
      name='gender'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2'>
        <FieldLabel htmlFor='gender'>{dic.newPerson.form.gender}</FieldLabel>
        <Popover open={openGenderCombo} onOpenChange={setOpenGenderCombo}>
         <PopoverTrigger asChild>
          <Button
           id='gender'
           variant='outline'
           role='combobox'
           aria-expanded={openGenderCombo}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
            {value && (
             <Button
              variant={'ghost'}
              size={'icon'}
              className='text-rose-700 dark:text-rose-400'
              onClick={(e) => {
               e.stopPropagation();
               onChange(null);
              }}
             >
              <FaRegTrashAlt />
             </Button>
            )}
            <ChevronsUpDown className='opacity-50' />
           </div>
          </Button>
         </PopoverTrigger>
         <PopoverContent className='w-[200px] p-0'>
          <Command>
           <CommandInput />
           <CommandList>
            <CommandGroup>
             {initialData?.genders.map((gender) => (
              <CommandItem
               key={gender.key}
               value={gender.value}
               onSelect={() => {
                setOpenGenderCombo(false);
                onChange(gender);
               }}
              >
               {gender.value}
               <Check
                className={cn(
                 'ml-auto',
                 value?.key === gender.key ? 'opacity-100' : 'opacity-0',
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
      )}
     />
     <Controller
      control={control}
      name='nationality'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2'>
        <FieldLabel htmlFor='nationality'>
         {dic.newPerson.form.naitonality}
        </FieldLabel>
        <Popover
         open={openNationalityCombo}
         onOpenChange={setOpenNationalityCombo}
        >
         <PopoverTrigger asChild>
          <Button
           id='nationality'
           variant='outline'
           role='combobox'
           aria-expanded={openNationalityCombo}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
            {value && (
             <Button
              variant={'ghost'}
              size={'icon'}
              onClick={(e) => {
               e.stopPropagation();
               onChange(null);
              }}
              className='text-rose-700 dark:text-rose-400'
             >
              <FaRegTrashAlt />
             </Button>
            )}
            <ChevronsUpDown className='opacity-50' />
           </div>
          </Button>
         </PopoverTrigger>
         <PopoverContent className='w-[200px] p-0'>
          <Command>
           <CommandInput className='h-9' />
           <CommandList>
            <CommandGroup>
             {initialData?.nationalityZones.map((item) => (
              <CommandItem
               key={item.key}
               value={item.value}
               onSelect={() => {
                setOpenNationalityCombo(false);
                onChange(item);
               }}
              >
               {item.value}
               <Check
                className={cn(
                 'ml-auto',
                 value?.key === item.key ? 'opacity-100' : 'opacity-0',
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
      )}
     />
     <Field className='gap-2'>
      <FieldLabel htmlFor='nationalCode'>{dic.filters.nationalCode}</FieldLabel>
      <InputGroup>
       <InputGroupInput
        type='search'
        id='nationalCode'
        {...register('nationalCode')}
       />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel id='mobileNo'>{dic.filters.mobileNo}</FieldLabel>
      <InputGroup>
       <InputGroupInput type='search' id='mobileNo' {...register('mobileNo')} />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel htmlFor='email'>{dic.filters.email}</FieldLabel>
      <InputGroup>
       <InputGroupInput type='search' id='email' {...register('email')} />
      </InputGroup>
     </Field>
    </FieldGroup>
   </div>
  </div>
 );
}
