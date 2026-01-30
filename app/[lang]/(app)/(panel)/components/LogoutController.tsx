'use client';
import { Button } from '@/components/ui/button';
import {
 Tooltip,
 TooltipContent,
 TooltipTrigger,
} from '@/components/ui/tooltip';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { useLogoutContext } from '../../login/services/logout/logoutContext';

function LogoutControllerButton() {
 const { onOpen: showLogout } = useLogoutContext();
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
     className='flex rounded-full text-rose-700 dark:text-rose-400 border-rose-700 dark:border-rose-400'
     onClick={() => showLogout(true)}
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
