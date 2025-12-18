'use client';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupTextarea,
} from '@/components/ui/input-group';

export default function NewPerson({ dic }: { dic: CompaniesDictionary }) {
 const {
  newCompany: { form: formDic },
 } = dic;
 return (
  <form className='bg-background p-4 border border-input rounded-md w-[min(35rem,100%)] mx-auto'>
   <FieldGroup className='gap-5'>
    <Field className='gap-2'>
     <FieldLabel htmlFor='name'>{formDic.name}</FieldLabel>
     <InputGroup>
      <InputGroupInput id='name' />
     </InputGroup>
    </Field>
    <div className='grid grid-cols-2 gap-3 gap-y-5'>
     <Field className='gap-2'>
      <FieldLabel htmlFor='nationalCode'>{formDic.nationalCode}</FieldLabel>
      <InputGroup>
       <InputGroupInput id='nationalCode' />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel htmlFor='registerCode'>{formDic.registerCode}</FieldLabel>
      <InputGroup>
       <InputGroupInput id='registerCode' />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel htmlFor='fax'>{formDic.fax}</FieldLabel>
      <InputGroup>
       <InputGroupInput id='fax' />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel htmlFor='postalCode'>{formDic.postalCode}</FieldLabel>
      <InputGroup>
       <InputGroupInput id='postalCode' />
      </InputGroup>
     </Field>
     <div className='grid grid-cols-3 gap-3 col-span-full'>
      <Field className='gap-2'>
       <FieldLabel htmlFor='telephone'>{formDic.telephone}</FieldLabel>
       <InputGroup>
        <InputGroupInput id='telephone' />
       </InputGroup>
      </Field>
      <Field className='gap-2'>
       <FieldLabel htmlFor='telephone'>{formDic.telephone}</FieldLabel>
       <InputGroup>
        <InputGroupInput id='telephone' />
       </InputGroup>
      </Field>
      <Field className='gap-2'>
       <FieldLabel htmlFor='telephone'>{formDic.telephone}</FieldLabel>
       <InputGroup>
        <InputGroupInput id='telephone' />
       </InputGroup>
      </Field>
     </div>
     <Field className='gap-2 col-span-full'>
      <FieldLabel htmlFor='address'>{formDic.address}</FieldLabel>
      <InputGroup>
       <InputGroupTextarea id='address' />
      </InputGroup>
     </Field>
    </div>
   </FieldGroup>
  </form>
 );
}
