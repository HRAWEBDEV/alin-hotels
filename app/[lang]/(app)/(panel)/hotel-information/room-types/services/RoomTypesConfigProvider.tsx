'use client';
import { useEffect, useState } from 'react';
import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';
import { ReactNode } from 'react';
import {
 type RoomTypesConfig,
 roomTypeConfigContext,
 tabs,
} from './roomTypesConfigContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import {
 roomTypesBasePath,
 getAllRoomTypes,
 removeRoomType,
} from './roomTypesApiActions';
import {
 useQuery,
 useMutation,
 useQueryClient,
 keepPreviousData,
} from '@tanstack/react-query';
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
 type RoomTypeSchema,
 defaultValues,
 createRoomTypeSchema,
} from '../schemas/roomTypeSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { type WrapperTypes } from '../utils/wrapperTypes';
import { useUserProfileContext } from '../../../services/user-profile/userProfileContext';

export default function RoomTypesConfigProvider({
 children,
 dic,
 ...wrapperType
}: {
 children: ReactNode;
 dic: RoomTypesDictionary;
} & WrapperTypes) {
 const { settingsPreferences } = useUserProfileContext();
 // queries
 const router = useRouter();
 const searchParams = useSearchParams();
 const activeTabQuery = searchParams.get(
  'activeTab',
 ) as RoomTypesConfig['selectedTab'];
 // filters setup
 const hotelFilters = useForm<RoomTypeSchema>({
  resolver: zodResolver(createRoomTypeSchema({ dic })),
  defaultValues: {
   ...defaultValues,
   ...(() => {
    if (wrapperType.mode === 'find') return {};
    return {};
   })(),
  },
 });
 //
 const queryClient = useQueryClient();
 const { locale } = useBaseConfig();
 const [showFilters, setShowFilters] = useState(false);
 const [selectedTab, setSelectedTab] =
  useState<RoomTypesConfig['selectedTab']>('list');
 const [selectedRoomTypeID, setSelectedRoomTypeID] = useState<number | null>(
  () => {
   if (wrapperType.mode === 'find' && wrapperType.roomTypeID) {
    return wrapperType.roomTypeID;
   }
   return null;
  },
 );
 const [showRemoveRoomTypeConfirm, setShowRemoveRoomTypeConfirm] =
  useState(false);

 function handleChangeTab(newTab?: RoomTypesConfig['selectedTab']) {
  const activeTab = newTab === undefined ? 'list' : newTab;
  setSelectedTab(activeTab);
  if (wrapperType.mode === 'find') return;
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set('activeTab', activeTab);
  router.replace(
   `/${locale}/hotel-information/room-types?${newSearchParams.toString()}`,
  );
 }

 function handleChangeShowFilters(open?: boolean) {
  setShowFilters((pre) => (open === undefined ? !pre : open));
 }
 // data
 const {
  data: roomTypesData,
  isLoading: roomTypesLoading,
  isFetching: roomTypesFetching,
  isError: roomTypesError,
  isSuccess: roomTypesSucess,
  refetch: refetchRoomTypes,
 } = useQuery({
  placeholderData: keepPreviousData,
  queryKey: [roomTypesBasePath, 'all'],
  async queryFn({ signal }) {
   const res = await getAllRoomTypes({
    signal,
   });
   return res.data;
  },
 });
 // change hotel
 function handleChangeSelectedRoomTypeID(id: number | null) {
  setSelectedRoomTypeID(id);
 }
 // remove hotel
 function handleRemoveRoomType(roomTypeID: number) {
  setShowRemoveRoomTypeConfirm(true);
  setSelectedRoomTypeID(roomTypeID);
 }

 const { mutate: confirmRemoveRoomType, isPending: removeRoomTypeIsPending } =
  useMutation({
   async mutationFn() {
    return removeRoomType(selectedRoomTypeID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [roomTypesBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [roomTypesBasePath, 'room-type', selectedRoomTypeID!.toString()],
    });
    setSelectedRoomTypeID(null);
    setSelectedTab('list');
    setShowRemoveRoomTypeConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });
 //
 function handleEditRoomType(id: number) {
  setSelectedRoomTypeID(id);
  setSelectedTab('edit');
 }
 //
 const handleNewHotelSuccess: RoomTypesConfig['roomTypes']['onNewRoomTypeSuccess'] =
  ({ mode, roomTypeID }) => {
   if (mode === 'edit') {
    setSelectedTab('list');
    setSelectedRoomTypeID(null);
   }
   if (wrapperType.mode === 'find') {
    wrapperType.onChangeHotel(roomTypeID);
   }
  };
 const handleCancelRoomType: RoomTypesConfig['roomTypes']['onCancelNewRoomType'] =
  ({ mode }) => {
   if (mode === 'edit') {
    setSelectedRoomTypeID(null);
   }
   setSelectedTab('list');
  };

 // set queries
 useEffect(() => {
  if (wrapperType.mode === 'find') return;
  const newSearchParams = new URLSearchParams(location.search);
  router.replace(
   `/${locale}/hotel-information/room-types?${newSearchParams.toString()}`,
  );
 }, [wrapperType.mode, locale, router]);

 const ctx: RoomTypesConfig = {
  wrapperType: wrapperType,
  tabs,
  selectedTab,
  showFilters,
  changeShowFilters: handleChangeShowFilters,
  changeSelectedTab: handleChangeTab,
  roomTypes: {
   queries: {},
   data: roomTypesData,
   isError: roomTypesError,
   isFetching: roomTypesFetching,
   isLoading: roomTypesLoading,
   isSuccess: roomTypesSucess,
   selectedRoomTypeID,
   refetchRoomTypes,
   onChangeSelectedRoomTypeID: handleChangeSelectedRoomTypeID,
   onRemoveRoomType: handleRemoveRoomType,
   onEditRoomType: handleEditRoomType,
   onNewRoomTypeSuccess: handleNewHotelSuccess,
   onCancelNewRoomType: handleCancelRoomType,
  },
 };

 return (
  <roomTypeConfigContext.Provider value={ctx}>
   <FormProvider {...hotelFilters}>{children}</FormProvider>
   <Dialog
    open={showRemoveRoomTypeConfirm}
    onOpenChange={(newValue) => setShowRemoveRoomTypeConfirm(newValue)}
   >
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>{dic.removeRoomType.title}</DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {dic.removeRoomType.confirmRemoveRoomType}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>
       {dic.removeRoomType.confirmRemoveRoomType}
      </p>
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button
        disabled={removeRoomTypeIsPending}
        variant='outline'
        className='sm:w-20'
       >
        {removeRoomTypeIsPending && <Spinner />}
        {dic.removeRoomType.cancel}
       </Button>
      </DialogClose>
      <Button
       disabled={removeRoomTypeIsPending}
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        confirmRemoveRoomType();
       }}
      >
       {removeRoomTypeIsPending && <Spinner />}
       {dic.removeRoomType.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </roomTypeConfigContext.Provider>
 );
}
