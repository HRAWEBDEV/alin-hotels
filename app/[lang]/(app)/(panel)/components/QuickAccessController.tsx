'use client';
import { Button } from '@/components/ui/button';
import { RiBookMarkedFill } from 'react-icons/ri';
import {
 Tooltip,
 TooltipContent,
 TooltipTrigger,
} from '@/components/ui/tooltip';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { useUserProfileContext } from '../services/user-profile/userProfileContext';

function QuickAccessControllerButton() {
 const { toggle } = useUserProfileContext();
 const {
  shareDictionary: {
   components: { quickAccessController },
  },
 } = useShareDictionary();
 return (
  <Tooltip>
   <TooltipTrigger asChild>
    <Button
     type='button'
     variant='outline'
     size='icon-lg'
     className='size-8 rounded-full text-teal-700 dark:text-teal-400'
     onClick={() =>
      toggle({
       open: true,
       type: 'quickAccess',
      })
     }
    >
     <RiBookMarkedFill />
    </Button>
   </TooltipTrigger>
   <TooltipContent className='pointer-events-none'>
    <p>{quickAccessController.description}</p>
   </TooltipContent>
  </Tooltip>
 );
}

export { QuickAccessControllerButton };
