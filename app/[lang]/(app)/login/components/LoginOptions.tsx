'use client';
import { type LoginDictionary } from '@/internalization/app/dictionaries/login/dictionary';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLoginContext } from '../services/login/loginContext';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function LoginOptions({ dic }: { dic: LoginDictionary }) {
 const { locale } = useBaseConfig();
 const { loginModalIsOpen } = useLoginContext();
 return (
  <>
   {loginModalIsOpen ? (
    <></>
   ) : (
    <div className='mt-1'>
     <Button variant='link' asChild className='px-0 text-xs'>
      <Link href={`/${locale}/login/forget-password`}>
       {dic.loginOptions.forgetPassword}
      </Link>
     </Button>
    </div>
   )}
  </>
 );
}
