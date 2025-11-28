'use client';
import { Button } from '@/components/ui/button';
import {
 Tooltip,
 TooltipContent,
 TooltipTrigger,
} from '@/components/ui/tooltip';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { IoMdNotifications } from 'react-icons/io';
import { Badge } from '@/components/ui/badge';
import { useUserProfileContext } from '../services/user-profile/userProfileContext';

function NotificationControllerButton() {
 const { toggle } = useUserProfileContext();
 const {
  shareDictionary: {
   components: { notificationController },
  },
 } = useShareDictionary();
 return (
  <Tooltip>
   <TooltipTrigger asChild>
    <Button
     type='button'
     variant='outline'
     size='icon-lg'
     className='relative rounded-full text-orange-700 dark:text-orange-400'
     onClick={() =>
      toggle({
       open: true,
       type: 'notifications',
      })
     }
    >
     <div className='absolute -top-1 -end-2'>
      <Badge variant='destructive' className='p-1 rounded-full size-6'>
       0
      </Badge>
     </div>
     <IoMdNotifications className='size-5' />
    </Button>
   </TooltipTrigger>
   <TooltipContent className='pointer-events-none'>
    <p>{notificationController.description}</p>
   </TooltipContent>
  </Tooltip>
 );
}

export { NotificationControllerButton };
