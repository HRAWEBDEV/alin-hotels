'use client';
import { useEffect } from 'react';
import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';
import { FieldGroup } from '@/components/ui/field';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
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
  mutationFn({}: SmsConfigSchema) {
   const newConfig: SaveSmsConfigPackage = {
    id: 0,
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
  <form className='bg-background p-4 border border-input rounded-md w-[min(35rem,100%)] mx-auto'>
   <FieldGroup className='gap-5'>
    <div className='grid grid-cols-2 gap-3 gap-y-5'></div>
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
