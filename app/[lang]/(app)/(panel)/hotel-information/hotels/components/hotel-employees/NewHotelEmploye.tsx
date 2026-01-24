'use client';
import { useState, useCallback, useEffect, useRef } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import {
 Dialog,
 DialogClose,
 DialogTitle,
 DialogHeader,
 DialogFooter,
 DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Field, FieldLabel } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupAddon,
} from '@/components/ui/input-group';
import { FaRegTrashAlt, FaEye } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type HotelEmployeeSchema,
 createHotelEmployeeSchema,
 defaultValues,
} from '../../schemas/hotel-employees/hotelEmployeesSchema';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
 hotelHotelEmployeeBasePath,
 getHotelEmployee,
 getInitialData,
 saveHotelEmployee,
 updateHotelEmployee,
} from '../../services/hotel-employees/hotelEmployeesApiActions';
import NoItemFound from '../../../../components/NoItemFound';
import { Spinner } from '@/components/ui/spinner';
import {
 realPersonsBasePath,
 getPerson,
} from '../../../../general-settings/real-persons/services/personsApiActions';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
 Command,
 CommandGroup,
 CommandInput,
 CommandItem,
 CommandList,
} from '@/components/ui/command';
import { toast } from 'sonner';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import RealPersonFinder from '../../../../general-settings/real-persons/components/real-person-finder/RealPersonFinder';
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';
import { AxiosError } from 'axios';
import { SaveHotelManagerPackage } from '../../services/hotel-managers/hotelManagersApiActions';

export default function NewHotelEmployee({
 dic,
 open,
 selectedEmployeeID,
 realPersonDic,
 hotelID,
 setOpen,
}: {
 dic: HotelsDictionary;
 open: boolean;
 selectedEmployeeID: number | null;
 realPersonDic: RealPersonsDictionary;
 hotelID: number;
 setOpen: (open: boolean) => unknown;
}) {
 const {
  shareDictionary: {
   system: { notifications },
  },
 } = useShareDictionary();
 const queryClient = useQueryClient();
 const [personID, setPersonID] = useState(0);
 const personInputRef = useRef<HTMLInputElement | null>(null);
 const [showRealPerson, setShowRealPerson] = useState(false);
 const [showJobs, setShowJobs] = useState(false);
 const [showPersonType, setShowPersonType] = useState<'search' | 'view'>(
  'search',
 );
 const [showFromDate, setShowFromDate] = useState(false);
 const [showEndDate, setShowEndDate] = useState(false);

 const { locale } = useBaseConfig();

 const {
  setValue,
  control,
  setFocus,
  reset,
  formState: { errors },
  handleSubmit,
 } = useForm<HotelEmployeeSchema>({
  resolver: zodResolver(createHotelEmployeeSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 // init data
 const { data: initData, isLoading: initDataIsLoading } = useQuery({
  staleTime: 'static',
  queryKey: [hotelHotelEmployeeBasePath, 'initial-data'],
  async queryFn({ signal }) {
   const res = await getInitialData({ signal });
   return res.data;
  },
 });
 // person
 const {
  data: personData,
  isLoading: personLoading,
  isSuccess: personIsSuccess,
 } = useQuery({
  enabled: !!personID,
  queryKey: [realPersonsBasePath, 'person', personID.toString()],
  async queryFn({ signal }) {
   const res = await getPerson({
    personID,
    signal,
   });
   return res.data;
  },
 });
 // get data
 const { data, isError, isLoading } = useQuery({
  enabled: !!selectedEmployeeID,
  queryKey: [
   hotelHotelEmployeeBasePath,
   'employee',
   selectedEmployeeID?.toString(),
  ],
  async queryFn({ signal }) {
   const res = await getHotelEmployee({
    signal,
    hotelEmployeeID: selectedEmployeeID!,
   });
   return res.data;
  },
 });
 // save data
 const { mutate, isPending } = useMutation({
  mutationFn({ job, fromDate, endDate }: HotelEmployeeSchema) {
   const saveManagerPackage: SaveHotelManagerPackage = {
    id: data?.id || 0,
    hotelID,
    jobTitleID: Number(job!.key),
    fromDateTimeOffset: fromDate!.toISOString(),
    endDateTimeOffset: endDate!.toISOString(),
    personID,
   };
   return selectedEmployeeID
    ? updateHotelEmployee(saveManagerPackage)
    : saveHotelEmployee(saveManagerPackage);
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: [hotelHotelEmployeeBasePath, 'all'],
   });
   if (data) {
    queryClient.invalidateQueries({
     queryKey: [hotelHotelEmployeeBasePath, 'employee', data.id.toString()],
    });
    setOpen(false);
   } else {
    reset();
    setPersonID(0);
    toast.success(notifications.itemAdded);
   }
   setTimeout(() => {
    personInputRef.current?.focus();
   }, 200);
  },
  onError(err: AxiosError<string>) {
   if (data) {
   }
   toast.error(err.response?.data);
  },
 });

 const setFormDefaults = useCallback(() => {
  setPersonID(data?.personID || 0);
  setValue(
   'job',
   data?.jobTitleID && data.jobTitleName
    ? {
       key: data.jobTitleID.toString(),
       value: data.jobTitleName,
      }
    : null,
  );
  setValue(
   'fromDate',
   data?.fromDateTimeOffset ? new Date(data.fromDateTimeOffset) : null,
  );
  setValue(
   'endDate',
   data?.endDateTimeOffset ? new Date(data.endDateTimeOffset) : null,
  );
 }, [data, setValue]);

 useEffect(() => {
  setFormDefaults();
 }, [setFormDefaults]);

 if (selectedEmployeeID && isError) return <NoItemFound />;

 return (
  <Dialog open={open} onOpenChange={(newValue) => setOpen(newValue)}>
   <DialogContent className='p-0 gap-0'>
    <DialogHeader className='p-4 py-3 border border-input'>
     <DialogTitle className='text-base font-medium'>
      {selectedEmployeeID
       ? dic.hotelEmployee.form.editEmployee
       : dic.hotelEmployee.form.addEmployee}
     </DialogTitle>
    </DialogHeader>
    <div className='p-4'>
     <form className='group grid grid-cols-1'>
      <div>
       <div className='gap-y-4 gap-3 grid grid-cols-2 mb-4'>
        <Field className='gap-2 col-span-2'>
         <FieldLabel htmlFor='person'>
          {dic.hotelEmployee.form.person} *
         </FieldLabel>
         <InputGroup className='bg-background'>
          <InputGroupInput
           ref={personInputRef}
           id='person'
           value={personData?.personFullName || ''}
           onClick={() => {
            if (personLoading) return;
            setShowRealPerson(true);
            setShowPersonType('search');
           }}
           onKeyDown={(e) => {
            if (personLoading) return;
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.stopPropagation();
            e.preventDefault();
            setShowRealPerson(true);
            setShowPersonType('search');
           }}
           disabled={personLoading}
           readOnly
          />
          <InputGroupAddon align={'inline-end'} className='text-primary gap-0'>
           {personLoading && <Spinner />}
           {!!personID && (
            <Button
             type='button'
             size='icon'
             variant='ghost'
             onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowRealPerson(true);
              setShowPersonType('view');
             }}
            >
             <FaEye />
            </Button>
           )}
           <Button
            type='button'
            size='icon'
            variant='ghost'
            className='-me-3'
            onClick={(e) => {
             e.preventDefault();
             e.stopPropagation();
             setShowRealPerson(true);
             setShowPersonType('search');
            }}
           >
            <FaSearch />
           </Button>
          </InputGroupAddon>
         </InputGroup>
        </Field>
        <Field className='gap-2'>
         <FieldLabel htmlFor='mobileNo'>
          {dic.hotelManager.form.mobileNo}
         </FieldLabel>
         <InputGroup className='bg-background'>
          <InputGroupInput
           id='mobileNo'
           value={personData?.mobileNo || ''}
           readOnly
          />
         </InputGroup>
        </Field>
        <Controller
         control={control}
         name='job'
         render={({ field: { value, onChange, ...other } }) => (
          <Field className='gap-2' data-invalid={!!errors.job}>
           <FieldLabel htmlFor='job'>{dic.hotelEmployee.form.job} *</FieldLabel>
           <Popover open={showJobs} onOpenChange={setShowJobs}>
            <PopoverTrigger asChild>
             <Button
              type='button'
              id='job'
              title={value?.value || ''}
              variant='outline'
              role='combobox'
              aria-expanded={showJobs}
              className='justify-between'
              data-invalid={!!errors.job}
              {...other}
             >
              <span className='text-start grow overflow-hidden text-ellipsis'>
               {value?.value || ''}
              </span>
              <div className='flex gap-1 items-center -me-2'>
               {initDataIsLoading && <Spinner />}
               <ChevronsUpDown className='opacity-50' />
              </div>
             </Button>
            </PopoverTrigger>
            <PopoverContent className='w-[200px] p-0'>
             <Command>
              <CommandInput />
              <CommandList>
               <CommandGroup>
                {initData?.jobTitles.map((item) => (
                 <CommandItem
                  key={item.key}
                  value={item.value}
                  onSelect={() => {
                   setShowJobs(false);
                   onChange(item);
                  }}
                 >
                  {item.value}
                  <Check
                   className={cn(
                    'ml-auto',
                    value?.key === item.key ? 'opacity-100' : 'opacity-0',
                   )}
                  />
                 </CommandItem>
                ))}
               </CommandGroup>
              </CommandList>
             </Command>
            </PopoverContent>
           </Popover>
          </Field>
         )}
        />
        <Controller
         control={control}
         name='fromDate'
         render={({ field: { value, onChange, ...other } }) => (
          <Field className='gap-2' data-invalid={!!errors.fromDate}>
           <FieldLabel htmlFor='fromDate' className='px-1'>
            {dic.hotelManager.form.fromDate}
           </FieldLabel>
           <Popover open={showFromDate} onOpenChange={setShowFromDate}>
            <PopoverTrigger asChild>
             <Button
              data-invalid={!!errors.fromDate}
              type='button'
              variant='outline'
              id='fromDate'
              className='justify-between font-normal'
              {...other}
             >
              <span>{value ? value.toLocaleDateString(locale) : ''}</span>
              <div className='flex gap-1 items-center -me-2'>
               {value && (
                <Button
                 type='button'
                 variant={'ghost'}
                 size={'icon'}
                 onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                 }}
                 className='text-rose-700 dark:text-rose-400'
                >
                 <FaRegTrashAlt />
                </Button>
               )}
               <ChevronDownIcon className='opacity-50' />
              </div>
             </Button>
            </PopoverTrigger>
            <PopoverContent
             className='w-auto overflow-hidden p-0'
             align='start'
            >
             <Calendar
              mode='single'
              selected={value || undefined}
              onSelect={(selected) => onChange(selected)}
              defaultMonth={value || undefined}
              captionLayout='dropdown'
             />
            </PopoverContent>
           </Popover>
          </Field>
         )}
        />
        <Controller
         control={control}
         name='endDate'
         render={({ field: { value, onChange, ...other } }) => (
          <Field className='gap-2' data-invalid={!!errors.endDate}>
           <FieldLabel htmlFor='endDate' className='px-1'>
            {dic.hotelManager.form.toDate}
           </FieldLabel>
           <Popover open={showEndDate} onOpenChange={setShowEndDate}>
            <PopoverTrigger asChild>
             <Button
              type='button'
              variant='outline'
              id='endDate'
              className='justify-between font-normal'
              data-invalid={!!errors.endDate}
              {...other}
             >
              <span>{value ? value.toLocaleDateString(locale) : ''}</span>
              <div className='flex gap-1 items-center -me-2'>
               {value && (
                <Button
                 type='button'
                 variant={'ghost'}
                 size={'icon'}
                 onClick={(e) => {
                  e.stopPropagation();
                  onChange(null);
                 }}
                 className='text-rose-700 dark:text-rose-400'
                >
                 <FaRegTrashAlt />
                </Button>
               )}
               <ChevronDownIcon className='opacity-50' />
              </div>
             </Button>
            </PopoverTrigger>
            <PopoverContent
             className='w-auto overflow-hidden p-0'
             align='start'
            >
             <Calendar
              mode='single'
              selected={value || undefined}
              onSelect={(selected) => onChange(selected)}
              defaultMonth={value || undefined}
              captionLayout='dropdown'
             />
            </PopoverContent>
           </Popover>
          </Field>
         )}
        />
       </div>
      </div>
      <RealPersonFinder
       dic={realPersonDic}
       open={showRealPerson}
       onOpenChange={(open) =>
        setShowRealPerson((pre) => (open === undefined ? !pre : open))
       }
       wrapperType={{
        personID,
        defaultTab: showPersonType === 'search' ? 'list' : 'edit',
        onChangePerson(personID) {
         setPersonID(personID);
         setShowRealPerson(false);
         setTimeout(() => {
          setFocus('job');
         }, 200);
        },
       }}
      />
     </form>
    </div>
    <DialogFooter className='p-4 py-2 border-t border-input'>
     <DialogClose asChild>
      <Button
       disabled={isLoading || personLoading || isPending}
       variant='outline'
       className='sm:w-20'
      >
       {(isLoading || personLoading || isPending) && <Spinner />}
       {dic.hotelEmployee.form.cancel}
      </Button>
     </DialogClose>
     <Button
      disabled={isLoading || personLoading || isPending}
      className='sm:w-20'
      onClick={(e) => {
       e.preventDefault();
       if (!personID) {
        toast.error(dic.hotelEmployee.formValidation.selectPerson);
        return;
       }
       handleSubmit((data) => {
        mutate(data);
       })();
      }}
     >
      {(isLoading || personLoading || isPending) && <Spinner />}
      {dic.hotelEmployee.form.save}
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
