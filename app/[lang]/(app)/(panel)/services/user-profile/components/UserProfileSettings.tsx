'use client';
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';
import { Label } from '@/components/ui/label';
import {
 Select,
 SelectTrigger,
 SelectValue,
 SelectContent,
 SelectGroup,
 SelectItem,
} from '@/components/ui/select';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useUserProfileContext } from '../userProfileContext';

export default function UserProfileSettings() {
 const { localeInfo } = useBaseConfig();
 const { settings, settingsPreferences, onChangeUiSettings } =
  useUserProfileContext();
 const {
  shareDictionary: {
   components: { settingController },
  },
 } = useShareDictionary();
 return (
  <div>
   <div className='sticky top-0 text-center font-medium p-2 py-3 bg-neutral-200 dark:bg-neutral-800 z-1'>
    <h3>{settingController.ui}</h3>
   </div>
   <section className='p-2'>
    <div className='flex gap-2'>
     <Label className='text-xs'>
      {settingController.gridLimitSizeOptions}:{' '}
     </Label>
     <Select
      dir={localeInfo.contentDirection}
      value={settingsPreferences.ui.gridLimitSizeOption.toString()}
      onValueChange={(newValue) =>
       onChangeUiSettings({
        gridLimitSizeOption: Number(newValue),
       })
      }
     >
      <SelectTrigger className='w-20'>
       <SelectValue />
      </SelectTrigger>
      <SelectContent>
       <SelectGroup>
        {settings.ui.gridLimitSizeOptions.map((item) => (
         <SelectItem key={item} value={item.toString()}>
          {item}
         </SelectItem>
        ))}
       </SelectGroup>
      </SelectContent>
     </Select>
    </div>
   </section>
  </div>
 );
}
