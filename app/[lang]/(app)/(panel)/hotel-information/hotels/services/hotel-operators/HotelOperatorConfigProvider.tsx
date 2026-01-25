'use client';
import { ReactNode, useState } from 'react';
import {
 type HotelOperatorContext,
 hotelOperatorContext,
} from './hotelOperatorContext';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 hotelHotelOperatorBasePath,
 removeHotelOperator,
 getHotelOperators,
} from './hotelOperatorsApiActions';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type HotelOperatorSchema,
 createHotelOperatorSchema,
 defaultValues,
} from '../../schemas/hotel-operators/hotelEmployeesSchema';
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

export default function HotelOperatorConfigProvider({
 children,
 hotelID,
 dic,
 realPersonDic,
}: {
 children: ReactNode;
 hotelID: number;
 dic: HotelsDictionary;
 realPersonDic: RealPersonsDictionary;
}) {
 const queryClient = useQueryClient();
 //
 const [showAddOperator, setShowAddOperator] = useState(false);
 const [showFilters, setShowFilters] = useState(false);
 const [selectedOperatorID, setSelectedOperatorID] = useState<number | null>(
  null,
 );
 const [selectedPersonID, setSelectedPersonID] = useState<number | null>(null);
 const [showFindPerson, setShowFindPerson] = useState(false);
 const [showRemoveOperatorConfirm, setShowRemoveOperatorConfirm] =
  useState(false);
 // form
 const hotelOperatorUseForm = useForm<HotelOperatorSchema>({
  resolver: zodResolver(createHotelOperatorSchema({ dic })),
  defaultValues: defaultValues,
 });
 // hotel operators
 const {
  data: operators,
  isLoading: operatorsIsLoading,
  isError: operatorsIsError,
  isSuccess: operatorsIsSuccess,
  isFetching: operatorsIsFetching,
  refetch: operatorsRefetch,
 } = useQuery({
  queryKey: [hotelHotelOperatorBasePath, 'all'],
  async queryFn({ signal }) {
   const res = await getHotelOperators({ signal, hotelID });
   return res.data;
  },
 });

 const filteredData = (() => {
  if (!operators || !operators.length) return operators;
  return operators;
 })();

 // remove operator
 function handleRemoveOperator(operatorID: number) {
  setShowRemoveOperatorConfirm(true);
  setSelectedOperatorID(operatorID);
 }

 const { mutate: confirmRemoveOperator, isPending: removeOperatorIsPending } =
  useMutation({
   async mutationFn() {
    return removeHotelOperator(selectedOperatorID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [hotelHotelOperatorBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [
      hotelHotelOperatorBasePath,
      'operator',
      selectedOperatorID!.toString(),
     ],
    });
    setSelectedOperatorID(null);
    setShowRemoveOperatorConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });

 function handleChangeShowFilters(open?: boolean) {
  setShowFilters((pre) => (open === undefined ? !pre : open));
 }

 function handleAddOperator() {
  setSelectedOperatorID(null);
  setShowAddOperator(true);
 }

 function handleEditOperator(employeeID: number) {
  setSelectedOperatorID(employeeID);
  setShowAddOperator(true);
 }

 function handleEditPerson(params: {
  personID: number | null;
  companyID: number | null;
 }) {
  // setSelectedPersonID(personID);
  // setShowFindPerson(true);
 }

 const ctx: HotelOperatorContext = {
  hotelID,
  showFilters,
  changeShowFilters: handleChangeShowFilters,
  onEditPerson: handleEditPerson,
  hotelOperator: {
   data: operators,
   filteredData,
   isLoading: operatorsIsLoading,
   isError: operatorsIsError,
   isSuccess: operatorsIsSuccess,
   isFetching: operatorsIsFetching,
   onAddOperator: handleAddOperator,
   onEditOperator: handleEditOperator,
   refetch: operatorsRefetch,
   onRemoveHotelOperator: handleRemoveOperator,
  },
 };

 return (
  <hotelOperatorContext.Provider value={ctx}>
   <FormProvider {...hotelOperatorUseForm}>{children}</FormProvider>
   {/* <NewHotelEmployee */}
   {/*  open={showAddOperator} */}
   {/*  setOpen={setShowAddOperator} */}
   {/*  selectedEmployeeID={selectedOperatorID} */}
   {/*  realPersonDic={realPersonDic} */}
   {/*  hotelID={hotelID} */}
   {/*  dic={dic} */}
   {/* /> */}
   <Dialog
    open={showRemoveOperatorConfirm}
    onOpenChange={(newValue) => setShowRemoveOperatorConfirm(newValue)}
   >
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>
       {dic.removeHotelOperator.title}
      </DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {dic.removeHotelOperator.confirmRemoveOperator}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>
       {dic.removeHotelOperator.confirmRemoveOperator}
      </p>
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button
        disabled={removeOperatorIsPending}
        variant='outline'
        className='sm:w-20'
       >
        {removeOperatorIsPending && <Spinner />}
        {dic.removeHotelOperator.cancel}
       </Button>
      </DialogClose>
      <Button
       disabled={removeOperatorIsPending}
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        confirmRemoveOperator();
       }}
      >
       {removeOperatorIsPending && <Spinner />}
       {dic.removeHotelOperator.confirm}
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
        queryKey: [hotelHotelOperatorBasePath, 'all'],
       });
      },
     }}
    />
   )}
  </hotelOperatorContext.Provider>
 );
}
