'use client';
import { Button } from '@/components/ui/button';
import {
 Tooltip,
 TooltipContent,
 TooltipTrigger,
} from '@/components/ui/tooltip';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import useLogout from '../../login/hooks/useLogout';

function LogoutControllerButton() {
 const logout = useLogout();
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
     onClick={logout}
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
