'use client';
import { useState } from 'react';
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

export default function NewPerson({ dic }: { dic: RealPersonsDictionary }) {
 const [openBirthDateCalendar, setOpenBirthDateCalendar] = useState(false);
 const [openNationalityCombo, setOpenNationalityCombo] = useState(false);
 const [openGenderCombo, setOpenGenderCombo] = useState(false);
 const [openEducationGradeCombo, setOpenEducationGradeCombo] = useState(false);
 const [openEducationFieldCombo, setOpenEducationFieldCombo] = useState(false);

 return (
  <form className='bg-background p-4 border border-input rounded w-[min(35rem,100%)] mx-auto'>
   <div className='grid place-content-center mb-3'>
    <Avatar className='size-32'>
     <AvatarFallback>H</AvatarFallback>
    </Avatar>
   </div>
   <FieldGroup className='gap-5'>
    <div className='grid sm:grid-cols-3 gap-3 gap-y-5'>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.name}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.lastName}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.fatherName}</FieldLabel>
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
      <FieldLabel>{dic.newPerson.form.nationalCode}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.mobileNo}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.email}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
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
       <InputGroupTextarea />
      </InputGroup>
     </Field>
    </div>
   </FieldGroup>
  </form>
 );
}
