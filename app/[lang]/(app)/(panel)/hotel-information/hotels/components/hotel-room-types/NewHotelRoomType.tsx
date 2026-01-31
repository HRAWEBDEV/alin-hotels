'use client';
import { useState, useCallback, useEffect } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';
import {
 Dialog,
 DialogClose,
 DialogTitle,
 DialogHeader,
 DialogFooter,
 DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
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
import { Field, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type HotelHotelRoomSchema,
 createHotelRoomTypesSchema,
 defaultValues,
} from '../../schemas/hotel-room-types/hotelRoomTypesSchema';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
 type SaveHotelRoomTypePackage,
 hotelHotelRoomTypeBasePath,
 getHotelRoomType,
 saveHotelRoomType,
 updateHotelRoomType,
} from '../../services/hotel-room-types/hotelRoomTypesApiActions';
import NoItemFound from '../../../../components/NoItemFound';
import { Spinner } from '@/components/ui/spinner';
import { toast } from 'sonner';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';
import { AxiosError } from 'axios';
import {
 roomTypesBasePath,
 getAllRoomTypes,
 getRoomType,
} from '../../../room-types/services/roomTypesApiActions';
import { NumericFormat } from 'react-number-format';
import RoomTypeFinder from '../../../room-types/components/room-type-finder/RoomTypeFinder';
import { FaSearch } from 'react-icons/fa';

export default function NewHotelRoomType({
 dic,
 open,
 roomTypeID,
 hotelID,
 roomTypesDic,
 setOpen,
}: {
 dic: HotelsDictionary;
 open: boolean;
 roomTypeID: number | null;
 roomTypesDic: RoomTypesDictionary;
 hotelID: number;
 setOpen: (open: boolean) => unknown;
}) {
 const {
  shareDictionary: {
   system: { notifications },
  },
 } = useShareDictionary();
 const queryClient = useQueryClient();
 const [showFindRoomType, setShowFindRoomType] = useState(false);
 const [showRoomTypes, setShowRoomTypes] = useState(false);

 const { localeInfo } = useBaseConfig();

 const {
  setValue,
  control,
  setFocus,
  reset,
  formState: { errors },
  handleSubmit,
  register,
 } = useForm<HotelHotelRoomSchema>({
  resolver: zodResolver(createHotelRoomTypesSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });

 const { mutate: confirmGetRoomType, isPending: confirmGetRoomTypeIsPending } =
  useMutation({
   mutationFn(roomTypeID: number) {
    return getRoomType({ roomTypeID });
   },
   onSuccess(res) {
    setValue('roomType', {
     key: res.data.id.toString(),
     value: res.data.name,
    });
   },
  });

 // get data
 const { data, isError, isLoading } = useQuery({
  enabled: !!roomTypeID,
  queryKey: [roomTypesBasePath, 'roomType', roomTypeID?.toString()],
  async queryFn({ signal }) {
   const res = await getHotelRoomType({
    signal,
    hotelRoomTypeID: roomTypeID!,
   });
   return res.data;
  },
 });
 // room types
 const { data: roomTypes, isLoading: roomTypesIsLoading } = useQuery({
  queryKey: [roomTypesBasePath, 'all'],
  async queryFn({ signal }) {
   const res = await getAllRoomTypes({ signal });
   return res.data;
  },
 });

 // save data
 const { mutate, isPending } = useMutation({
  mutationFn({ name, roomCount, roomType, bedCount }: HotelHotelRoomSchema) {
   const saveManagerPackage: SaveHotelRoomTypePackage = {
    mainData: {
     id: data?.id || 0,
     nameID: data?.nameID || 0,
     name,
     hotelID,
     roomTypeID: Number(roomType!.key),
     bedCount: bedCount as number,
     roomCount: roomCount as number,
    },
    dictionaryData: {
     id: data?.nameID || 0,
     defaultValue: name,
     [localeInfo.latinName]: name,
    },
   };
   return roomTypeID
    ? updateHotelRoomType(saveManagerPackage)
    : saveHotelRoomType(saveManagerPackage);
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: [hotelHotelRoomTypeBasePath, 'all'],
   });
   if (data) {
    queryClient.invalidateQueries({
     queryKey: [hotelHotelRoomTypeBasePath, 'roomType', data.id.toString()],
    });
    setOpen(false);
   } else {
    reset();
    toast.success(notifications.itemAdded);
   }
   setTimeout(() => {
    setFocus('name');
   }, 200);
  },
  onError(err: AxiosError<string>) {
   if (data) {
   }
   toast.error(err.response?.data);
  },
 });

 const setFormDefaults = useCallback(() => {
  setValue('name', data?.name || '');
  setValue(
   'roomType',
   data
    ? {
       key: data.roomTypeID.toString(),
       value: data.roomTypeName,
      }
    : null,
  );
  setValue('roomCount', data?.roomCount || '');
  setValue('bedCount', data?.bedCount || '');
 }, [data, setValue]);

 useEffect(() => {
  setFormDefaults();
 }, [setFormDefaults]);

 if (roomTypeID && isError) return <NoItemFound />;

 return (
  <>
   <Dialog open={open} onOpenChange={(newValue) => setOpen(newValue)}>
    <DialogContent className='p-0 gap-0'>
     <form>
      <DialogHeader className='p-4 py-3 border border-input'>
       <DialogTitle className='text-base font-medium'>
        {roomTypeID
         ? dic.hotelRoomTypes.form.editRoomType
         : dic.hotelRoomTypes.form.addRoomType}
       </DialogTitle>
      </DialogHeader>
      <div className='p-4 grid grid-cols-2 gap-4 gap-y-5'>
       <Field className='gap-2' data-invalid={!!errors.name}>
        <FieldLabel htmlFor='title'>
         {dic.hotelRoomTypes.form.name} *
        </FieldLabel>
        <InputGroup data-invalid={!!errors.name}>
         <InputGroupInput id='title' {...register('name')} />
        </InputGroup>
       </Field>
       <Controller
        control={control}
        name='roomType'
        render={({ field: { value, onChange, ...other } }) => (
         <Field className='gap-2' data-invalid={!!errors.roomType}>
          <FieldLabel htmlFor='roomType'>
           {dic.hotelRoomTypes.form.roomType} *
          </FieldLabel>
          <Popover open={showRoomTypes} onOpenChange={setShowRoomTypes}>
           <PopoverTrigger asChild>
            <Button
             data-invalid={!!errors.roomType}
             type='button'
             id='owner'
             title={value?.value || ''}
             variant='outline'
             role='combobox'
             aria-expanded={showRoomTypes}
             className='justify-between'
             {...other}
            >
             <span className='text-start grow overflow-hidden text-ellipsis'>
              {value?.value || ''}
             </span>
             <div className='flex gap-1 items-center -me-2'>
              <Button
               variant='ghost'
               size='icon'
               className='text-primary'
               disabled={roomTypesIsLoading || confirmGetRoomTypeIsPending}
               onClick={(e) => {
                e.preventDefault();
                setShowFindRoomType(true);
               }}
              >
               {roomTypesIsLoading || confirmGetRoomTypeIsPending ? (
                <Spinner />
               ) : (
                <FaSearch />
               )}
              </Button>
              <ChevronsUpDown className='opacity-50' />
             </div>
            </Button>
           </PopoverTrigger>
           <PopoverContent className='w-64 p-0'>
            <Command>
             <CommandInput />
             <CommandList>
              <CommandGroup>
               {roomTypes?.map((item) => (
                <CommandItem
                 key={item.id}
                 value={item.name}
                 onSelect={() => {
                  setShowRoomTypes(false);
                  onChange({
                   key: item.id.toString(),
                   value: item.name,
                  });
                 }}
                >
                 {item.name}
                 <Check
                  className={cn(
                   'ml-auto',
                   value?.key === item.id.toString()
                    ? 'opacity-100'
                    : 'opacity-0',
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
        name='roomCount'
        render={({ field: { value, onChange, ...other } }) => (
         <Field className='gap-2' data-invalid={!!errors.roomCount}>
          <FieldLabel htmlFor='roomCount'>
           {dic.hotelRoomTypes.form.roomCount} *
          </FieldLabel>
          <InputGroup data-invalid={!!errors.roomCount}>
           <NumericFormat
            id='roomCount'
            {...other}
            value={value}
            onValueChange={({ floatValue }) =>
             onChange(floatValue || floatValue === 0 ? floatValue : '')
            }
            decimalScale={0}
            allowLeadingZeros={false}
            customInput={InputGroupInput}
           />
          </InputGroup>
         </Field>
        )}
       />
       <Controller
        control={control}
        name='bedCount'
        render={({ field: { value, onChange, ...other } }) => (
         <Field className='gap-2' data-invalid={!!errors.bedCount}>
          <FieldLabel htmlFor='bedCount'>
           {dic.hotelRoomTypes.form.bedCount} *
          </FieldLabel>
          <InputGroup data-invalid={!!errors.bedCount}>
           <NumericFormat
            id='bedCount'
            {...other}
            value={value}
            onValueChange={({ floatValue }) =>
             onChange(floatValue || floatValue === 0 ? floatValue : '')
            }
            decimalScale={0}
            allowLeadingZeros={false}
            customInput={InputGroupInput}
           />
          </InputGroup>
         </Field>
        )}
       />
      </div>
      <DialogFooter className='p-4 py-2 border-t border-input'>
       <DialogClose asChild>
        <Button
         type='button'
         disabled={isLoading || isPending || confirmGetRoomTypeIsPending}
         variant='outline'
         className='sm:w-20'
        >
         {(isLoading || isPending || confirmGetRoomTypeIsPending) && (
          <Spinner />
         )}
         {dic.hotelRoomTypes.form.cancel}
        </Button>
       </DialogClose>
       <Button
        type='submit'
        disabled={isLoading || isPending || confirmGetRoomTypeIsPending}
        className='sm:w-20'
        onClick={(e) => {
         e.preventDefault();
         handleSubmit((data) => {
          mutate(data);
         })();
        }}
       >
        {(isLoading || isPending || confirmGetRoomTypeIsPending) && <Spinner />}
        {dic.hotelRoomTypes.form.save}
       </Button>
      </DialogFooter>
     </form>
    </DialogContent>
   </Dialog>
   {showFindRoomType && (
    <RoomTypeFinder
     dic={roomTypesDic}
     open={showFindRoomType}
     wrapperType={{
      roomTypeID,
      onChangeHotel(roomTypeID) {
       setShowFindRoomType(false);
       confirmGetRoomType(roomTypeID);
      },
     }}
     onOpenChange={(open) =>
      setShowFindRoomType((pre) => (open === undefined ? !pre : open))
     }
    />
   )}
  </>
 );
}
