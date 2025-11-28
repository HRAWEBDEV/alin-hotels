'use client';
import { Button } from '@/components/ui/button';
import { RiBookMarkedFill } from 'react-icons/ri';
import {
 Tooltip,
 TooltipContent,
 TooltipTrigger,
} from '@/components/ui/tooltip';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { useQuickAccessContext } from '../services/quick-access/quickAccessContext';

function QuickAccessControllerButton() {
 const { toggle } = useQuickAccessContext();
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
     className='hidden lg:flex rounded-full text-rose-700 dark:text-rose-400'
     onClick={() => toggle(true)}
    >
     <RiBookMarkedFill className='size-5' />
    </Button>
   </TooltipTrigger>

   <TooltipContent>
    <p>{quickAccessController.description}</p>
   </TooltipContent>
  </Tooltip>
 );
}

export { QuickAccessControllerButton };
