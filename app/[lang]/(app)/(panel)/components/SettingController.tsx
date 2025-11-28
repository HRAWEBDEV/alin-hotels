'use client';
import { Button } from '@/components/ui/button';
import { IoMdSettings } from 'react-icons/io';
import {
 Tooltip,
 TooltipTrigger,
 TooltipContent,
} from '@/components/ui/tooltip';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';
import { useUserProfileContext } from '../services/user-profile/userProfileContext';

function SettingControllerButton() {
 const { toggle } = useUserProfileContext();
 const {
  shareDictionary: {
   components: { settingController },
  },
 } = useShareDictionary();
 return (
  <Tooltip>
   <TooltipTrigger asChild>
    <Button
     type='button'
     variant='outline'
     size='icon-lg'
     className='hidden lg:flex rounded-full text-primary'
     onClick={() =>
      toggle({
       open: true,
       type: 'setting',
      })
     }
    >
     <IoMdSettings className='size-5' />
    </Button>
   </TooltipTrigger>
   <TooltipContent>
    <p>{settingController.description}</p>
   </TooltipContent>
  </Tooltip>
 );
}

export { SettingControllerButton };
