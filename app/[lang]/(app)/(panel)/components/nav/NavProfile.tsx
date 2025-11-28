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
   className='flex-col text-start p-4 py-[18px] h-auto bg-sky-900 hover:bg-sky-900 hover:dark:bg-sky-900 hover:text-primary-foreground hover:dark:text-foreground rounded-none w-full justify-start items-start'
   onClick={() => toggle(true)}
  >
   <div className='flex gap-4 items-center w-full'>
    <Avatar className='size-14'>
     <AvatarFallback className='bg-neutral-400 text-neutral-300 dark:text-neutral-500'>
      <FaUserAlt className='size-6' />
     </AvatarFallback>
    </Avatar>
    <span className='grow font-medium text-ellipsis overflow-hidden text-neutral-300'>
     حمیدرضا اکبری
    </span>
   </div>
  </Button>
 );
}
