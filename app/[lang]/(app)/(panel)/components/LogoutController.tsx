'use client';
import { Button } from '@/components/ui/button';
import {
 Tooltip,
 TooltipContent,
 TooltipTrigger,
} from '@/components/ui/tooltip';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { RiLogoutBoxRFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

function LogoutControllerButton() {
 const { locale } = useBaseConfig();
 const router = useRouter();
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
     onClick={() => router.push(`/${locale}/login`)}
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
