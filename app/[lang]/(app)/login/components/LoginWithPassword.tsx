'use client';
import { type LoginDictionary } from '@/internalization/app/dictionaries/login/dictionary';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function LoginWithPassword({ dic }: { dic: LoginDictionary }) {
 const { localeInfo } = useBaseConfig();
 const router = useRouter();
 const {
  loginWithPassword: { form: formDic },
 } = dic;
 return (
  <form>
   <FieldGroup>
    <Field>
     <FieldLabel htmlFor='userName'>{formDic.userName}: </FieldLabel>
     <InputGroup>
      <InputGroupInput id='userName' />
     </InputGroup>
    </Field>
    <Field>
     <FieldLabel htmlFor='password'>{formDic.password}: </FieldLabel>
     <InputGroup>
      <InputGroupInput id='password' />
     </InputGroup>
    </Field>
    <Button
     size='lg'
     className='mt-4'
     type='submit'
     onClick={(e) => {
      e.preventDefault();
      router.push(`/${localeInfo.locale}`);
     }}
    >
     {formDic.confirm}
    </Button>
   </FieldGroup>
  </form>
 );
}
