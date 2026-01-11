'use client';
import { useEffect, useState } from 'react';
import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';
import { ReactNode } from 'react';
import {
 type SmsConfigContext,
 smsConfigContext,
 tabs,
} from './smsConfigContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import {
 getInitialData,
 smsConfigBasePath,
 getAllSmsConfig,
 removeSmsConfig,
} from './smsPanelApiActions';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
 Dialog,
 DialogClose,
 DialogTitle,
 DialogDescription,
 DialogHeader,
 DialogFooter,
 DialogContent,
} from '@/components/ui/dialog';
import { IoIosWarning } from 'react-icons/io';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useForm, FormProvider } from 'react-hook-form';
import {
 type SmsConfigSchema,
 defaultValues,
 createSmsConfigSchema,
} from '../schemas/smsConfigSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function SmsConfigProvider({
 children,
 dic,
}: {
 children: ReactNode;
 dic: SmsPanelConfigDictionary;
}) {
 // queries
 const router = useRouter();
 const searchParams = useSearchParams();
 const activeTabQuery = searchParams.get(
  'activeTab',
 ) as SmsConfigContext['selectedTab'];
 const providerIDQuery = searchParams.get('providerID');
 const providerNameQuery = searchParams.get('providerName');
 const smsConfigTypeIDQuery = searchParams.get('smsConfigTypeID');
 const smsConfigTypeNameQuery = searchParams.get('smsConfigTypeName');
 // filters setup
 const realPersonFilters = useForm<SmsConfigSchema>({
  resolver: zodResolver(createSmsConfigSchema({ dic })),
  defaultValues: {
   ...defaultValues,
   provider:
    providerIDQuery && providerNameQuery
     ? {
        key: providerIDQuery,
        value: providerNameQuery,
       }
     : null,
   smsConfigType:
    smsConfigTypeIDQuery && smsConfigTypeNameQuery
     ? {
        key: smsConfigTypeIDQuery,
        value: smsConfigTypeNameQuery,
       }
     : null,
  },
 });
 const [providerValue, smsConfigTypeValue] = realPersonFilters.watch([
  'provider',
  'smsConfigType',
 ]);
 const queryClient = useQueryClient();
 const { locale } = useBaseConfig();
 const [showFilters, setShowFilters] = useState(false);
 const [selectedTab, setSelectedTab] =
  useState<SmsConfigContext['selectedTab']>('list');
 const [selectedConfigID, setSelectedConfigID] = useState<number | null>(() => {
  return null;
 });
 const [showRemoveConfigConfirm, setShowRemoveConfigConfirm] = useState(false);

 function handleChangeTab(newTab?: SmsConfigContext['selectedTab']) {
  const activeTab = newTab === undefined ? 'list' : newTab;
  setSelectedTab(activeTab);
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set('activeTab', activeTab);
  router.replace(
   `/${locale}/config/sms-panel-config?${newSearchParams.toString()}`,
  );
 }

 function handleChangeShowFilters(open?: boolean) {
  setShowFilters((pre) => (open === undefined ? !pre : open));
 }
 // init data
 const {
  data: initialData,
  isLoading: initialDataLoading,
  isError: initialDataError,
  isSuccess: initialDataSuccess,
 } = useQuery({
  staleTime: 'static',
  queryKey: [smsConfigBasePath, 'initial-data'],

  async queryFn({ signal }) {
   const res = await getInitialData({ signal });
   return res.data;
  },
 });
 // data
 const {
  data: configData,
  isLoading: configLoading,
  isFetching: configFetching,
  isError: configError,
  isSuccess: configSucess,
  refetch: refetchConfig,
 } = useQuery({
  queryKey: [
   smsConfigBasePath,
   'all',
   providerValue?.key || 'all',
   smsConfigTypeValue?.key || 'all',
  ],
  async queryFn({ signal }) {
   const res = await getAllSmsConfig({
    signal,
    providerID: providerValue?.key,
    smsConfigTypeID: smsConfigTypeValue?.key,
   });
   return res.data;
  },
 });
 // change person
 function handleChangeSelectedConfigID(id: number | null) {
  setSelectedConfigID(id);
 }
 // remove person
 function handleRemoveConfig(configID: number) {
  setShowRemoveConfigConfirm(true);
  setSelectedConfigID(configID);
 }

 const { mutate: confirmRemoveConfig, isPending: removeConfigIsPending } =
  useMutation({
   async mutationFn() {
    return removeSmsConfig(selectedConfigID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [smsConfigBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [smsConfigBasePath, 'person', selectedConfigID!.toString()],
    });
    setSelectedConfigID(null);
    setSelectedTab('list');
    setShowRemoveConfigConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });
 //
 function handleEditConfig(id: number) {
  setSelectedConfigID(id);
  setSelectedTab('edit');
 }
 //
 const handleNewConfigSuccess: SmsConfigContext['config']['onNewConfigSuccess'] =
  ({ mode, configID }) => {
   if (mode === 'edit') {
    setSelectedTab('list');
    setSelectedConfigID(null);
   }
  };
 const handleCancelConfig: SmsConfigContext['config']['onCancelNewConfig'] = ({
  mode,
 }) => {
  if (mode === 'edit') {
   setSelectedConfigID(null);
  }
  setSelectedTab('list');
 };

 // set queries
 useEffect(() => {
  const newSearchParams = new URLSearchParams(location.search);
  newSearchParams.set('providerID', providerValue?.key || '');
  newSearchParams.set('providerName', providerValue?.value || '');
  newSearchParams.set('smsConfigTypeID', smsConfigTypeValue?.key || '');
  newSearchParams.set('smsConfigTypeName', smsConfigTypeValue?.value || '');
  router.replace(
   `/${locale}/config/sms-panel-config?${newSearchParams.toString()}`,
  );
 }, [locale, router, providerValue, smsConfigTypeValue]);

 const ctx: SmsConfigContext = {
  tabs,
  selectedTab,
  showFilters,
  changeShowFilters: handleChangeShowFilters,
  changeSelectedTab: handleChangeTab,
  initialData: {
   data: initialData,
   isLoading: initialDataLoading,
   isError: initialDataError,
   isSuccess: initialDataSuccess,
  },
  config: {
   queries: {
    providerID: providerValue?.key,
    smsConfigTypeID: smsConfigTypeValue?.key,
   },
   data: configData,
   isError: configError,
   isFetching: configFetching,
   isLoading: configLoading,
   isSuccess: configSucess,
   selectedConfigID,
   refetchConfig,
   onChangeSelectedConfigID: handleChangeSelectedConfigID,
   onRemoveConfig: handleRemoveConfig,
   onEditConfig: handleEditConfig,
   onNewConfigSuccess: handleNewConfigSuccess,
   onCancelNewConfig: handleCancelConfig,
  },
 };

 return (
  <smsConfigContext.Provider value={ctx}>
   <FormProvider {...realPersonFilters}>{children}</FormProvider>
   <Dialog
    open={showRemoveConfigConfirm}
    onOpenChange={(newValue) => setShowRemoveConfigConfirm(newValue)}
   >
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>{dic.removeConfig.title}</DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {dic.removeConfig.confirmRemoveConfig}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>
       {dic.removeConfig.confirmRemoveConfig}
      </p>
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button
        disabled={removeConfigIsPending}
        variant='outline'
        className='sm:w-20'
       >
        {removeConfigIsPending && <Spinner />}
        {dic.removeConfig.cancel}
       </Button>
      </DialogClose>
      <Button
       disabled={removeConfigIsPending}
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        confirmRemoveConfig();
       }}
      >
       {removeConfigIsPending && <Spinner />}
       {dic.removeConfig.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </smsConfigContext.Provider>
 );
}
