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
 type HotelEmployeeSchema,
 createHotelEmployeeSchema,
 defaultValues,
} from '../../schemas/hotel-employees/hotelEmployeesSchema';
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
import NewHotelEmployee from '../../components/hotel-employees/NewHotelEmploye';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import RealPersonFinder from '../../../../general-settings/real-persons/components/real-person-finder/RealPersonFinder';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import CompaniesFinder from '../../../../general-settings/companies/components/companies-finder/CompaniesFinder';

export default function HotelEmployeeConfigProvider({
 children,
 hotelID,
 dic,
 realPersonDic,
 companyDic,
}: {
 children: ReactNode;
 hotelID: number;
 dic: HotelsDictionary;
 realPersonDic: RealPersonsDictionary;
 companyDic: CompaniesDictionary;
}) {
 const queryClient = useQueryClient();
 //
 const [showAddEmployee, setShowAddEmployee] = useState(false);
 const [showFilters, setShowFilters] = useState(false);
 const [selectedEmployeeID, setSelectedEmployeeID] = useState<number | null>(
  null,
 );
 const [selectedPersonID, setSelectedPersonID] = useState<number | null>(null);
 const [showFindPerson, setShowFindPerson] = useState(false);
 const [showRemoveEmployeeConfirm, setShowRemoveEmployeeConfirm] =
  useState(false);
 // form
 const hotelEmployeeUseForm = useForm<HotelEmployeeSchema>({
  resolver: zodResolver(createHotelEmployeeSchema({ dic })),
  defaultValues: defaultValues,
 });
 const [nameValue, jobValue] = hotelEmployeeUseForm.watch(['name', 'job']);
 // init data
 const { data: initData, isLoading: initDataIsLoading } = useQuery({
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

 const filteredData = (() => {
  if (!employees || !employees.length) return employees;
  return employees.filter((item) => {
   return (
    item.personFullName.includes(nameValue) &&
    (jobValue ? item.jobTitleID.toString() === jobValue.key : true)
   );
  });
 })();

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
      'employee',
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

 function handleAddEmployee() {
  setSelectedEmployeeID(null);
  setShowAddEmployee(true);
 }

 function handleEditEmployee(employeeID: number) {
  setSelectedEmployeeID(employeeID);
  setShowAddEmployee(true);
 }

 function handleEditPerson(personID: number) {
  setSelectedPersonID(personID);
  setShowFindPerson(true);
 }

 const ctx: HotelEmployeeContext = {
  hotelID,
  showFilters,
  changeShowFilters: handleChangeShowFilters,
  onEditPerson: handleEditPerson,
  initialData: {
   data: initData,
   isLoading: initDataIsLoading,
  },
  hotelEmployee: {
   data: employees,
   filteredData,
   isLoading: employeesIsLoading,
   isError: employeesIsError,
   isSuccess: employeesIsSuccess,
   isFetching: employeesIsFetching,
   onAddEmployee: handleAddEmployee,
   onEditEmployee: handleEditEmployee,
   refetch: employeesRefetch,
   onRemoveHotelEmployee: handleRemoveEmployee,
  },
 };

 return (
  <hotelEmployeeContext.Provider value={ctx}>
   <FormProvider {...hotelEmployeeUseForm}>{children}</FormProvider>
   <NewHotelEmployee
    open={showAddEmployee}
    setOpen={setShowAddEmployee}
    selectedEmployeeID={selectedEmployeeID}
    realPersonDic={realPersonDic}
    hotelID={hotelID}
    dic={dic}
   />
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
   {selectedPersonID && (
    <RealPersonFinder
     dic={realPersonDic}
     open={showFindPerson}
     onOpenChange={(open) =>
      setShowFindPerson((pre) => (open === undefined ? !pre : open))
     }
     wrapperType={{
      personID: selectedPersonID,
      justEditTab: true,
      defaultTab: 'edit',
      onChangePerson() {
       setShowFindPerson(false);
       queryClient.invalidateQueries({
        queryKey: [hotelHotelEmployeeBasePath, 'all'],
       });
      },
     }}
    />
   )}
  </hotelEmployeeContext.Provider>
 );
}
