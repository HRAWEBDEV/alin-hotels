'use client';
import { Button } from '@/components/ui/button';
import { MdSupportAgent } from 'react-icons/md';
import {
 Tooltip,
 TooltipTrigger,
 TooltipContent,
} from '@/components/ui/tooltip';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { useUserProfileContext } from '../services/user-profile/userProfileContext';

function SupportControllerButton() {
 const { toggle } = useUserProfileContext();
 const {
  shareDictionary: {
   components: { supportController },
  },
 } = useShareDictionary();
 return (
  <Tooltip>
   <TooltipTrigger asChild>
    <Button
     type='button'
     variant='outline'
     size='icon-lg'
     className='rounded-full text-purple-700 dark:text-purple-400'
     onClick={() =>
      toggle({
       open: true,
       type: 'support',
      })
     }
    >
     <MdSupportAgent className='size-5' />
    </Button>
   </TooltipTrigger>
   <TooltipContent>
    <p>{supportController.description}</p>
   </TooltipContent>
  </Tooltip>
 );
}

export { SupportControllerButton };
