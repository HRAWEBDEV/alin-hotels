'use client';
import { ReactNode, useState } from 'react';
import {
 type HotelFacilityContext,
 hotelFacilityContext,
} from './hotelFacilityContext';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 hotelFacilitiesBasePath,
 getInitialData,
 removeHotelFacility,
 getHotelFacilities,
} from './hotelFacilityApiActions';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type HotelFacilitiesSchema,
 createHotelFacilitiesSchema,
 defaultValues,
} from '../../schemas/hotel-facilities/hotelFacilitiesSchema';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import {
 Dialog,
 DialogClose,
 DialogTitle,
 DialogDescription,
 DialogHeader,
 DialogFooter,
 DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { IoIosWarning } from 'react-icons/io';
import { useDebouncedValue } from '@tanstack/react-pacer';

export default function HotelFacilityConfigProvider({
 children,
 hotelID,
 dic,
}: {
 children: ReactNode;
 hotelID: number;
 dic: HotelsDictionary;
}) {
 const queryClient = useQueryClient();
 //
 const [selectedFacilityID, setSelectedFacilityID] = useState<number | null>(
  null,
 );
 const [showRemoveFacilityConfirm, setShowRemoveFacilityConfirm] =
  useState(false);
 // form
 const hotelFacilitiesUseForm = useForm<HotelFacilitiesSchema>({
  resolver: zodResolver(createHotelFacilitiesSchema({ dic })),
  defaultValues: defaultValues,
 });
 const nameValue = hotelFacilitiesUseForm.watch('name');
 const [nameDbValue] = useDebouncedValue(nameValue, {
  wait: 500,
 });
 // init data
 const { data, isLoading, isError, isSuccess } = useQuery({
  staleTime: 'static',
  queryKey: [hotelFacilitiesBasePath, 'initial-data'],
  async queryFn({ signal }) {
   const res = await getInitialData({ signal });
   return res.data;
  },
 });
 // hotel facility
 const {
  data: facilities,
  isLoading: facilitiesIsLoading,
  isError: facilitiesIsError,
  isSuccess: facilitiesIsSuccess,
  isFetching: facilitiesIsFetching,
  refetch: facilitiesRefetch,
 } = useQuery({
  queryKey: [hotelFacilitiesBasePath, 'all'],
  async queryFn({ signal }) {
   const res = await getHotelFacilities({ signal, hotelID });
   return res.data;
  },
 });

 const filteredData =
  facilities && facilities.length && nameDbValue
   ? facilities.filter((item) => item.facilityName.includes(nameDbValue))
   : facilities;

 // remove owner
 function handleRemoveFacility(facilityID: number) {
  setShowRemoveFacilityConfirm(true);
  setSelectedFacilityID(facilityID);
 }

 const { mutate: confirmRemoveFacility, isPending: removeFacilityIsPending } =
  useMutation({
   async mutationFn() {
    return removeHotelFacility(selectedFacilityID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [hotelFacilitiesBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [
      hotelFacilitiesBasePath,
      'facility',
      selectedFacilityID!.toString(),
     ],
    });
    setSelectedFacilityID(null);
    setShowRemoveFacilityConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });

 const ctx: HotelFacilityContext = {
  hotelID,
  initialData: {
   data,
   isLoading,
   isError,
   isSuccess,
  },
  facilities: {
   data: facilities,
   filteredData,
   isLoading: facilitiesIsLoading,
   isError: facilitiesIsError,
   isSuccess: facilitiesIsSuccess,
   isFetching: facilitiesIsFetching,
   refetch: facilitiesRefetch,
   onRemoveFacility: handleRemoveFacility,
  },
 };

 return (
  <hotelFacilityContext.Provider value={ctx}>
   <FormProvider {...hotelFacilitiesUseForm}>{children}</FormProvider>
   <Dialog
    open={showRemoveFacilityConfirm}
    onOpenChange={(newValue) => setShowRemoveFacilityConfirm(newValue)}
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
        disabled={removeFacilityIsPending}
        variant='outline'
        className='sm:w-20'
       >
        {removeFacilityIsPending && <Spinner />}
        {dic.removeHotel.cancel}
       </Button>
      </DialogClose>
      <Button
       disabled={removeFacilityIsPending}
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        confirmRemoveFacility();
       }}
      >
       {removeFacilityIsPending && <Spinner />}
       {dic.removeHotel.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </hotelFacilityContext.Provider>
 );
}
