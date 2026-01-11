'use client';
import { useState, useEffect } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { Field, FieldLabel } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupAddon,
} from '@/components/ui/input-group';
import {
 type HotelManagersSchema,
 defaultValues,
 createHotelManagersSchema,
} from '../../schemas/hotel-managers/hotelManagersSchema';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import {
 type HotelManager,
 type SaveHotelManagerPackage,
 hotelHotelMangerBasePath,
 saveHotelManager,
 updateHotelManager,
} from '../../services/hotel-managers/hotelManagersApiActions';
import { Spinner } from '@/components/ui/spinner';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useHotelManagerContext } from '../../services/hotel-managers/hotelManagerContext';
import { IoTrashOutline } from 'react-icons/io5';
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
import { NumericFormat } from 'react-number-format';
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import {
 realPersonsBasePath,
 getPerson,
} from '../../../../general-settings/real-persons/services/personsApiActions';
import RealPersonFinder from '../../../../general-settings/real-persons/components/real-person-finder/RealPersonFinder';

export default function HotelFacilitiesItem({
 dic,
 realPersonDic,
 hotelManager,
 onCancel,
}: {
 dic: HotelsDictionary;
 realPersonDic: RealPersonsDictionary;
 hotelManager: HotelManager | null;
 onCancel?: () => unknown;
}) {
 const [showRealPerson, setShowRealPerson] = useState(false);
 const [personID, setPersonID] = useState(0);
 const [showMore, setShowMore] = useState(false);
 const [showJobs, setShowJobs] = useState(false);

 const {
  shareDictionary: {
   system: { notifications },
  },
 } = useShareDictionary();

 const {
  hotelID,
  initialData: { data: managerInitData, isLoading },
  hotelManager: { onRemoveHotelManger },
 } = useHotelManagerContext();
 const queryClient = useQueryClient();
 const {
  register,
  handleSubmit,
  reset,
  control,
  setValue,
  formState: { errors },
  watch,
  setFocus,
 } = useForm<HotelManagersSchema>({
  resolver: zodResolver(createHotelManagersSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });

 // get person
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

 const { mutate, isPending } = useMutation({
  mutationFn({
   capacity,
   comment,
   facility: formFacility,
   quantity,
   scale,
  }: HotelManagersSchema) {
   const saveManagerPackage: SaveHotelManagerPackage = {
    id: 0,
   };
   return hotelManager
    ? updateHotelManager(saveManagerPackage)
    : saveHotelManager(saveManagerPackage);
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: [hotelHotelMangerBasePath, 'all'],
   });
   if (hotelManager) {
    queryClient.invalidateQueries({
     queryKey: [
      hotelHotelMangerBasePath,
      'manager',
      hotelManager.id.toString(),
     ],
    });
   } else {
    reset();
    toast.success(notifications.itemAdded);
   }
   setTimeout(() => {}, 200);
  },
  onError(err: AxiosError<string>) {
   if (hotelManager) {
   }
   toast.error(err.response?.data);
  },
 });

 useEffect(() => {
  setValue(
   'job',
   hotelManager?.jobTitleID && hotelManager.jobTitleName
    ? {
       key: hotelManager.jobTitleID.toString(),
       value: hotelManager.jobTitleName,
      }
    : null,
  );
  setPersonID(hotelManager?.personID || 0);
 }, [hotelManager, setValue]);

 return (
  <form
   data-add-edit={!!hotelManager?.id}
   className='group grid grid-cols-1 data-[add-edit="true"]:mb-4 data-[add-edit="true"]:bg-background data-[add-edit="true"]:p-4 data-[add-edit="true"]:rounded-md data-[add-edit="true"]:border data-[add-edit="true"]:border-input'
  >
   <div>
    <div className='gap-y-4 gap-3 grid grid-cols-2 md:grid-cols-3 mb-4'>
     <Field className='gap-2 col-span-2' data-disabled={!!personID}>
      <FieldLabel htmlFor={`person${hotelManager?.id || ''}`}>
       {dic.hotelManager.form.person} *
      </FieldLabel>
      <InputGroup className='bg-background' data-disabled={!!personID}>
       <InputGroupInput
        data-disabled={!!personID}
        disabled={!!personID}
        id={`person${hotelManager?.id || ''}`}
        value={personData?.personFullName || ''}
        onClick={() => {
         if (personID) return;
         setShowRealPerson(true);
        }}
        readOnly
       />
       <InputGroupAddon align={'inline-end'} className='text-primary'>
        <FaSearch />
       </InputGroupAddon>
      </InputGroup>
     </Field>
     <Controller
      control={control}
      name='job'
      render={({ field: { value, onChange, ...other } }) => (
       <Field className='gap-2'>
        <FieldLabel htmlFor={`job${hotelManager?.id || ''}`}>
         {dic.hotelManager.form.job} *
        </FieldLabel>
        <Popover open={showJobs} onOpenChange={setShowJobs}>
         <PopoverTrigger asChild>
          <Button
           type='button'
           id={`job${hotelManager?.id || ''}`}
           title={value?.value || ''}
           variant='outline'
           role='combobox'
           aria-expanded={showJobs}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {isLoading && <Spinner />}
            <ChevronsUpDown className='opacity-50' />
           </div>
          </Button>
         </PopoverTrigger>
         <PopoverContent className='w-[200px] p-0'>
          <Command>
           <CommandInput />
           <CommandList>
            <CommandGroup>
             {managerInitData?.jobTitles.map((item) => (
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
     {showMore && (
      <>
       <Field className='gap-2'>
        <FieldLabel htmlFor={`mobileNo${hotelManager?.id || ''}`}>
         {dic.hotelManager.form.mobileNo}
        </FieldLabel>
        <InputGroup className='bg-background'>
         <InputGroupInput
          id={`mobileNo$${hotelManager?.id || ''}`}
          value={personData?.mobileNo || ''}
          readOnly
         />
        </InputGroup>
       </Field>
      </>
     )}
    </div>
    <div className='flex justify-between gap-2 flex-wrap'>
     <Button
      type='button'
      variant='outline'
      onClick={() => {
       setShowMore((pre) => !pre);
      }}
     >
      {showMore
       ? dic.hotelManager.form.showLess
       : dic.hotelManager.form.showMore}
     </Button>
     <div className='flex justify-end gap-2 grow'>
      {hotelManager && (
       <Button
        type='button'
        variant='outline'
        size='icon'
        disabled={isPending}
        className='text-rose-700 dark:text-rose-400 border-rose-700 dark:border-rose-400'
        onClick={() => {
         onRemoveHotelManger(hotelManager.id);
        }}
       >
        {isPending ? <Spinner /> : <IoTrashOutline />}
       </Button>
      )}
      <Button
       type='button'
       variant='outline'
       className='md:20'
       disabled={isPending || personLoading}
       onClick={() => {
        onCancel?.();
       }}
      >
       {isPending && <Spinner />}
       {dic.hotelManager.form.cancel}
      </Button>
      <Button
       type='submit'
       variant={hotelManager ? 'secondary' : 'default'}
       className='md:w-20'
       disabled={isPending || personLoading}
       onClick={(e) => {
        e.preventDefault();
        handleSubmit((data) => {
         mutate(data);
        })();
       }}
      >
       {isPending && <Spinner />}
       {hotelManager ? dic.hotelManager.form.update : dic.hotelManager.form.add}
      </Button>
     </div>
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
     onChangePerson(personID) {
      setPersonID(personID);
      setShowRealPerson(false);
      setTimeout(() => {}, 100);
     },
    }}
   />
  </form>
 );
}
