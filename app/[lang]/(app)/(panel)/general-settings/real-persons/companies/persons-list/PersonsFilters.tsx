import { useState } from 'react';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import {
 Popover,
 PopoverTrigger,
 PopoverContent,
} from '@radix-ui/react-popover';
import {
 CommandInput,
 CommandList,
 CommandEmpty,
 CommandGroup,
 CommandItem,
} from 'cmdk';
import { ChevronsUpDown, Command, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PersonsFitlers({
 dic,
}: {
 dic: RealPersonsDictionary;
}) {
 const [openGenderCombo, setOpenGenderCombo] = useState(false);
 const [openNationalityCombo, setOpenNationalityCombo] = useState(false);
 return (
  <div className='hidden bg-background border border-input rounded lg:flex flex-col overflow-hidden'>
   <div className='p-2 border-b border-input flex justify-center'>
    <p className='text-base font-medium text-neutral-600 dark:text-neutral-400'>
     {dic.filters.title}
    </p>
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
