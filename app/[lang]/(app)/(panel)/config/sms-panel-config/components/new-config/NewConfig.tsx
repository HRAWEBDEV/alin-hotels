'use client';
import { useEffect, useState } from 'react';
import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';
import { Button } from '@/components/ui/button';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type SmsConfigSchema,
 createSmsConfigSchema,
 defaultValues,
} from '../../schemas/smsConfigSchema';
import { Spinner } from '@/components/ui/spinner';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 type SaveSmsConfigPackage,
 smsConfigBasePath,
 saveSmsConfig,
 getSmsConfig,
 updateSmsConfig,
} from '../../services/smsPanelApiActions';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import NoItemFound from '../../../../components/NoItemFound';
import { type SmsConfigContext } from '../../services/smsConfigContext';
import { NumericFormat } from 'react-number-format';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { FieldGroup, Field, FieldLabel } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
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

export default function NewConfig({
 dic,
 configID,
 onSuccess,
 onCancel,
 initialData,
}: {
 dic: SmsPanelConfigDictionary;
 configID?: number | null;
 initialData: SmsConfigContext['initialData'];
 onSuccess?: SmsConfigContext['config']['onNewConfigSuccess'];
 onCancel?: SmsConfigContext['config']['onCancelNewConfig'];
}) {
 const queryClient = useQueryClient();
 const [showProviders, setShowProviders] = useState(false);
 const [showSmsConfigTypes, setShowSmsConfigTypes] = useState(false);
 // form
 const {
  control,
  register,
  handleSubmit,
  formState: { errors },
  reset,
  setValue,
 } = useForm<SmsConfigSchema>({
  resolver: zodResolver(createSmsConfigSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 //
 const { mutate, isPending } = useMutation({
  mutationFn({ provider, smsConfigType, number, isDefault }: SmsConfigSchema) {
   const newConfig: SaveSmsConfigPackage = {
    id: configID || 0,
    number: number,
    isDefault,
    providerID: Number(provider!.key),
    smsConfigTypeID: Number(smsConfigType!.key),
   };
   return configID ? updateSmsConfig(newConfig) : saveSmsConfig(newConfig);
  },
  onSuccess(res) {
   reset();
   queryClient.invalidateQueries({
    queryKey: [smsConfigBasePath, 'all'],
   });
   if (onSuccess) {
    onSuccess({
     mode: configID ? 'edit' : 'add',
     configID: res.data,
    });
   }
   if (configID) {
    queryClient.invalidateQueries({
     queryKey: [smsConfigBasePath, 'config', configID.toString()],
    });
   } else {
    toast.success(dic.newConfig.newConfigAdded);
   }
  },
  onError(err: AxiosError<string>) {
   toast.error(err.response?.data);
  },
 });
 //
 const { data, isLoading, isError, isSuccess } = useQuery({
  enabled: !!configID,
  queryKey: [smsConfigBasePath, 'config', configID?.toString()],
  refetchOnWindowFocus: false,
  async queryFn({ signal }) {
   const res = await getSmsConfig({ signal, smsConfigID: configID! });
   return res.data;
  },
 });

 useEffect(() => {
  if (!configID) return;
  reset();
 }, [configID, reset]);

 useEffect(() => {
  if (!configID || !isSuccess) return;
 }, [configID, isSuccess, data, setValue]);

 if (configID && isError) return <NoItemFound />;
 if (configID && isLoading)
  return (
   <div className='min-h-40 grid place-content-center text-primary'>
    <Spinner className='size-12' />
   </div>
  );
 return (
  <form className='bg-background p-4 border border-input rounded-md w-[min(30rem,100%)] mx-auto'>
   <FieldGroup className='gap-5'>
    <div className='grid grid-cols-1 gap-3 gap-y-5'>
     <div>
      <Controller
       control={control}
       name='isDefault'
       render={({ field: { onChange, value, ...other } }) => (
        <div
         style={{
          direction: 'ltr',
         }}
         className='flex items-center gap-2 flex-row-reverse'
        >
         <Switch
          id='default'
          {...other}
          checked={value}
          onCheckedChange={(newValue) => onChange(newValue)}
         />
         <Label htmlFor='default'>{dic.newConfig.form.default}</Label>
        </div>
       )}
      />
     </div>
     <Controller
      control={control}
      name='number'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2' data-invalid={!!errors.number}>
        <FieldLabel htmlFor='number'>{dic.newConfig.form.number} *</FieldLabel>
        <InputGroup data-invalid={!!errors.number}>
         <NumericFormat
          {...other}
          value={value}
          onValueChange={({ value }) => onChange(value)}
          decimalScale={0}
          id='number'
          customInput={InputGroupInput}
         />
        </InputGroup>
       </Field>
      )}
     />
     <Controller
      control={control}
      name='provider'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2' data-invalid={!!errors.provider}>
        <FieldLabel htmlFor='provider'>
         {dic.newConfig.form.provider} *
        </FieldLabel>
        <Popover open={showProviders} onOpenChange={setShowProviders}>
         <PopoverTrigger asChild>
          <Button
           data-invalid={!!errors.provider}
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
            {initialData.isLoading && <Spinner />}
            <ChevronsUpDown className='opacity-50' />
           </div>
          </Button>
         </PopoverTrigger>
         <PopoverContent className='w-[200px] p-0'>
          <Command>
           <CommandInput className='h-11'></CommandInput>
           <CommandList>
            <CommandGroup>
             {initialData?.data?.providers?.map((item) => (
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
       <Field className='gap-2' data-invalid={!!errors.smsConfigType}>
        <FieldLabel htmlFor='smsConfigType'>
         {dic.newConfig.form.smsType} *
        </FieldLabel>
        <Popover open={showSmsConfigTypes} onOpenChange={setShowSmsConfigTypes}>
         <PopoverTrigger asChild>
          <Button
           data-invalid={!!errors.smsConfigType}
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
            {initialData.isLoading && <Spinner />}
            <ChevronsUpDown className='opacity-50' />
           </div>
          </Button>
         </PopoverTrigger>
         <PopoverContent className='w-[200px] p-0'>
          <Command>
           <CommandInput className='h-11'></CommandInput>
           <CommandList>
            <CommandGroup>
             {initialData.data?.smsConfigTypes?.map((item) => (
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
    </div>
    <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
     <Button
      data-disabled={!!configID}
      disabled={!!configID}
      variant='outline'
      className='text-rose-700! dark:text-rose-400! border-rose-700! dark:border-rose-400! data-[disabled="true"]:opacity-0'
      type='button'
      onClick={() => reset()}
     >
      {isPending && <Spinner />}
      {dic.newConfig.form.clearForm}
     </Button>

     <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
      <Button
       className='sm:min-w-28'
       type='button'
       variant='outline'
       disabled={isPending || isLoading}
       onClick={() => {
        onCancel?.({
         mode: configID ? 'edit' : 'add',
         configID: configID || 0,
        });
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newConfig.form.cancel}
      </Button>
      <Button
       className='sm:min-w-28'
       type='submit'
       disabled={isPending || isLoading}
       onClick={(e) => {
        e.preventDefault();
        handleSubmit((data) => mutate(data))();
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newConfig.form.save}
      </Button>
     </div>
    </div>
   </FieldGroup>
  </form>
 );
}
