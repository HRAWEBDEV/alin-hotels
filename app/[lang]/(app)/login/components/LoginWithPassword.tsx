import { type LoginDictionary } from '@/internalization/app/dictionaries/login/dictionary';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupAddon,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';

export default function LoginWithPassword({ dic }: { dic: LoginDictionary }) {
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
    <Button size='lg' className='mt-4'>
     {formDic.confirm}
    </Button>
   </FieldGroup>
  </form>
 );
}
