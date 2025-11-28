import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUserAlt } from 'react-icons/fa';
import { IoMdArrowDropdown } from 'react-icons/io';

export default function HeaderProfile() {
 return (
  <Button variant='ghost' className='h-full p-2 rounded-none'>
   <Avatar className='size-10'>
    <AvatarFallback className='text-neutral-100 dark:text-neutral-500 bg-neutral-300 dark:bg-neutral-700'>
     <FaUserAlt />
    </AvatarFallback>
   </Avatar>
  </Button>
 );
}
