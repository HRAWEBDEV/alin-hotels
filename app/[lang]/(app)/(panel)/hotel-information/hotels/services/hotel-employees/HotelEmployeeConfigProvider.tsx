'use client';
import { ReactNode, useState } from 'react';
import {
 type HotelEmployeeContext,
 hotelEmployeeContext,
} from './hotelEmployeeContext';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 hotelHotelEmployeeBasePath,
 getInitialData,
 removeHotelEmployee,
 getHotelEmployees,
} from './hotelEmployeesApiActions';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type HotelManagersSchema,
 createHotelManagersSchema,
 defaultValues,
} from '../../schemas/hotel-managers/hotelManagersSchema';
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
 const [showFilters, setShowFilters] = useState(false);
 const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(
  null,
 );
 const [showRemoveEmployeeConfirm, setShowRemoveEmployeeConfirm] =
  useState(false);
 // form
 const hotelManagersUseForm = useForm<HotelManagersSchema>({
  resolver: zodResolver(createHotelManagersSchema({ dic })),
  defaultValues: defaultValues,
 });
 // init data
 const { data, isLoading, isError, isSuccess } = useQuery({
  staleTime: 'static',
  queryKey: [hotelHotelEmployeeBasePath, 'initial-data'],
  async queryFn({ signal }) {
   const res = await getInitialData({ signal });
   return res.data;
  },
 });
 // hotel employees
 const {
  data: employees,
  isLoading: employeesIsLoading,
  isError: employeesIsError,
  isSuccess: employeesIsSuccess,
  isFetching: employeesIsFetching,
  refetch: employeesRefetch,
 } = useQuery({
  queryKey: [hotelHotelEmployeeBasePath, 'all'],
  async queryFn({ signal }) {
   const res = await getHotelEmployees({ signal, hotelID });
   return res.data;
  },
 });

 const filteredData =
  employees && employees.length && ''
   ? employees.filter((item) => item.id)
   : employees;

 // remove owner
 function handleRemoveEmployee(employeeID: number) {
  setShowRemoveEmployeeConfirm(true);
  setSelectedEmployeeID(employeeID);
 }

 const { mutate: confirmRemoveEmployee, isPending: removeEmployeeIsPending } =
  useMutation({
   async mutationFn() {
    return removeHotelEmployee(selectedEmployeeID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [hotelHotelEmployeeBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [
      hotelHotelEmployeeBasePath,
      'manager',
      selectedEmployeeID!.toString(),
     ],
    });
    setSelectedEmployeeID(null);
    setShowRemoveEmployeeConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });

 function handleChangeShowFilters(open?: boolean) {
  setShowFilters((pre) => (open === undefined ? !pre : open));
 }

 const ctx: HotelEmployeeContext = {
  hotelID,
  showFilters,
  changeShowFilters: handleChangeShowFilters,
  initialData: {
   data,
   isLoading,
   isError,
   isSuccess,
  },
  hotelEmployee: {
   data: employees,
   filteredData,
   isLoading: employeesIsLoading,
   isError: employeesIsError,
   isSuccess: employeesIsSuccess,
   isFetching: employeesIsFetching,
   refetch: employeesRefetch,
   onRemoveHotelEmployee: handleRemoveEmployee,
  },
 };

 return (
  <hotelEmployeeContext.Provider value={ctx}>
   <FormProvider {...hotelManagersUseForm}>{children}</FormProvider>
   <Dialog
    open={showRemoveEmployeeConfirm}
    onOpenChange={(newValue) => setShowRemoveEmployeeConfirm(newValue)}
   >
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>
       {dic.removeHotelEmployee.title}
      </DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {dic.removeHotelEmployee.confirmRemoveFacility}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>
       {dic.removeHotelEmployee.confirmRemoveFacility}
      </p>
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button
        disabled={removeEmployeeIsPending}
        variant='outline'
        className='sm:w-20'
       >
        {removeEmployeeIsPending && <Spinner />}
        {dic.removeHotelEmployee.cancel}
       </Button>
      </DialogClose>
      <Button
       disabled={removeEmployeeIsPending}
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        confirmRemoveEmployee();
       }}
      >
       {removeEmployeeIsPending && <Spinner />}
       {dic.removeHotelEmployee.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </hotelEmployeeContext.Provider>
 );
}
