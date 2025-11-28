'use client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FaUserAlt } from 'react-icons/fa';
import { useUserProfileContext } from '../../services/user-profile/userProfileContext';

export default function HeaderProfile() {
 const { toggle } = useUserProfileContext();
 return (
  <Button
   variant='ghost'
   className='h-auto p-2 rounded-none'
   onClick={() =>
    toggle({
     open: true,
    })
   }
  >
   <Avatar className='size-10'>
    <AvatarFallback className='text-neutral-100 dark:text-neutral-500 bg-neutral-300 dark:bg-neutral-700'>
     <FaUserAlt />
    </AvatarFallback>
   </Avatar>
  </Button>
 );
}
