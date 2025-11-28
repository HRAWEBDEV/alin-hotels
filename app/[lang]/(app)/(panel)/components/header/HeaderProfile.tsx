import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { IoMdArrowDropdown } from 'react-icons/io';

export default function HeaderProfile() {
 return (
  <Button variant='ghost' className='h-full p-2 rounded-none'>
   <IoMdArrowDropdown />
   <span className='font-medium'>حمیدرضا اکبری</span>
   <Avatar>
    <AvatarFallback className='bg-neutral-300 text-sky-900'>ح</AvatarFallback>
   </Avatar>
  </Button>
 );
}
