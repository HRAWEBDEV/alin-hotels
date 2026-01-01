import { useState } from 'react';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import { Button } from '@/components/ui/button';
import { usePersonsConfigContext } from '../../services/personsConfigContext';
import { LiaTimesSolid } from 'react-icons/lia';
import { FaRegTrashAlt } from 'react-icons/fa';
import { Spinner } from '@/components/ui/spinner';
import { type CompanySchema, defaultValues } from '../../schemas/companySchema';
import { useFormContext, Controller } from 'react-hook-form';

export default function PersonsFitlers({ dic }: { dic: CompaniesDictionary }) {
 const { register, setValue, control } = useFormContext<CompanySchema>();
 const {
  showFilters,
  changeShowFilters,
  initialData: { data: initialData, isLoading: initialDataLoading },
  persons: { data, isLoading },
 } = usePersonsConfigContext();
 const [openGenderCombo, setOpenGenderCombo] = useState(false);
 const [openNationalityCombo, setOpenNationalityCombo] = useState(false);
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
        const typedKey = key as keyof CompanySchema;
        setValue(
         typedKey,
         defaultValues[typedKey] as CompanySchema[keyof CompanySchema],
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
   <div className='grow overflow-auto p-2 py-4'></div>
  </div>
 );
}
