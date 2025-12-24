'use client';
import { type LoginDictionary } from '@/internalization/app/dictionaries/login/dictionary';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLoginContext } from '../services/login/loginContext';

export default function LoginOptions({ dic }: { dic: LoginDictionary }) {
 const { loginModalIsOpen } = useLoginContext();
 return (
  <>
   {loginModalIsOpen ? (
    <></>
   ) : (
    <div className='mt-1'>
     <Button variant='link' asChild className='px-0 text-xs'>
      <Link href='#'>{dic.forgetPassword}</Link>
     </Button>
    </div>
   )}
  </>
 );
}
