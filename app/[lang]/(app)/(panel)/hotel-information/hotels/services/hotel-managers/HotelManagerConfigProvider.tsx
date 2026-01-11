'use client';
import { ReactNode, useState } from 'react';
import {
 type HotelManagerContext,
 hotelManagerContext,
} from './hotelManagerContext';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 hotelHotelMangerBasePath,
 getInitialData,
 removeHotelManager,
 getHotelManagers,
} from './hotelManagersApiActions';
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

export default function HotelManagerConfigProvider({
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
 const [selectedManagerID, setSelectedManagerID] = useState<number | null>(
  null,
 );
 const [showRemoveManagerConfirm, setShowRemoveManagerConfirm] =
  useState(false);
 // form
 const hotelManagersUseForm = useForm<HotelFacilitiesSchema>({
  resolver: zodResolver(createHotelFacilitiesSchema({ dic })),
  defaultValues: defaultValues,
 });
 // init data
 const { data, isLoading, isError, isSuccess } = useQuery({
  staleTime: 'static',
  queryKey: [hotelHotelMangerBasePath, 'initial-data'],
  async queryFn({ signal }) {
   const res = await getInitialData({ signal });
   return res.data;
  },
 });
 // hotel managers
 const {
  data: managers,
  isLoading: managersIsLoading,
  isError: managersIsError,
  isSuccess: managersIsSuccess,
  isFetching: managersIsFetching,
  refetch: managersRefetch,
 } = useQuery({
  queryKey: [hotelHotelMangerBasePath, 'all'],
  async queryFn({ signal }) {
   const res = await getHotelManagers({ signal, hotelID });
   return res.data;
  },
 });

 const filteredData =
  managers && managers.length && ''
   ? managers.filter((item) => item.id)
   : managers;

 // remove owner
 function handleRemoveManager(managerID: number) {
  setShowRemoveManagerConfirm(true);
  setSelectedManagerID(managerID);
 }

 const { mutate: confirmRemoveManager, isPending: removeManagerIsPending } =
  useMutation({
   async mutationFn() {
    return removeHotelManager(selectedManagerID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [hotelHotelMangerBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [
      hotelHotelMangerBasePath,
      'manager',
      selectedManagerID!.toString(),
     ],
    });
    setSelectedManagerID(null);
    setShowRemoveManagerConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });

 const ctx: HotelManagerContext = {
  hotelID,
  initialData: {
   data,
   isLoading,
   isError,
   isSuccess,
  },
  hotelManager: {
   data: managers,
   filteredData,
   isLoading: managersIsLoading,
   isError: managersIsError,
   isSuccess: managersIsSuccess,
   isFetching: managersIsFetching,
   refetch: managersRefetch,
   onRemoveHotelManger: handleRemoveManager,
  },
 };

 return (
  <hotelManagerContext.Provider value={ctx}>
   <FormProvider {...hotelManagersUseForm}>{children}</FormProvider>
   <Dialog
    open={showRemoveManagerConfirm}
    onOpenChange={(newValue) => setShowRemoveManagerConfirm(newValue)}
   >
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>{dic.removeFacility.title}</DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {dic.removeFacility.confirmRemoveFacility}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>
       {dic.removeFacility.confirmRemoveFacility}
      </p>
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button
        disabled={removeManagerIsPending}
        variant='outline'
        className='sm:w-20'
       >
        {removeManagerIsPending && <Spinner />}
        {dic.removeFacility.cancel}
       </Button>
      </DialogClose>
      <Button
       disabled={removeManagerIsPending}
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        confirmRemoveManager();
       }}
      >
       {removeManagerIsPending && <Spinner />}
       {dic.removeFacility.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </hotelManagerContext.Provider>
 );
}
