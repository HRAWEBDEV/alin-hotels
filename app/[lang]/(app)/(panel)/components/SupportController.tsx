'use client';
import { Button } from '@/components/ui/button';
import { MdSupportAgent } from 'react-icons/md';
import {
 Tooltip,
 TooltipTrigger,
 TooltipContent,
} from '@/components/ui/tooltip';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { useSettingContext } from '../services/setting/settingContext';

function SupportControllerButton() {
 const { toggle } = useSettingContext();
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
     onClick={() => toggle(true)}
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
