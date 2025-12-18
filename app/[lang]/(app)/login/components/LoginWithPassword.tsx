'use client';
import { useState } from 'react';
import { type LoginDictionary } from '@/internalization/app/dictionaries/login/dictionary';
import {
 FieldGroup,
 Field,
 FieldLabel,
 FieldContent,
 FieldError,
} from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupAddon,
} from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { FaUser } from 'react-icons/fa';
import { TbLockPassword } from 'react-icons/tb';
import { IoEye, IoEyeOff } from 'react-icons/io5';
import {
 LoginWithPasswordCredentials,
 loginWithPassword,
} from '../services/loginApiActions';
import { z } from 'zod';
import { useForm } from '@tanstack/react-form';
import { useMutation } from '@tanstack/react-query';
import { Spinner } from '@/components/ui/spinner';
import { AxiosError } from 'axios';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { toast } from 'sonner';
import { setUserLoginToken } from '../utils/loginTokenManager';
import { useLoginContext } from '../services/login/loginContext';

const formDefaults: LoginWithPasswordCredentials = {
 userName: '',
 password: '',
};

export default function LoginWithPassword({ dic }: { dic: LoginDictionary }) {
 const { loginModalIsOpen, changeLoginModalIsOpen } = useLoginContext();
 const [showPassword, setShowPassword] = useState(false);
 const { locale } = useBaseConfig();
 const router = useRouter();
 const {
  loginWithPassword: { form: formDic, formValidation },
 } = dic;
 // * form setup
 const form = useForm({
  defaultValues: formDefaults,
  validators: {
   onSubmit: z.object({
    userName: z.string().min(1, formValidation.fillRequiredFields),
    password: z.string().min(1, formValidation.fillRequiredFields),
   }),
  },
  onSubmit({ value }) {
   return mutate(value);
  },
 });
 // * mutation setup
 const { mutate, isPending } = useMutation({
  mutationFn(credentials: LoginWithPasswordCredentials) {
   return loginWithPassword(credentials);
  },
  onError(err: AxiosError<string>) {
   toast.error(err.response?.data || '');
  },
  onSuccess({ data }) {
   setUserLoginToken(data.item1);
   if (loginModalIsOpen) {
    changeLoginModalIsOpen(false);
   } else {
    router.push(`/${locale}`);
   }
  },
 });

 return (
  <form>
   <FieldGroup>
    <form.Field name='userName'>
     {(field) => (
      <Field data-invalid={!field.state.meta.isValid}>
       <FieldLabel htmlFor='userName'>{formDic.userName}</FieldLabel>
       <InputGroup>
        <InputGroupAddon align='inline-start'>
         <FaUser className='text-primary size-4' />
        </InputGroupAddon>
        <InputGroupInput
         id='userName'
         data-invalid={!field.state.meta.isValid}
         value={field.state.value}
         onBlur={field.handleBlur}
         onChange={(e) => field.handleChange(e.target.value)}
        />
       </InputGroup>
       <FieldContent>
        {field.state.meta.errorMap.onSubmit?.map((err) => (
         <FieldError key={err.message}>
          <div className='flex items-center gap-1 text-xs'>
           <IoIosInformationCircleOutline className='size-5' />
           <span>{err.message}</span>
          </div>
         </FieldError>
        ))}
       </FieldContent>
      </Field>
     )}
    </form.Field>
    <form.Field name='password'>
     {(field) => (
      <Field data-invalid={!field.state.meta.isValid}>
       <FieldLabel htmlFor='password'>{formDic.password}</FieldLabel>
       <InputGroup>
        <InputGroupAddon align='inline-start'>
         <TbLockPassword className='text-primary size-5' />
        </InputGroupAddon>
        <InputGroupInput
         data-invalid={!field.state.meta.isValid}
         id='password'
         type={showPassword ? 'text' : 'password'}
         value={field.state.value}
         onBlur={field.handleBlur}
         onChange={(e) => field.handleChange(e.target.value)}
        />
        <InputGroupAddon align='inline-end' className='-me-2'>
         <Button
          type='button'
          size='icon'
          variant='ghost'
          onClick={() => setShowPassword((pre) => !pre)}
         >
          {showPassword ? (
           <IoEye className='text-primary size-5' />
          ) : (
           <IoEyeOff className='text-primary size-5' />
          )}
         </Button>
        </InputGroupAddon>
       </InputGroup>
       <FieldContent>
        {field.state.meta.errorMap.onSubmit?.map((err) => (
         <FieldError key={err.message}>
          <div className='flex items-center gap-1 text-xs'>
           <IoIosInformationCircleOutline className='size-5' />
           <span>{err.message}</span>
          </div>
         </FieldError>
        ))}
       </FieldContent>
      </Field>
     )}
    </form.Field>
    {
     <form.Subscribe selector={(state) => [state.isSubmitting]}>
      {([isSubmitting]) => (
       <Button
        size='lg'
        className='mt-4'
        type='submit'
        disabled={isSubmitting || isPending}
        onClick={(e) => {
         e.preventDefault();
         form.handleSubmit();
        }}
       >
        {(isSubmitting || isPending) && <Spinner />}
        {formDic.confirm}
       </Button>
      )}
     </form.Subscribe>
    }
   </FieldGroup>
  </form>
 );
}
