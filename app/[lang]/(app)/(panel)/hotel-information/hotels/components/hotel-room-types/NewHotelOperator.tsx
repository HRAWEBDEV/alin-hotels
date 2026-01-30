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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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
 type HotelOperatorSchema,
 createHotelOperatorSchema,
 defaultValues,
} from '../../schemas/hotel-operators/hotelOperatorsSchema';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
 type SaveHotelOperatorPackage,
 hotelHotelOperatorBasePath,
 getHotelOperator,
 saveHotelOperator,
 updateHotelOperator,
} from '../../services/hotel-operators/hotelOperatorsApiActions';
import NoItemFound from '../../../../components/NoItemFound';
import { Spinner } from '@/components/ui/spinner';
import {
 realPersonsBasePath,
 getPerson,
} from '../../../../general-settings/real-persons/services/personsApiActions';
import {
 companyBasePath,
 getCompany,
} from '../../../../general-settings/companies/services/personsApiActions';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import RealPersonFinder from '../../../../general-settings/real-persons/components/real-person-finder/RealPersonFinder';
import CompaniesFinder from '../../../../general-settings/companies/components/companies-finder/CompaniesFinder';
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';
import { AxiosError } from 'axios';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import { NumericFormat } from 'react-number-format';

export default function NewHotelOperator({
 dic,
 open,
 operatorID,
 realPersonDic,
 hotelID,
 companyDic,
 setOpen,
}: {
 dic: HotelsDictionary;
 open: boolean;
 operatorID: number | null;
 realPersonDic: RealPersonsDictionary;
 companyDic: CompaniesDictionary;
 hotelID: number;
 setOpen: (open: boolean) => unknown;
}) {
 const {
  shareDictionary: {
   system: { notifications },
  },
 } = useShareDictionary();
 const personInputRef = useRef<HTMLInputElement | null>(null);
 const queryClient = useQueryClient();
 const [showFromDate, setShowFromDate] = useState(false);
 const [showEndDate, setShowEndDate] = useState(false);
 const [personID, setPersonID] = useState(0);
 const [companyID, setCompanyID] = useState(0);
 const [showRealPerson, setShowRealPerson] = useState(false);
 const [showCompany, setShowCompany] = useState(false);
 const [showPersonType, setShowPersonType] = useState<'search' | 'view'>(
  'search',
 );

 const { locale, localeInfo } = useBaseConfig();

 const {
  setValue,
  control,
  setFocus,
  reset,
  formState: { errors },
  watch,
  handleSubmit,
 } = useForm<HotelOperatorSchema>({
  resolver: zodResolver(createHotelOperatorSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 const [personTypeValue] = watch(['personType']);
 // company
 const { data: company, isLoading: companyIsLoading } = useQuery({
  enabled: !!companyID,
  queryKey: [companyBasePath, 'company', companyID.toString()],
  async queryFn({ signal }) {
   const res = await getCompany({
    signal,
    personID: companyID!,
   });
   return res.data;
  },
 });
 // person
 const { data: person, isLoading: personIsLoading } = useQuery({
  enabled: !!personID,
  queryKey: [realPersonsBasePath, 'person', personID.toString()],
  async queryFn({ signal }) {
   const res = await getPerson({
    signal,
    personID: personID!,
   });
   return res.data;
  },
 });
 // get data
 const { data, isError, isLoading } = useQuery({
  enabled: !!operatorID,
  queryKey: [hotelHotelOperatorBasePath, 'operator', operatorID?.toString()],
  async queryFn({ signal }) {
   const res = await getHotelOperator({
    signal,
    hotelOperatorID: operatorID!,
   });
   return res.data;
  },
 });

 // save data
 const { mutate, isPending } = useMutation({
  mutationFn({ fromDate, endDate, percentage }: HotelOperatorSchema) {
   const saveManagerPackage: SaveHotelOperatorPackage = {
    id: data?.id || 0,
    companyID: personTypeValue === 'company' ? companyID : null,
    personID: personTypeValue === 'realPerson' ? personID : null,
    fromDateTimeOffset: fromDate!.toISOString(),
    endDateTimeOffset: endDate!.toISOString(),
    hotelID: hotelID,
    percentage: percentage as number,
   };
   return operatorID
    ? updateHotelOperator(saveManagerPackage)
    : saveHotelOperator(saveManagerPackage);
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: [hotelHotelOperatorBasePath, 'all'],
   });
   if (data) {
    queryClient.invalidateQueries({
     queryKey: [hotelHotelOperatorBasePath, 'operator', data.id.toString()],
    });
    setOpen(false);
   } else {
    reset();
    setValue('personType', 'realPerson');
    setPersonID(0);
    setCompanyID(0);
    toast.success(notifications.itemAdded);
   }
   setTimeout(() => {
    setFocus('personType');
   }, 200);
  },
  onError(err: AxiosError<string>) {
   if (data) {
   }
   toast.error(err.response?.data);
  },
 });

 const setFormDefaults = useCallback(() => {
  setValue(
   'personType',
   data ? (data.personID ? 'realPerson' : 'company') : 'realPerson',
  );
  setPersonID(data?.personID || 0);
  setCompanyID(data?.companyID || 0);
  setValue('fromDate', data ? new Date(data.fromDateTimeOffset) : null);
  setValue('endDate', data ? new Date(data.endDateTimeOffset) : null);
  setValue('percentage', data?.percentage || 0);
 }, [data, setValue]);

 useEffect(() => {
  setFormDefaults();
 }, [setFormDefaults]);

 if (operatorID && isError) return <NoItemFound />;

 return (
  <Dialog open={open} onOpenChange={(newValue) => setOpen(newValue)}>
   <DialogContent className='p-0 gap-0'>
    <form>
     <DialogHeader className='p-4 py-3 border border-input'>
      <DialogTitle className='text-base font-medium'>
       {operatorID
        ? dic.hotelOperator.form.editOperator
        : dic.hotelEmployee.form.addEmployee}
      </DialogTitle>
     </DialogHeader>
     <div className='p-4'>
      <div className='grid grid-cols-2 gap-4 gap-y-5'>
       <div className='col-span-2'>
        <Controller
         control={control}
         name='personType'
         render={({ field: { value, onChange, ...other } }) => (
          <RadioGroup
           dir={localeInfo.contentDirection}
           className='flex gap-5 flex-row'
           value={value}
           onValueChange={(value) => onChange(value)}
           {...other}
          >
           <div className='flex gap-2 items-center'>
            <RadioGroupItem
             id='realPerson'
             value='realPerson'
             className='scale-125 border-neutral-500'
            />
            <Label htmlFor='realPerson'>
             {dic.hotelOperator.form.realPerson}
            </Label>
           </div>
           <div className='flex gap-2 items-center'>
            <RadioGroupItem
             id='company'
             value='company'
             className='scale-125 border-neutral-500'
            />
            <Label htmlFor='company'>{dic.hotelOperator.form.company}</Label>
           </div>
          </RadioGroup>
         )}
        />
       </div>
       <Field className='gap-2'>
        <FieldLabel htmlFor='person'>
         {dic.hotelEmployee.form.person} *
        </FieldLabel>
        <InputGroup className='bg-background'>
         <InputGroupInput
          ref={personInputRef}
          id='person'
          value={
           personTypeValue === 'realPerson'
            ? person?.personFullName || ''
            : company?.name || ''
          }
          onClick={() => {
           if (personIsLoading || companyIsLoading) return;
           if (personTypeValue === 'realPerson') {
            setShowRealPerson(true);
           } else {
            setShowCompany(true);
           }
           setShowPersonType('search');
          }}
          onKeyDown={(e) => {
           if (personIsLoading || companyIsLoading) return;
           if (e.key !== 'Enter' && e.key !== ' ') return;
           e.stopPropagation();
           e.preventDefault();
           if (personTypeValue === 'realPerson') {
            setShowRealPerson(true);
           } else {
            setShowCompany(true);
           }
          }}
          disabled={false}
          readOnly
         />
         <InputGroupAddon align={'inline-end'} className='text-primary gap-0'>
          {(personIsLoading || companyIsLoading) && <Spinner />}
          {((personTypeValue === 'realPerson' && !!personID) ||
           (personTypeValue === 'company' && !!companyID)) && (
           <Button
            type='button'
            size='icon'
            variant='ghost'
            onClick={(e) => {
             if (personIsLoading || companyIsLoading) return;
             e.preventDefault();
             e.stopPropagation();
             if (personTypeValue === 'realPerson') {
              setShowRealPerson(true);
             } else {
              setShowCompany(true);
             }
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
            if (personIsLoading || companyIsLoading) return;
            e.preventDefault();
            e.stopPropagation();
            if (personTypeValue === 'realPerson') {
             setShowRealPerson(true);
            } else {
             setShowCompany(true);
            }
            setShowPersonType('search');
           }}
          >
           <FaSearch />
          </Button>
         </InputGroupAddon>
        </InputGroup>
       </Field>
       <Controller
        control={control}
        name='percentage'
        render={({ field: { value, onChange, ...other } }) => (
         <Field className='gap-2' data-invalid={!!errors.percentage}>
          <FieldLabel htmlFor='percentage'>
           {dic.hotelOperator.form.percentage} *
          </FieldLabel>
          <InputGroup data-invalid={!!errors.percentage}>
           <NumericFormat
            id='percentage'
            customInput={InputGroupInput}
            value={value}
            onValueChange={({ floatValue }) =>
             onChange(floatValue === undefined ? '' : floatValue)
            }
            isAllowed={({ floatValue }) => {
             if (floatValue) {
              return floatValue <= 100;
             }
             return true;
            }}
            {...other}
           />
          </InputGroup>
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
           <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
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
           <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
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
     <DialogFooter className='p-4 py-2 border-t border-input'>
      <DialogClose asChild>
       <Button
        type='button'
        disabled={isLoading || isPending || personIsLoading || companyIsLoading}
        variant='outline'
        className='sm:w-20'
       >
        {(isLoading || isPending || personIsLoading || companyIsLoading) && (
         <Spinner />
        )}
        {dic.hotelOperator.form.cancel}
       </Button>
      </DialogClose>
      <Button
       type='submit'
       disabled={isLoading || isPending || personIsLoading || companyIsLoading}
       className='sm:w-20'
       onClick={(e) => {
        e.preventDefault();
        if (personTypeValue === 'realPerson' ? !personID : !companyID) {
         toast.error(dic.hotelOperator.formValidation.selectPerson);
         return;
        }
        handleSubmit((data) => {
         mutate(data);
        })();
       }}
      >
       {(isLoading || isPending || personIsLoading || companyIsLoading) && (
        <Spinner />
       )}
       {dic.hotelEmployee.form.save}
      </Button>
     </DialogFooter>
    </form>
   </DialogContent>
   {showRealPerson && (
    <RealPersonFinder
     dic={realPersonDic}
     open={showRealPerson}
     onOpenChange={(open) =>
      setShowRealPerson((pre) => (open === undefined ? !pre : open))
     }
     wrapperType={{
      personID: personID,
      defaultTab: showPersonType === 'search' ? 'list' : 'edit',
      onChangePerson(personID) {
       setPersonID(personID);
       setShowRealPerson(false);
       setTimeout(() => {
        setFocus('percentage');
       }, 200);
      },
     }}
    />
   )}
   {showCompany && (
    <CompaniesFinder
     dic={companyDic}
     open={showCompany}
     onOpenChange={(open) =>
      setShowCompany((pre) => (open === undefined ? !pre : open))
     }
     wrapperType={{
      personID: companyID,
      defaultTab: showPersonType === 'search' ? 'list' : 'edit',
      onChangePerson(personID) {
       setCompanyID(personID);
       setShowCompany(false);
       setTimeout(() => {
        setFocus('percentage');
       }, 200);
      },
     }}
    />
   )}
  </Dialog>
 );
}
