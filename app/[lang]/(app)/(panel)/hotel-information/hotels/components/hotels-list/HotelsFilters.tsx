import { useState } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { Button } from '@/components/ui/button';
import { useHotelsConfigContext } from '../../services/hotelsConfigContext';
import { LiaTimesSolid } from 'react-icons/lia';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Spinner } from '@/components/ui/spinner';
import { type HotelSchema, defaultValues } from '../../schemas/hotelSchema';
import { useFormContext, Controller } from 'react-hook-form';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
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

export default function HotelsFitlers({ dic }: { dic: HotelsDictionary }) {
 const { setValue, control } = useFormContext<HotelSchema>();
 const {
  showFilters,
  changeShowFilters,
  initialData: { data: initialData, isLoading: initialDataLoading },
  hotels: { data, isLoading },
 } = useHotelsConfigContext();

 const [openState, setOpenState] = useState(false);
 const [openCity, setOpenCity] = useState(false);
 const [openOwnerShipType, setOpenOwnerShipType] = useState(false);
 const [openOperatorType, setOpenOperatorType] = useState(false);
 const [openHotelType, setOpenHotelType] = useState(false);
 const [openGradeType, setOpenGradeType] = useState(false);
 const [openDegreeType, setOpenDegreeType] = useState(false);
 const [openLocationType, setOpenLocationType] = useState(false);
 const [openHotelTheme, setOpenHotelTheme] = useState(false);

 return (
  <div
   data-show-filters={showFilters}
   className='absolute inset-0 lg:static hidden data-[show-filters="true"]:flex bg-background border border-input rounded lg:rounded-ee-none lg:rounded-se-none lg:border-e-0 lg:flex! flex-col overflow-hidden z-4'
  >
   <div className='p-2 border-b border-input flex justify-between items-center min-h-12'>
    <div className='basis-9 flex'>
     <Button
      variant='ghost'
      size='icon-lg'
      className='text-red-700 dark:text-red-400 h-auto'
      onClick={() => {
       Object.keys(defaultValues).forEach((key) => {
        const typedKey = key as keyof HotelSchema;
        setValue(
         typedKey,
         defaultValues[typedKey] as HotelSchema[keyof HotelSchema],
        );
       });
      }}
     >
      <FaRegTrashAlt className='size-4' />
     </Button>
    </div>
    <div className='flex gap-2 items-center'>
     <p className='text-base font-medium text-neutral-600 dark:text-neutral-400 grow text-center'>
      {dic.filters.title}
     </p>
     <div className='text-xs flex items-center'>
      ({dic.filters.results}:{' '}
      {isLoading ? <Spinner className='text-primary' /> : data?.rowsCount || 0})
     </div>
    </div>
    <div className='basis-9 flex'>
     <Button
      variant='ghost'
      size='icon-lg'
      className='text-red-700 dark:text-red-400 lg:hidden'
      onClick={() => changeShowFilters(false)}
     >
      <LiaTimesSolid className='size-5' />
     </Button>
    </div>
   </div>
   <div className='grow overflow-auto p-2 py-4'>
    <FieldGroup className='gap-5'>
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
           title={value?.value || ''}
           role='combobox'
           aria-expanded={openState}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
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
             {initialData?.stateZones.map((item) => (
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
           title={value?.value || ''}
           aria-expanded={openCity}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
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
             {initialData?.stateZones.map((item) => (
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
           title={value?.value || ''}
           aria-expanded={openOwnerShipType}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
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
             {initialData?.hotelOwnershipTypes.map((item) => (
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
           title={value?.value || ''}
           aria-expanded={openOperatorType}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
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
             {initialData?.hotelOperators.map((item) => (
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
           title={value?.value || ''}
           aria-expanded={openHotelType}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
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
             {initialData?.hotelTypes.map((item) => (
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
           title={value?.value || ''}
           aria-expanded={openHotelType}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
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
             {initialData?.gradeTypes.map((item) => (
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
        <FieldLabel htmlFor='degreeType'>{dic.newHotel.form.degree}</FieldLabel>
        <Popover open={openDegreeType} onOpenChange={setOpenDegreeType}>
         <PopoverTrigger asChild>
          <Button
           id='degreeType'
           variant='outline'
           role='combobox'
           title={value?.value || ''}
           aria-expanded={openDegreeType}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
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
             {initialData?.degreeTypes.map((item) => (
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
           title={value?.value || ''}
           aria-expanded={openLocationType}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
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
             {initialData?.locationTypes.map((item) => (
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
           title={value?.value || ''}
           aria-expanded={openHotelTheme}
           className='justify-between'
           {...other}
          >
           <span className='text-start grow overflow-hidden text-ellipsis'>
            {value?.value || ''}
           </span>
           <div className='flex gap-1 items-center -me-2'>
            {initialDataLoading && <Spinner />}
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
             {initialData?.hotelThemes.map((item) => (
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
    </FieldGroup>
   </div>
  </div>
 );
}
