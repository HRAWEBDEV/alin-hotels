'use client';
import { useEffect, useState } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { ReactNode } from 'react';
import {
 type HotelsConfig,
 hotelsConfigContext,
 tabs,
} from './hotelsConfigContext';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import {
 getInitialData,
 hotelBasePath,
 getPagedHotels,
 removeHotel,
} from './hotelsApiActions';
import {
 useQuery,
 useMutation,
 useQueryClient,
 keepPreviousData,
} from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
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
 type HotelSchema,
 defaultValues,
 createHotelSchema,
} from '../schemas/hotelSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { type WrapperTypes } from '../utils/wrapperTypes';
import { useUserProfileContext } from '../../../services/user-profile/userProfileContext';

export default function HotelsConfigProvider({
 children,
 dic,
 ...wrapperType
}: {
 children: ReactNode;
 dic: HotelsDictionary;
} & WrapperTypes) {
 const { settingsPreferences } = useUserProfileContext();
 // queries
 const router = useRouter();
 const searchParams = useSearchParams();
 const activeTabQuery = searchParams.get(
  'activeTab',
 ) as HotelsConfig['selectedTab'];
 const paginationIndexQuery = searchParams.get('paginationIndex');
 const paginationSizeQuery =
  searchParams.get('paginationSize') ||
  settingsPreferences.ui.gridLimitSizeOption.toString();
 const stateIDQuery = searchParams.get('stateID');
 const stateNameQuery = searchParams.get('stateName');
 const cityIDQuery = searchParams.get('cityID');
 const cityNameQuery = searchParams.get('cityName');
 const ownershipTypeIDQuery = searchParams.get('ownershipTypeID');
 const ownershipTypeNameQuery = searchParams.get('ownershipTypeName');
 const ownerOperatorTypeIDQuery = searchParams.get('ownerOperatorTypeID');
 const ownerOperatorTypeNameQuery = searchParams.get('ownerOperatorTypeName');
 const hotelTypeIDQuery = searchParams.get('hotelTypeID');
 const hotelTypeNameQuery = searchParams.get('hotelTypeName');
 const gradeTypeIDQuery = searchParams.get('gradeTypeID');
 const gradeTypeNameQuery = searchParams.get('gradeTypeName');
 const degreeTypeIDQuery = searchParams.get('degreeTypeID');
 const degreeTypeNameQuery = searchParams.get('degreeTypeName');
 const locationTypeIDQuery = searchParams.get('locationTypeID');
 const locationTypeNameQuery = searchParams.get('locationTypeName');
 const hotelThemeIDQuery = searchParams.get('hotelThemeID');
 const hotelThemeNameQuery = searchParams.get('hotelThemeName');
 // filters setup
 const hotelFilters = useForm<HotelSchema>({
  resolver: zodResolver(createHotelSchema({ dic })),
  defaultValues: {
   ...defaultValues,
   ...(() => {
    if (wrapperType.mode === 'find') return {};
    return {
     state:
      stateIDQuery && stateNameQuery
       ? {
          key: stateIDQuery,
          value: stateNameQuery,
         }
       : null,
     city:
      cityIDQuery && cityNameQuery
       ? {
          key: cityIDQuery,
          value: cityNameQuery,
         }
       : null,
     hotelOwnershipType:
      ownershipTypeIDQuery && ownershipTypeNameQuery
       ? {
          key: ownershipTypeIDQuery,
          value: ownershipTypeNameQuery,
         }
       : null,
     hotelOperatorType:
      ownerOperatorTypeIDQuery && ownerOperatorTypeNameQuery
       ? {
          key: ownerOperatorTypeIDQuery,
          value: ownerOperatorTypeNameQuery,
         }
       : null,
     hotelType:
      hotelTypeIDQuery && hotelTypeNameQuery
       ? {
          key: hotelTypeIDQuery,
          value: hotelTypeNameQuery,
         }
       : null,
     gradeType:
      gradeTypeIDQuery && gradeTypeNameQuery
       ? {
          key: gradeTypeIDQuery,
          value: gradeTypeNameQuery,
         }
       : null,
     degreeType:
      degreeTypeIDQuery && degreeTypeNameQuery
       ? {
          key: degreeTypeIDQuery,
          value: degreeTypeNameQuery,
         }
       : null,
     locationType:
      locationTypeIDQuery && locationTypeNameQuery
       ? {
          key: locationTypeIDQuery,
          value: locationTypeNameQuery,
         }
       : null,
     hotelTheme:
      hotelThemeIDQuery && hotelThemeNameQuery
       ? {
          key: hotelThemeIDQuery,
          value: hotelThemeNameQuery,
         }
       : null,
    };
   })(),
  },
 });
 const [
  stateValue,
  cityValue,
  hotelTypeValue,
  hotelOperatorTypevalue,
  hotelOwnershipTypeValue,
  gradeTypeValue,
  degreeTypeValue,
  locationTypeValue,
  hotelThemeValue,
 ] = hotelFilters.watch([
  'state',
  'city',
  'hotelType',
  'hotelOperatorType',
  'hotelOwnershipType',
  'gradeType',
  'degreeType',
  'locationType',
  'hotelTheme',
 ]);
 //
 const queryClient = useQueryClient();
 const { locale } = useBaseConfig();
 const [showFilters, setShowFilters] = useState(false);
 const [selectedTab, setSelectedTab] =
  useState<HotelsConfig['selectedTab']>('list');
 const [selectedHotelID, setSelectedHotelID] = useState<number | null>(() => {
  if (wrapperType.mode === 'find' && wrapperType.hotelID) {
   return wrapperType.hotelID;
  }
  return null;
 });
 const [showRemoveHotelConfirm, setShowRemoveHotelConfirm] = useState(false);

 function handleChangeTab(newTab?: HotelsConfig['selectedTab']) {
  const activeTab = newTab === undefined ? 'list' : newTab;
  setSelectedTab(activeTab);
  if (wrapperType.mode === 'find') return;
  const newSearchParams = new URLSearchParams(searchParams);
  newSearchParams.set('activeTab', activeTab);
  router.replace(
   `/${locale}/hotel-information/hotels?${newSearchParams.toString()}`,
  );
 }

 function handleChangeShowFilters(open?: boolean) {
  setShowFilters((pre) => (open === undefined ? !pre : open));
 }
 // data
 const [pagination, setPagination] = useState<PaginationState>(() => {
  const pageIndex = paginationIndexQuery ? Number(paginationIndexQuery) : 0;
  const pageSize = paginationSizeQuery ? Number(paginationSizeQuery) : 10;
  return {
   pageIndex: pageIndex,
   pageSize: pageSize,
  };
 });
 // init data
 const {
  data: initialData,
  isLoading: initialDataLoading,
  isError: initialDataError,
  isSuccess: initialDataSuccess,
 } = useQuery({
  staleTime: 'static',
  queryKey: [hotelBasePath, 'initial-data'],

  async queryFn({ signal }) {
   const res = await getInitialData({ signal });
   return res.data;
  },
 });
 // data
 const {
  data: hotelsData,
  isLoading: hotelsLoading,
  isFetching: hotelsFetching,
  isError: hotelsError,
  isSuccess: hotelsSucess,
  refetch: refetchHotels,
 } = useQuery({
  placeholderData: keepPreviousData,
  queryKey: [
   hotelBasePath,
   'all',
   pagination.pageSize,
   pagination.pageIndex,
   cityValue?.key || 'all',
   degreeTypeValue?.key || 'all',
   gradeTypeValue?.key || 'all',
   hotelOperatorTypevalue?.key || 'all',
   hotelOwnershipTypeValue?.key || 'all',
   hotelThemeValue?.key || 'all',
   hotelTypeValue?.key || 'all',
   locationTypeValue?.key || 'all',
   stateValue?.key || 'all',
  ],
  async queryFn({ signal }) {
   const res = await getPagedHotels({
    signal,
    limit: pagination.pageSize,
    offset: pagination.pageIndex + 1,
    cityZoneID: cityValue?.key,
    degreeTypeID: degreeTypeValue?.key,
    gradeTypeID: gradeTypeValue?.key,
    hotelOperatorTypeID: hotelOperatorTypevalue?.key,
    hotelOwnershipTypeID: hotelOwnershipTypeValue?.key,
    hotelThemeID: hotelThemeValue?.key,
    hotelTypeID: hotelTypeValue?.key,
    locationTypeID: locationTypeValue?.key,
    stateZoneID: stateValue?.key,
   });

   if (!res.data || !res.data.limit) return;
   const allPages = Math.ceil(res.data.rowsCount / res.data.limit);
   const actviePage = pagination.pageIndex + 1;
   if (allPages && actviePage > allPages) {
    setPagination((pre) => ({
     ...pre,
     pageIndex: allPages - 1,
    }));
   }
   return res.data;
  },
 });
 // change hotel
 function handleChangeSelectedHotelID(id: number | null) {
  setSelectedHotelID(id);
 }
 // remove hotel
 function handleRemoveHotel(hotelID: number) {
  setShowRemoveHotelConfirm(true);
  setSelectedHotelID(hotelID);
 }

 const { mutate: confirmRemoveHotel, isPending: removeHotelIsPending } =
  useMutation({
   async mutationFn() {
    return removeHotel(selectedHotelID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [hotelBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [hotelBasePath, 'hotel', selectedHotelID!.toString()],
    });
    setSelectedHotelID(null);
    setSelectedTab('list');
    setShowRemoveHotelConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });
 //
 function handleEditHotel(id: number) {
  setSelectedHotelID(id);
  setSelectedTab('edit');
 }
 //
 const handleNewHotelSuccess: HotelsConfig['hotels']['onNewHotelSuccess'] = ({
  mode,
  hotelID,
 }) => {
  if (mode === 'edit') {
   setSelectedTab('list');
   setSelectedHotelID(null);
  }
  if (wrapperType.mode === 'find') {
   wrapperType.onChangeHotel(hotelID);
  }
 };
 const handleCancelHotel: HotelsConfig['hotels']['onCancelNewHotel'] = ({
  mode,
 }) => {
  if (mode === 'edit') {
   setSelectedHotelID(null);
  }
  setSelectedTab('list');
 };

 // set queries
 useEffect(() => {
  if (wrapperType.mode === 'find') return;
  const newSearchParams = new URLSearchParams(location.search);
  newSearchParams.set('paginationSize', pagination.pageSize.toString());
  newSearchParams.set('paginationIndex', pagination.pageIndex.toString());
  newSearchParams.set('stateID', stateValue?.key || '');
  newSearchParams.set('stateName', stateValue?.value || '');
  newSearchParams.set('cityID', cityValue?.key || '');
  newSearchParams.set('cityName', cityValue?.value || '');
  newSearchParams.set('ownershipTypeID', hotelOwnershipTypeValue?.key || '');
  newSearchParams.set(
   'ownershipTypeName',
   hotelOwnershipTypeValue?.value || '',
  );
  newSearchParams.set('ownerOperatorTypeID', hotelOperatorTypevalue?.key || '');
  newSearchParams.set(
   'ownerOperatorTypeName',
   hotelOperatorTypevalue?.value || '',
  );
  newSearchParams.set('hotelTypeID', hotelTypeValue?.key || '');
  newSearchParams.set('hotelTypeName', hotelTypeValue?.value || '');
  newSearchParams.set('gradeTypeID', gradeTypeValue?.key || '');
  newSearchParams.set('gradeTypeName', gradeTypeValue?.value || '');
  newSearchParams.set('degreeTypeID', degreeTypeValue?.key || '');
  newSearchParams.set('degreeTypeName', degreeTypeValue?.value || '');
  newSearchParams.set('locationTypeID', locationTypeValue?.key || '');
  newSearchParams.set('locationTypeName', locationTypeValue?.value || '');
  newSearchParams.set('hotelThemeID', hotelThemeValue?.key || '');
  newSearchParams.set('hotelThemeName', hotelThemeValue?.value || '');
  router.replace(
   `/${locale}/hotel-information/hotels?${newSearchParams.toString()}`,
  );
 }, [
  wrapperType.mode,
  locale,
  router,
  degreeTypeValue,
  gradeTypeValue,
  hotelOperatorTypevalue,
  hotelOwnershipTypeValue,
  hotelThemeValue,
  hotelTypeValue,
  locationTypeValue,
  cityValue,
  stateValue,
  pagination,
 ]);

 const ctx: HotelsConfig = {
  wrapperType: wrapperType,
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
  hotels: {
   queries: {},
   data: hotelsData,
   isError: hotelsError,
   isFetching: hotelsFetching,
   isLoading: hotelsLoading,
   isSuccess: hotelsSucess,
   selectedHotelID,
   pagination,
   refetchHotels,
   onChangePagination: setPagination,
   onChangeSelectedHotelID: handleChangeSelectedHotelID,
   onRemoveHotel: handleRemoveHotel,
   onEditHotel: handleEditHotel,
   onNewHotelSuccess: handleNewHotelSuccess,
   onCancelNewHotel: handleCancelHotel,
  },
 };

 return (
  <hotelsConfigContext.Provider value={ctx}>
   <FormProvider {...hotelFilters}>{children}</FormProvider>
   <Dialog
    open={showRemoveHotelConfirm}
    onOpenChange={(newValue) => setShowRemoveHotelConfirm(newValue)}
   >
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>{dic.removeHotel.title}</DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {dic.removeHotel.confirmRemovePerson}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>
       {dic.removeHotel.confirmRemovePerson}
      </p>
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button
        disabled={removeHotelIsPending}
        variant='outline'
        className='sm:w-20'
       >
        {removeHotelIsPending && <Spinner />}
        {dic.removeHotel.cancel}
       </Button>
      </DialogClose>
      <Button
       disabled={removeHotelIsPending}
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        confirmRemoveHotel();
       }}
      >
       {removeHotelIsPending && <Spinner />}
       {dic.removeHotel.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </hotelsConfigContext.Provider>
 );
}
