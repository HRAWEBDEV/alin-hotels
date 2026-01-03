import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';
import { Button } from '@/components/ui/button';
import { useSmsConfigContext } from '../../services/smsConfigContext';
import { LiaTimesSolid } from 'react-icons/lia';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Spinner } from '@/components/ui/spinner';
import {
 type SmsConfigSchema,
 defaultValues,
} from '../../schemas/smsConfigSchema';
import { useFormContext } from 'react-hook-form';

export default function PersonsFitlers({
 dic,
}: {
 dic: SmsPanelConfigDictionary;
}) {
 const { setValue } = useFormContext<SmsConfigSchema>();
 const {
  showFilters,
  changeShowFilters,
  config: { data, isLoading },
 } = useSmsConfigContext();
 return (
  <div
   data-show-filters={showFilters}
   className='absolute inset-0 lg:static hidden data-[show-filters="true"]:flex bg-background border border-input rounded lg:rounded-ee-none lg:rounded-se-none lg:border-e-0 lg:flex! flex-col overflow-hidden z-4'
  >
   <div className='p-2 border-b border-input flex justify-between items-center min-h-12'>
    <div className='basis-9 flex'>
     <Button
      variant='ghost'
      size='icon-lg'
      className='text-red-700 dark:text-red-400 h-auto'
      onClick={() => {
       Object.keys(defaultValues).forEach((key) => {
        const typedKey = key as keyof SmsConfigSchema;
        setValue(
         typedKey,
         defaultValues[typedKey] as SmsConfigSchema[keyof SmsConfigSchema],
        );
       });
      }}
     >
      <FaRegTrashAlt className='size-4' />
     </Button>
    </div>
    <div className='flex gap-2 items-center'>
     <p className='text-base font-medium text-neutral-600 dark:text-neutral-400 grow text-center'>
      {dic.filters.title}
     </p>
     <div className='text-xs flex items-center'>
      ({dic.filters.results}:{' '}
      {isLoading ? <Spinner className='text-primary' /> : data?.length || 0})
     </div>
    </div>
    <div className='basis-9 flex'>
     <Button
      variant='ghost'
      size='icon-lg'
      className='text-red-700 dark:text-red-400 lg:hidden'
      onClick={() => changeShowFilters(false)}
     >
      <LiaTimesSolid className='size-5' />
     </Button>
    </div>
   </div>
   <div className='grow overflow-auto p-2 py-4'></div>
  </div>
 );
}
