import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { Button } from '@/components/ui/button';
import { useHotelOperatorContext } from '../../services/hotel-operators/hotelOperatorContext';
import { LiaTimesSolid } from 'react-icons/lia';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Spinner } from '@/components/ui/spinner';
import {
 type HotelOperatorSchema,
 defaultValues,
} from '../../schemas/hotel-operators/hotelEmployeesSchema';
import { useFormContext, Controller } from 'react-hook-form';
import { Field, FieldLabel, FieldGroup } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import {
 Select,
 SelectTrigger,
 SelectValue,
 SelectContent,
 SelectGroup,
 SelectItem,
} from '@/components/ui/select';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function OperatorsFilters({ dic }: { dic: HotelsDictionary }) {
 const { localeInfo } = useBaseConfig();
 const { setValue, register, control } = useFormContext<HotelOperatorSchema>();
 const {
  showFilters,
  changeShowFilters,
  hotelOperator: { filteredData, isLoading },
 } = useHotelOperatorContext();

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
        const typedKey = key as keyof HotelOperatorSchema;
        setValue(
         typedKey,
         defaultValues[
          typedKey
         ] as HotelOperatorSchema[keyof HotelOperatorSchema],
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
      {isLoading ? (
       <Spinner className='text-primary' />
      ) : (
       filteredData?.length || 0
      )}
      )
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
     <Field className='gap-2'>
      <FieldLabel htmlFor='name'>{dic.hotelOperator.form.person}</FieldLabel>
      <InputGroup>
       <InputGroupInput id='name' type='search' {...register('name')} />
      </InputGroup>
     </Field>
     <Field className='gap-2'>
      <FieldLabel htmlFor='personType'>
       {dic.hotelOperator.form.personType}
      </FieldLabel>
      <Controller
       name='personType'
       control={control}
       render={({ field: { value, onChange, ...other } }) => (
        <Select
         dir={localeInfo.contentDirection}
         value={value}
         onValueChange={(val) => onChange(val)}
         {...other}
        >
         <SelectTrigger>
          <SelectValue id='personType' />
         </SelectTrigger>
         <SelectContent>
          <SelectGroup>
           <SelectItem key='none' value='none'>
            {dic.hotelOperator.form.all}
           </SelectItem>
           <SelectItem key='realPerson' value='realPerson'>
            {dic.hotelOperator.form.realPerson}
           </SelectItem>
           <SelectItem key='company' value='company'>
            {dic.hotelOperator.form.company}
           </SelectItem>
          </SelectGroup>
         </SelectContent>
        </Select>
       )}
      />
     </Field>
    </FieldGroup>
   </div>
  </div>
 );
}
