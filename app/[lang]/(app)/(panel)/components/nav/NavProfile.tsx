'use client';
import { Button } from '@/components/ui/button';
import { AvatarFallback, Avatar } from '@/components/ui/avatar';
import { FaUserAlt } from 'react-icons/fa';
import { useUserProfileContext } from '../../services/user-profile/userProfileContext';

export default function NavProfile() {
 const { toggle } = useUserProfileContext();
 return (
  <Button
   variant='ghost'
   className='text-start p-4 h-auto bg-sky-800 dark:bg-sky-900 hover:bg-sky-800 hover:dark:bg-sky-900 hover:text-primary-foreground hover:dark:text-foreground rounded-none w-full justify-start'
   onClick={() => toggle(true)}
  >
   <Avatar className='size-14'>
    <AvatarFallback className='text-neutral-300 dark:text-neutral-600'>
     <FaUserAlt className='size-6' />
    </AvatarFallback>
   </Avatar>
   <span className='grow font-medium'>حمیدرضا اکبری</span>
  </Button>
 );
}
