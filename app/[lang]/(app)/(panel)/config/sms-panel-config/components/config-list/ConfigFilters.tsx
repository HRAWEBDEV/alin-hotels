import { useState } from 'react';
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
import { useFormContext, Controller } from 'react-hook-form';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
 Command,
 CommandGroup,
 CommandInput,
 CommandItem,
 CommandList,
} from '@/components/ui/command';

export default function ConfigFitlers({
 dic,
}: {
 dic: SmsPanelConfigDictionary;
}) {
 const { setValue, control } = useFormContext<SmsConfigSchema>();
 const {
  showFilters,
  changeShowFilters,
  initialData: { data: initialData, isLoading: initialDataLoading },
  config: { data, isLoading },
 } = useSmsConfigContext();
 const [showProviders, setShowProviders] = useState(false);
 const [showSmsConfigTypes, setShowSmsConfigTypes] = useState(false);
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
   <div className='grow overflow-auto p-2 py-4'>
    <FieldGroup className='gap-5'>
     <Controller
      control={control}
      name='provider'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2'>
        <FieldLabel htmlFor='provider'>
         {dic.newConfig.form.provider}
        </FieldLabel>
        <Popover open={showProviders} onOpenChange={setShowProviders}>
         <PopoverTrigger asChild>
          <Button
           type='button'
           id='provider'
           variant='outline'
           role='combobox'
           aria-expanded={showProviders}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
            {value && (
             <Button
              type='button'
              variant={'ghost'}
              size={'icon'}
              onClick={(e) => {
               e.stopPropagation();
               onChange(null);
              }}
              className='text-rose-700 dark:text-rose-400'
             >
              <FaRegTrashAlt />
             </Button>
            )}
            <ChevronsUpDown className='opacity-50' />
           </div>
          </Button>
         </PopoverTrigger>
         <PopoverContent className='w-[200px] p-0'>
          <Command>
           <CommandInput className='h-11'></CommandInput>
           <CommandList>
            <CommandGroup>
             {initialData?.providers?.map((item) => (
              <CommandItem
               key={item.key}
               value={item.value}
               onSelect={() => {
                setShowProviders(false);
                onChange(item);
               }}
              >
               {item.value}
               <Check
                className={cn(
                 'ml-auto',
                 value?.key === item.key ? 'opacity-100' : 'opacity-0',
                )}
               />
              </CommandItem>
             ))}
            </CommandGroup>
           </CommandList>
          </Command>
         </PopoverContent>
        </Popover>
       </Field>
      )}
     />
     <Controller
      control={control}
      name='smsConfigType'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2'>
        <FieldLabel htmlFor='smsConfigType'>
         {dic.newConfig.form.smsType}
        </FieldLabel>
        <Popover open={showSmsConfigTypes} onOpenChange={setShowSmsConfigTypes}>
         <PopoverTrigger asChild>
          <Button
           type='button'
           id='smsConfigType'
           variant='outline'
           role='combobox'
           aria-expanded={showSmsConfigTypes}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
            {value && (
             <Button
              type='button'
              variant={'ghost'}
              size={'icon'}
              onClick={(e) => {
               e.stopPropagation();
               onChange(null);
              }}
              className='text-rose-700 dark:text-rose-400'
             >
              <FaRegTrashAlt />
             </Button>
            )}
            <ChevronsUpDown className='opacity-50' />
           </div>
          </Button>
         </PopoverTrigger>
         <PopoverContent className='w-[200px] p-0'>
          <Command>
           <CommandInput className='h-11'></CommandInput>
           <CommandList>
            <CommandGroup>
             {initialData?.smsConfigTypes?.map((item) => (
              <CommandItem
               key={item.key}
               value={item.value}
               onSelect={() => {
                setShowSmsConfigTypes(false);
                onChange(item);
               }}
              >
               {item.value}
               <Check
                className={cn(
                 'ml-auto',
                 value?.key === item.key ? 'opacity-100' : 'opacity-0',
                )}
               />
              </CommandItem>
             ))}
            </CommandGroup>
           </CommandList>
          </Command>
         </PopoverContent>
        </Popover>
       </Field>
      )}
     />
    </FieldGroup>
   </div>
  </div>
 );
}
