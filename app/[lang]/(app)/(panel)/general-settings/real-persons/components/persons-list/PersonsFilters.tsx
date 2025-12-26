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
 CommandEmpty,
 CommandGroup,
 CommandInput,
 CommandItem,
 CommandList,
} from '@/components/ui/command';
import { usePersonsConfigContext } from '../../services/personsConfigContext';
import { LiaTimesSolid } from 'react-icons/lia';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Spinner } from '@/components/ui/spinner';

export default function PersonsFitlers({
 dic,
}: {
 dic: RealPersonsDictionary;
}) {
 const {
  showFilters,
  changeShowFilters,
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
      <FieldLabel>{dic.filters.name}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.filters.fatherName}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
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
              setOpenGenderCombo(false);
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
      <FieldLabel>{dic.filters.nationalCode}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.filters.mobileNo}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.filters.email}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
    </FieldGroup>
   </div>
  </div>
 );
}
