'use client';
import { ReactNode, useState } from 'react';
import {
 type HotelRoomTypeContext,
 hotelRoomTypeContext,
} from './hotelRoomTypeContext';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 hotelHotelRoomTypeBasePath,
 removeHotelRoomType,
 getHotelRoomTypes,
} from './hotelRoomTypesApiActions';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type HotelHotelRoomSchema,
 createHotelRoomTypesSchema,
 defaultValues,
} from '../../schemas/hotel-room-types/hotelRoomTypesSchema';
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
import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';
// import NewHotelOperator from '../../components/hotel-operators/NewHotelOperator';

export default function HotelRoomTypeConfigProvider({
 children,
 hotelID,
 dic,
 roomTypesDic,
}: {
 children: ReactNode;
 hotelID: number;
 dic: HotelsDictionary;
 roomTypesDic: RoomTypesDictionary;
}) {
 const queryClient = useQueryClient();
 //
 const [showAddRoomType, setShowAddRoomType] = useState(false);
 const [showFilters, setShowFilters] = useState(false);
 const [selectedRoomTypeID, setSelectedRoomTypeID] = useState<number | null>(
  null,
 );
 const [showRemoveRoomTypeConfirm, setShowRemoveRoomTypeConfirm] =
  useState(false);
 // form
 const hotelRoomTypeUseForm = useForm<HotelHotelRoomSchema>({
  resolver: zodResolver(createHotelRoomTypesSchema({ dic })),
  defaultValues: defaultValues,
 });
 const [nameValue] = hotelRoomTypeUseForm.watch(['name']);
 // hotel room types
 const {
  data: roomTypes,
  isLoading: roomTypesIsLoading,
  isError: roomTypesIsError,
  isSuccess: roomTypesIsSuccess,
  isFetching: roomTypesIsFetching,
  refetch: roomTypesRefetch,
 } = useQuery({
  queryKey: [hotelHotelRoomTypeBasePath, 'all'],
  async queryFn({ signal }) {
   const res = await getHotelRoomTypes({ signal, hotelID });
   return res.data;
  },
 });

 const filteredData = (() => {
  if (!roomTypes || !roomTypes.length) return roomTypes;
  return roomTypes.filter(() => {
   return true;
  });
 })();

 // remove room type
 function handleRemoveRoomType(roomTypeID: number) {
  setShowRemoveRoomTypeConfirm(true);
  setSelectedRoomTypeID(roomTypeID);
 }

 const { mutate: confirmRemoveRoomType, isPending: removeRoomTypeIsPending } =
  useMutation({
   async mutationFn() {
    return removeHotelRoomType(selectedRoomTypeID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [hotelHotelRoomTypeBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [
      hotelHotelRoomTypeBasePath,
      'roomType',
      selectedRoomTypeID!.toString(),
     ],
    });
    setSelectedRoomTypeID(null);
    setShowRemoveRoomTypeConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });

 function handleChangeShowFilters(open?: boolean) {
  setShowFilters((pre) => (open === undefined ? !pre : open));
 }

 function handleAddRoomType() {
  setSelectedRoomTypeID(null);
  setShowAddRoomType(true);
 }

 function handleEditRoomType(roomTypeID: number) {
  setSelectedRoomTypeID(roomTypeID);
  setShowAddRoomType(true);
 }

 const ctx: HotelRoomTypeContext = {
  hotelID,
  showFilters,
  changeShowFilters: handleChangeShowFilters,
  hotelRoomTypes: {
   data: roomTypes,
   filteredData,
   isLoading: roomTypesIsLoading,
   isError: roomTypesIsError,
   isSuccess: roomTypesIsSuccess,
   isFetching: roomTypesIsFetching,
   onAddRoomType: handleAddRoomType,
   onEditRoomType: handleEditRoomType,
   refetch: roomTypesRefetch,
   onRemoveHotelRoomType: handleRemoveRoomType,
  },
 };

 return (
  <hotelRoomTypeContext.Provider value={ctx}>
   <FormProvider {...hotelRoomTypeUseForm}>{children}</FormProvider>
   {/*<NewHotelOperator
    open={showAddOperator}
    setOpen={setShowAddOperator}
    operatorID={selectedOperatorID}
    realPersonDic={realPersonDic}
    companyDic={companyDic}
    hotelID={hotelID}
    dic={dic}
   />*/}
   <Dialog
    open={showRemoveRoomTypeConfirm}
    onOpenChange={(newValue) => setShowRemoveRoomTypeConfirm(newValue)}
   >
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>
       {dic.removeHotelRoomType.title}
      </DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {dic.removeHotelRoomType.confirmRemoveRoomType}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>
       {dic.removeHotelRoomType.confirmRemoveRoomType}
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
        {dic.removeHotelRoomType.cancel}
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
       {dic.removeHotelRoomType.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </hotelRoomTypeContext.Provider>
 );
}
