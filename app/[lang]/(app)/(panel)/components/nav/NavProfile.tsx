import { Button } from '@/components/ui/button';
import { AvatarFallback, Avatar, AvatarImage } from '@/components/ui/avatar';

export default function NavProfile() {
 return (
  <Button
   variant='ghost'
   className='text-start p-4 h-auto bg-sky-800 dark:bg-sky-600 hover:bg-sky-800 hover:dark:bg-sky-600 rounded-none w-full justify-start'
  >
   <Avatar className='size-14'>
    <AvatarFallback></AvatarFallback>
   </Avatar>
   <span className='grow font-medium'>حمیدرضا اکبری</span>
  </Button>
 );
}
