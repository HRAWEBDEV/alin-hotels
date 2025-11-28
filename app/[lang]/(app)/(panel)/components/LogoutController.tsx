'use client';
import { Button } from '@/components/ui/button';
import {
 Tooltip,
 TooltipContent,
 TooltipTrigger,
} from '@/components/ui/tooltip';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { useQuickAccessContext } from '../services/quick-access/quickAccessContext';
import { RiLogoutBoxRFill } from 'react-icons/ri';

function LogoutControllerButton() {
 const { toggle } = useQuickAccessContext();
 const {
  shareDictionary: {
   components: { logoutController },
  },
 } = useShareDictionary();
 return (
  <Tooltip>
   <TooltipTrigger asChild>
    <Button
     type='button'
     variant='outline'
     size='icon-lg'
     className='hidden lg:flex rounded-full text-rose-700 dark:text-rose-400 border-rose-700 dark:border-rose-400'
     onClick={() => toggle(true)}
    >
     <RiLogoutBoxRFill className='size-5' />
    </Button>
   </TooltipTrigger>

   <TooltipContent>
    <p>{logoutController.description}</p>
   </TooltipContent>
  </Tooltip>
 );
}

export { LogoutControllerButton };
