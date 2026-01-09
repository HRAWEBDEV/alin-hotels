'use client';
import { useState, useEffect } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { FieldLabel, Field, FieldGroup } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupTextarea,
} from '@/components/ui/input-group';
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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type HotelSchema,
 createHotelSchema,
 defaultValues,
} from '../../schemas/hotelSchema';
import { Spinner } from '@/components/ui/spinner';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 type SaveHotelPackage,
 hotelBasePath,
 saveHotel,
 getHotel,
 updateHotel,
 Hotel,
} from '../../services/hotelsApiActions';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import NoItemFound from '../../../../components/NoItemFound';
import { type HotelsConfig } from '../../services/hotelsConfigContext';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { NumericFormat } from 'react-number-format';
import { FaRegTrashAlt } from 'react-icons/fa';
import { dictionaryDefaultValues } from '@/app/[lang]/(app)/utils/apiBaseTypes';
import { setTimeout } from 'timers';

export default function NewHotel({
 dic,
 hotelID,
 onSuccess,
 onCancel,
 initialData,
}: {
 dic: HotelsDictionary;
 hotelID?: number | null;
 initialData: HotelsConfig['initialData'];
 onSuccess?: HotelsConfig['hotels']['onNewHotelSuccess'];
 onCancel?: HotelsConfig['hotels']['onCancelNewHotel'];
}) {
 const queryClient = useQueryClient();
 // form
 const {
  control,
  register,
  handleSubmit,
  formState: { errors },
  reset,
  setValue,
  setFocus,
 } = useForm<HotelSchema>({
  resolver: zodResolver(createHotelSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 //
 const { localeInfo } = useBaseConfig();
 //
 const [openOwner, setOpenOwner] = useState(false);
 const [openState, setOpenState] = useState(false);
 const [openCity, setOpenCity] = useState(false);
 const [openOwnerShipType, setOpenOwnerShipType] = useState(false);
 const [openOperatorType, setOpenOperatorType] = useState(false);
 const [openHotelType, setOpenHotelType] = useState(false);
 const [openGradeType, setOpenGradeType] = useState(false);
 const [openDegreeType, setOpenDegreeType] = useState(false);
 const [openLocationType, setOpenLocationType] = useState(false);
 const [openHotelTheme, setOpenHotelTheme] = useState(false);
 //
 const { mutate, isPending } = useMutation({
  mutationFn({}: HotelSchema) {
   const newPerson: SaveHotelPackage = {
    mainData: {},
    dictionaryData: {
     id: data?.nameID || 0,
    },
   };
   return hotelID ? updateHotel(newPerson) : saveHotel(newPerson);
  },
  onSuccess(res) {
   reset();
   queryClient.invalidateQueries({
    queryKey: [hotelBasePath, 'all'],
   });
   if (onSuccess) {
    onSuccess({
     mode: hotelID ? 'edit' : 'add',
     hotelID: res.data,
    });
   }
   if (hotelID) {
    queryClient.invalidateQueries({
     queryKey: [hotelBasePath, 'hotel', hotelID.toString()],
    });
   } else {
    toast.success(dic.newHotel.newHotelAdded);
   }
   setTimeout(() => {}, 200);
  },
  onError(err: AxiosError<string>) {
   toast.error(err.response?.data);
  },
 });
 //
 const { data, isLoading, isError, isSuccess } = useQuery({
  enabled: !!hotelID,
  queryKey: [hotelBasePath, 'hotel', hotelID?.toString()],
  refetchOnWindowFocus: false,
  async queryFn({ signal }) {
   const res = await getHotel({ signal, hotelID: hotelID! });
   return res.data;
  },
 });

 useEffect(() => {
  if (!hotelID) return;
  reset();
 }, [hotelID, reset]);

 useEffect(() => {
  if (!hotelID || !isSuccess) return;
  const {
   name,
   hotelTypeID,
   hotelTypeName,
   ownerID,
   ownerName,
   hotelOwnershipTypeID,
   hotelOwnershipTypeName,
   hotelOperatorTypeID,
   operatorTypeName,
   address,
   buildingArea,
   email,
   floorCount,
   landArea,
   postalCode,
   bedCount,
   cityZoneID,
   cityZoneName,
   degreeTypeID,
   degreeTypeName,
   disabled,
   fax,
   gradeTypeID,
   gradeTypeName,
   hotelThemeID,
   hotelThemeName,
   latitude,
   locationTypeID,
   locationTypeName,
   longitude,
   maxExtraBedCount,
   roomCount,
   stateZoneID,
   stateZoneName,
   tel1,
   tel2,
   tel3,
   towerCount,
   webSiteUrl,
  } = data;
  setValue('name', name);
  setValue(
   'hotelType',
   hotelTypeID && hotelTypeName
    ? {
       key: hotelTypeID.toString(),
       value: hotelTypeName,
      }
    : null,
  );
  setValue(
   'owner',
   ownerID && ownerName
    ? {
       key: ownerID.toString(),
       value: ownerName,
      }
    : null,
  );
  setValue(
   'hotelOwnershipType',
   hotelOwnershipTypeID && hotelOwnershipTypeName
    ? {
       key: hotelOwnershipTypeID.toString(),
       value: hotelOwnershipTypeName,
      }
    : null,
  );
  setValue(
   'hotelOperatorType',
   hotelOperatorTypeID && operatorTypeName
    ? {
       key: hotelOperatorTypeID.toString(),
       value: operatorTypeName,
      }
    : null,
  );
  setValue(
   'gradeType',
   gradeTypeID && gradeTypeName
    ? {
       key: gradeTypeID.toString(),
       value: gradeTypeName,
      }
    : null,
  );
  setValue(
   'degreeType',
   degreeTypeID && degreeTypeName
    ? {
       key: degreeTypeID.toString(),
       value: degreeTypeName,
      }
    : null,
  );
  setValue(
   'locationType',
   locationTypeID && locationTypeName
    ? {
       key: locationTypeID.toString(),
       value: locationTypeName,
      }
    : null,
  );
  setValue(
   'hotelTheme',
   hotelThemeID && hotelThemeName
    ? {
       key: hotelThemeID.toString(),
       value: hotelThemeName,
      }
    : null,
  );
  setValue('landArea', landArea || '');
  setValue('buildingArea', buildingArea || '');
  setValue('floorCount', floorCount || '');
  setValue('towerCount', towerCount || '');
  setValue('roomCount', roomCount || '');
  setValue('bedCount', bedCount || '');
  setValue('maxExtraBedCount', maxExtraBedCount || '');
  setValue('longitude', longitude || '');
  setValue('latitude', latitude || '');
  setValue('fax', fax || '');
  setValue('postalCode', postalCode || '');
  setValue('tel1', tel1 || '');
  setValue('tel2', tel2 || '');
  setValue('tel3', tel3 || '');
  setValue('email', email || '');
  setValue('website', webSiteUrl || '');
  setValue('address', address || '');
  setValue(
   'state',
   stateZoneID && stateZoneName
    ? {
       key: stateZoneID.toString(),
       value: stateZoneName,
      }
    : null,
  );
  setValue(
   'city',
   cityZoneID && cityZoneName
    ? {
       key: cityZoneID.toString(),
       value: cityZoneName,
      }
    : null,
  );
 }, [hotelID, isSuccess, data, setValue]);

 if (hotelID && isError) return <NoItemFound />;
 if (hotelID && isLoading)
  return (
   <div className='min-h-40 grid place-content-center text-primary'>
    <Spinner className='size-12' />
   </div>
  );
 return (
  <form className='w-[min(40rem,100%)] mx-auto'>
   <FieldGroup className='gap-2'>
    <div className='grid gap-y-2'>
     <div className='grid grid-cols-2 gap-3 gap-y-4 bg-background p-4 border border-input rounded-md'>
      <Field className='gap-2 col-span-2' data-invalid={!!errors.name}>
       <FieldLabel htmlFor='name'>{dic.newHotel.form.name} *</FieldLabel>
       <InputGroup data-invalid={!!errors.name}>
        <InputGroupInput id='name' {...register('name')} />
       </InputGroup>
      </Field>
      <Controller
       control={control}
       name='hotelType'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='hotelType'>
          {dic.newHotel.form.hotelType}
         </FieldLabel>
         <Popover open={openHotelType} onOpenChange={setOpenHotelType}>
          <PopoverTrigger asChild>
           <Button
            id='hotelType'
            variant='outline'
            role='combobox'
            aria-expanded={openHotelType}
            className='justify-between'
            {...other}
           >
            <span className='text-start grow overflow-hidden text-ellipsis'>
             {value?.value || ''}
            </span>
            <div className='flex gap-1 items-center -me-2'>
             {initialData.isLoading && <Spinner />}
             {value && (
              <Button
               variant={'ghost'}
               size={'icon'}
               className='text-rose-700 dark:text-rose-400'
               onClick={(e) => {
                e.stopPropagation();
                onChange(null);
               }}
              >
               <FaRegTrashAlt />
              </Button>
             )}
             <ChevronsUpDown className='opacity-50' />
            </div>
           </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
           <Command>
            <CommandInput />
            <CommandList>
             <CommandGroup>
              {initialData.data?.hotelTypes.map((item) => (
               <CommandItem
                key={item.key}
                value={item.value}
                onSelect={() => {
                 setOpenHotelType(false);
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
       name='owner'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='owner'>{dic.newHotel.form.ownerName}</FieldLabel>
         <Popover open={openOwner} onOpenChange={setOpenOwner}>
          <PopoverTrigger asChild>
           <Button
            id='owner'
            variant='outline'
            role='combobox'
            aria-expanded={openOwner}
            className='justify-between'
            {...other}
           >
            <span className='text-start grow overflow-hidden text-ellipsis'>
             {value?.value || ''}
            </span>
            <div className='flex gap-1 items-center -me-2'>
             {initialData.isLoading && <Spinner />}
             {value && (
              <Button
               variant={'ghost'}
               size={'icon'}
               className='text-rose-700 dark:text-rose-400'
               onClick={(e) => {
                e.stopPropagation();
                onChange(null);
               }}
              >
               <FaRegTrashAlt />
              </Button>
             )}
             <ChevronsUpDown className='opacity-50' />
            </div>
           </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
           <Command>
            <CommandInput />
            <CommandList>
             <CommandGroup>
              {/* {initialData.data?.stateZones.map((item) => ( */}
              {/*  <CommandItem */}
              {/*   key={item.key} */}
              {/*   value={item.value} */}
              {/*   onSelect={() => { */}
              {/*    setOpenState(false); */}
              {/*    onChange(item); */}
              {/*   }} */}
              {/*  > */}
              {/*   {item.value} */}
              {/*   <Check */}
              {/*    className={cn( */}
              {/*     'ml-auto', */}
              {/*     value?.key === item.key ? 'opacity-100' : 'opacity-0', */}
              {/*    )} */}
              {/*   /> */}
              {/*  </CommandItem> */}
              {/* ))} */}
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
       name='hotelOwnershipType'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='hotelOwnershipType'>
          {dic.newHotel.form.ownerShipType}
         </FieldLabel>
         <Popover open={openOwnerShipType} onOpenChange={setOpenOwnerShipType}>
          <PopoverTrigger asChild>
           <Button
            id='hotelOwnershipType'
            variant='outline'
            role='combobox'
            aria-expanded={openOwnerShipType}
            className='justify-between'
            {...other}
           >
            <span className='text-start grow overflow-hidden text-ellipsis'>
             {value?.value || ''}
            </span>
            <div className='flex gap-1 items-center -me-2'>
             {initialData.isLoading && <Spinner />}
             {value && (
              <Button
               variant={'ghost'}
               size={'icon'}
               className='text-rose-700 dark:text-rose-400'
               onClick={(e) => {
                e.stopPropagation();
                onChange(null);
               }}
              >
               <FaRegTrashAlt />
              </Button>
             )}
             <ChevronsUpDown className='opacity-50' />
            </div>
           </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
           <Command>
            <CommandInput />
            <CommandList>
             <CommandGroup>
              {initialData.data?.hotelOwnershipTypes.map((item) => (
               <CommandItem
                key={item.key}
                value={item.value}
                onSelect={() => {
                 setOpenOwnerShipType(false);
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
       name='hotelOperatorType'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='hotelOperatorType'>
          {dic.newHotel.form.operatorType}
         </FieldLabel>
         <Popover open={openOperatorType} onOpenChange={setOpenOperatorType}>
          <PopoverTrigger asChild>
           <Button
            id='hotelOperatorType'
            variant='outline'
            role='combobox'
            aria-expanded={openOperatorType}
            className='justify-between'
            {...other}
           >
            <span className='text-start grow overflow-hidden text-ellipsis'>
             {value?.value || ''}
            </span>
            <div className='flex gap-1 items-center -me-2'>
             {initialData.isLoading && <Spinner />}
             {value && (
              <Button
               variant={'ghost'}
               size={'icon'}
               className='text-rose-700 dark:text-rose-400'
               onClick={(e) => {
                e.stopPropagation();
                onChange(null);
               }}
              >
               <FaRegTrashAlt />
              </Button>
             )}
             <ChevronsUpDown className='opacity-50' />
            </div>
           </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
           <Command>
            <CommandInput />
            <CommandList>
             <CommandGroup>
              {initialData.data?.hotelOperators.map((item) => (
               <CommandItem
                key={item.key}
                value={item.value}
                onSelect={() => {
                 setOpenOperatorType(false);
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
     </div>
     <div className='grid grid-cols-2 gap-3 gap-y-4 bg-background p-4 border border-input rounded-md'>
      <Controller
       control={control}
       name='gradeType'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='gradeType'>{dic.newHotel.form.grade}</FieldLabel>
         <Popover open={openGradeType} onOpenChange={setOpenGradeType}>
          <PopoverTrigger asChild>
           <Button
            id='gradeType'
            variant='outline'
            role='combobox'
            aria-expanded={openHotelType}
            className='justify-between'
            {...other}
           >
            <span className='text-start grow overflow-hidden text-ellipsis'>
             {value?.value || ''}
            </span>
            <div className='flex gap-1 items-center -me-2'>
             {initialData.isLoading && <Spinner />}
             {value && (
              <Button
               variant={'ghost'}
               size={'icon'}
               className='text-rose-700 dark:text-rose-400'
               onClick={(e) => {
                e.stopPropagation();
                onChange(null);
               }}
              >
               <FaRegTrashAlt />
              </Button>
             )}
             <ChevronsUpDown className='opacity-50' />
            </div>
           </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
           <Command>
            <CommandInput />
            <CommandList>
             <CommandGroup>
              {initialData.data?.gradeTypes.map((item) => (
               <CommandItem
                key={item.key}
                value={item.value}
                onSelect={() => {
                 setOpenGradeType(false);
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
       name='degreeType'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='degreeType'>
          {dic.newHotel.form.degree}
         </FieldLabel>
         <Popover open={openDegreeType} onOpenChange={setOpenDegreeType}>
          <PopoverTrigger asChild>
           <Button
            id='degreeType'
            variant='outline'
            role='combobox'
            aria-expanded={openDegreeType}
            className='justify-between'
            {...other}
           >
            <span className='text-start grow overflow-hidden text-ellipsis'>
             {value?.value || ''}
            </span>
            <div className='flex gap-1 items-center -me-2'>
             {initialData.isLoading && <Spinner />}
             {value && (
              <Button
               variant={'ghost'}
               size={'icon'}
               className='text-rose-700 dark:text-rose-400'
               onClick={(e) => {
                e.stopPropagation();
                onChange(null);
               }}
              >
               <FaRegTrashAlt />
              </Button>
             )}
             <ChevronsUpDown className='opacity-50' />
            </div>
           </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
           <Command>
            <CommandInput />
            <CommandList>
             <CommandGroup>
              {initialData.data?.degreeTypes.map((item) => (
               <CommandItem
                key={item.key}
                value={item.value}
                onSelect={() => {
                 setOpenDegreeType(false);
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
       name='locationType'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='locationType'>
          {dic.newHotel.form.locationType}
         </FieldLabel>
         <Popover open={openLocationType} onOpenChange={setOpenLocationType}>
          <PopoverTrigger asChild>
           <Button
            id='locationType'
            variant='outline'
            role='combobox'
            aria-expanded={openLocationType}
            className='justify-between'
            {...other}
           >
            <span className='text-start grow overflow-hidden text-ellipsis'>
             {value?.value || ''}
            </span>
            <div className='flex gap-1 items-center -me-2'>
             {initialData.isLoading && <Spinner />}
             {value && (
              <Button
               variant={'ghost'}
               size={'icon'}
               className='text-rose-700 dark:text-rose-400'
               onClick={(e) => {
                e.stopPropagation();
                onChange(null);
               }}
              >
               <FaRegTrashAlt />
              </Button>
             )}
             <ChevronsUpDown className='opacity-50' />
            </div>
           </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
           <Command>
            <CommandInput />
            <CommandList>
             <CommandGroup>
              {initialData.data?.locationTypes.map((item) => (
               <CommandItem
                key={item.key}
                value={item.value}
                onSelect={() => {
                 setOpenLocationType(false);
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
       name='hotelTheme'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='hotelTheme'>
          {dic.newHotel.form.hotelTheme}
         </FieldLabel>
         <Popover open={openHotelTheme} onOpenChange={setOpenHotelTheme}>
          <PopoverTrigger asChild>
           <Button
            id='hotelTheme'
            variant='outline'
            role='combobox'
            aria-expanded={openHotelTheme}
            className='justify-between'
            {...other}
           >
            <span className='text-start grow overflow-hidden text-ellipsis'>
             {value?.value || ''}
            </span>
            <div className='flex gap-1 items-center -me-2'>
             {initialData.isLoading && <Spinner />}
             {value && (
              <Button
               variant={'ghost'}
               size={'icon'}
               className='text-rose-700 dark:text-rose-400'
               onClick={(e) => {
                e.stopPropagation();
                onChange(null);
               }}
              >
               <FaRegTrashAlt />
              </Button>
             )}
             <ChevronsUpDown className='opacity-50' />
            </div>
           </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
           <Command>
            <CommandInput />
            <CommandList>
             <CommandGroup>
              {initialData.data?.hotelThemes.map((item) => (
               <CommandItem
                key={item.key}
                value={item.value}
                onSelect={() => {
                 setOpenHotelTheme(false);
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
     </div>
     <div className='grid grid-cols-2 gap-3 gap-y-4 bg-background p-4 border border-input rounded-md'>
      <Controller
       control={control}
       name='landArea'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2 col-span-full'>
         <FieldLabel htmlFor='landArea'>
          {dic.newHotel.form.landArea}
         </FieldLabel>
         <InputGroup>
          <NumericFormat
           id='landArea'
           value={value}
           onValueChange={({ floatValue }) => onChange(floatValue)}
           {...other}
           customInput={InputGroupInput}
          />
         </InputGroup>
        </Field>
       )}
      />
      <Controller
       control={control}
       name='buildingArea'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='buildingArea'>
          {dic.newHotel.form.buildingArea}
         </FieldLabel>
         <InputGroup>
          <NumericFormat
           id='buildingArea'
           value={value}
           onValueChange={({ floatValue }) => onChange(floatValue)}
           {...other}
           customInput={InputGroupInput}
          />
         </InputGroup>
        </Field>
       )}
      />
      <Controller
       control={control}
       name='floorCount'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='floorCount'>
          {dic.newHotel.form.floorCount}
         </FieldLabel>
         <InputGroup>
          <NumericFormat
           id='floorCount'
           value={value}
           onValueChange={({ floatValue }) => onChange(floatValue)}
           {...other}
           customInput={InputGroupInput}
          />
         </InputGroup>
        </Field>
       )}
      />
      <Controller
       control={control}
       name='towerCount'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='towerCount'>
          {dic.newHotel.form.towerCount}
         </FieldLabel>
         <InputGroup>
          <NumericFormat
           id='towerCount'
           value={value}
           onValueChange={({ floatValue }) => onChange(floatValue)}
           {...other}
           customInput={InputGroupInput}
          />
         </InputGroup>
        </Field>
       )}
      />
      <Controller
       control={control}
       name='roomCount'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='roomCount'>
          {dic.newHotel.form.roomCount}
         </FieldLabel>
         <InputGroup>
          <NumericFormat
           id='roomCount'
           value={value}
           onValueChange={({ floatValue }) => onChange(floatValue)}
           {...other}
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
        <Field className='gap-2'>
         <FieldLabel htmlFor='bedCount'>
          {dic.newHotel.form.bedCount}
         </FieldLabel>
         <InputGroup>
          <NumericFormat
           id='bedCount'
           value={value}
           onValueChange={({ floatValue }) => onChange(floatValue)}
           {...other}
           customInput={InputGroupInput}
          />
         </InputGroup>
        </Field>
       )}
      />
      <Controller
       control={control}
       name='maxExtraBedCount'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='maxExtraBedCount'>
          {dic.newHotel.form.maxExtraBed}
         </FieldLabel>
         <InputGroup>
          <NumericFormat
           id='maxExtraBed'
           value={value}
           onValueChange={({ floatValue }) => onChange(floatValue)}
           {...other}
           customInput={InputGroupInput}
          />
         </InputGroup>
        </Field>
       )}
      />
     </div>
     <div className='grid grid-cols-2 gap-3 gap-y-4 bg-background p-4 border border-input rounded-md'>
      <Controller
       control={control}
       name='state'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='state'>{dic.newHotel.form.state}</FieldLabel>
         <Popover open={openState} onOpenChange={setOpenState}>
          <PopoverTrigger asChild>
           <Button
            id='state'
            variant='outline'
            role='combobox'
            aria-expanded={openState}
            className='justify-between'
            {...other}
           >
            <span className='text-start grow overflow-hidden text-ellipsis'>
             {value?.value || ''}
            </span>
            <div className='flex gap-1 items-center -me-2'>
             {initialData.isLoading && <Spinner />}
             {value && (
              <Button
               variant={'ghost'}
               size={'icon'}
               className='text-rose-700 dark:text-rose-400'
               onClick={(e) => {
                e.stopPropagation();
                onChange(null);
               }}
              >
               <FaRegTrashAlt />
              </Button>
             )}
             <ChevronsUpDown className='opacity-50' />
            </div>
           </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
           <Command>
            <CommandInput />
            <CommandList>
             <CommandGroup>
              {initialData.data?.stateZones.map((item) => (
               <CommandItem
                key={item.key}
                value={item.value}
                onSelect={() => {
                 setOpenState(false);
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
       name='city'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='city'>{dic.newHotel.form.city}</FieldLabel>
         <Popover open={openCity} onOpenChange={setOpenCity}>
          <PopoverTrigger asChild>
           <Button
            id='city'
            variant='outline'
            role='combobox'
            aria-expanded={openCity}
            className='justify-between'
            {...other}
           >
            <span className='text-start grow overflow-hidden text-ellipsis'>
             {value?.value || ''}
            </span>
            <div className='flex gap-1 items-center -me-2'>
             {initialData.isLoading && <Spinner />}
             {value && (
              <Button
               variant={'ghost'}
               size={'icon'}
               className='text-rose-700 dark:text-rose-400'
               onClick={(e) => {
                e.stopPropagation();
                onChange(null);
               }}
              >
               <FaRegTrashAlt />
              </Button>
             )}
             <ChevronsUpDown className='opacity-50' />
            </div>
           </Button>
          </PopoverTrigger>
          <PopoverContent className='w-[200px] p-0'>
           <Command>
            <CommandInput />
            <CommandList>
             <CommandGroup>
              {initialData.data?.stateZones.map((item) => (
               <CommandItem
                key={item.key}
                value={item.value}
                onSelect={() => {
                 setOpenState(false);
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
       name='longitude'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='longitude'>
          {dic.newHotel.form.logitude}
         </FieldLabel>
         <InputGroup>
          <NumericFormat
           id='logitude'
           value={value}
           onValueChange={({ value }) => onChange(value)}
           {...other}
           customInput={InputGroupInput}
          />
         </InputGroup>
        </Field>
       )}
      />
      <Controller
       control={control}
       name='latitude'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='latitude'>
          {dic.newHotel.form.latitude}
         </FieldLabel>
         <InputGroup>
          <NumericFormat
           id='latitude'
           value={value}
           onValueChange={({ value }) => onChange(value)}
           {...other}
           customInput={InputGroupInput}
          />
         </InputGroup>
        </Field>
       )}
      />
      <Controller
       control={control}
       name='fax'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='fax'>{dic.newHotel.form.fax}</FieldLabel>
         <InputGroup>
          <NumericFormat
           id='fax'
           value={value}
           onValueChange={({ floatValue }) => onChange(floatValue)}
           {...other}
           customInput={InputGroupInput}
          />
         </InputGroup>
        </Field>
       )}
      />
      <Controller
       control={control}
       name='postalCode'
       render={({ field: { value, onChange, ...other } }) => (
        <Field className='gap-2'>
         <FieldLabel htmlFor='postalCode'>
          {dic.newHotel.form.postalCode}
         </FieldLabel>
         <InputGroup>
          <NumericFormat
           id='postalCode'
           value={value}
           onValueChange={({ floatValue }) => onChange(floatValue)}
           {...other}
           customInput={InputGroupInput}
          />
         </InputGroup>
        </Field>
       )}
      />
      <Field className='gap-2'>
       <FieldLabel htmlFor='tel1'>{dic.newHotel.form.tel}</FieldLabel>
       <InputGroup>
        <InputGroupInput id='tel1' {...register('tel1')} />
       </InputGroup>
      </Field>
      <Field className='gap-2'>
       <FieldLabel htmlFor='tel2'>{dic.newHotel.form.tel}</FieldLabel>
       <InputGroup>
        <InputGroupInput id='tel2' {...register('tel2')} />
       </InputGroup>
      </Field>
      <Field className='gap-2'>
       <FieldLabel htmlFor='tel3'>{dic.newHotel.form.tel}</FieldLabel>
       <InputGroup>
        <InputGroupInput id='tel3' {...register('tel3')} />
       </InputGroup>
      </Field>
      <Field className='gap-2'>
       <FieldLabel htmlFor='email'>{dic.newHotel.form.email}</FieldLabel>
       <InputGroup>
        <InputGroupInput id='email' {...register('email')} />
       </InputGroup>
      </Field>
      <Field className='gap-2 col-span-full'>
       <FieldLabel htmlFor='website'>{dic.newHotel.form.website}</FieldLabel>
       <InputGroup>
        <InputGroupInput id='website' {...register('website')} />
       </InputGroup>
      </Field>
      <Field className='gap-2 col-span-full'>
       <FieldLabel htmlFor='address'>{dic.newHotel.form.address}</FieldLabel>
       <InputGroup>
        <InputGroupTextarea id='address' {...register('address')} />
       </InputGroup>
      </Field>
     </div>
    </div>
    <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
     <Button
      data-disabled={!!hotelID}
      disabled={!!hotelID}
      variant='outline'
      className='text-rose-700! dark:text-rose-400! border-rose-700! dark:border-rose-400! data-[disabled="true"]:opacity-0'
      type='button'
      onClick={() => reset()}
     >
      {isPending && <Spinner />}
      {dic.newHotel.form.clearForm}
     </Button>

     <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
      <Button
       className='sm:min-w-28'
       type='button'
       variant='outline'
       disabled={isPending || isLoading}
       onClick={() => {
        onCancel?.({
         mode: hotelID ? 'edit' : 'add',
         hotelID: hotelID || 0,
        });
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newHotel.form.cancel}
      </Button>
      <Button
       className='sm:min-w-28'
       type='submit'
       disabled={isPending || isLoading}
       onClick={(e) => {
        e.preventDefault();
        handleSubmit((data) => mutate(data))();
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newHotel.form.save}
      </Button>
     </div>
    </div>
   </FieldGroup>
  </form>
 );
}
