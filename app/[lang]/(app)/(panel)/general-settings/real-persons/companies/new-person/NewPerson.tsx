'use client';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FieldLabel, Field, FieldGroup } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupTextarea,
} from '@/components/ui/input-group';
import { Calendar } from '@/components/ui/calendar';

export default function NewPerson({ dic }: { dic: RealPersonsDictionary }) {
 console.log(dic);
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
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.naitonality}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel>{dic.newPerson.form.birthDate}</FieldLabel>
      <InputGroup>
       <InputGroupInput />
      </InputGroup>
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
