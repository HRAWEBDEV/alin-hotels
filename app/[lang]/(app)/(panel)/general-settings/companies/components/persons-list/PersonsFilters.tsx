import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import { Button } from '@/components/ui/button';
import { LiaTimesSolid } from 'react-icons/lia';
import { FaRegTrashAlt } from 'react-icons/fa';
import { usePersonsConfigContext } from '../../services/personsConfigContext';

export default function PersonsFitlers({ dic }: { dic: CompaniesDictionary }) {
 const { showFilters, changeShowFilters } = usePersonsConfigContext();
 return (
  <div
   data-show-filters={showFilters}
   className='absolute inset-0 lg:static hidden data-[show-filters="true"]:flex bg-background border border-input rounded lg:flex! flex-col overflow-hidden'
  >
   <div className='p-2 border-b border-input flex justify-between items-center min-h-12'>
    <div className='basis-9'>
     <Button
      variant='ghost'
      size='icon-lg'
      className='text-red-700 dark:text-red-400'
     >
      <FaRegTrashAlt className='size-4' />
     </Button>
    </div>
    <p className='text-base font-medium text-neutral-600 dark:text-neutral-400 grow text-center'>
     {dic.filters.title}
     <span className='text-xs'> ({dic.filters.results}: 10)</span>
    </p>
    <div className='basis-9'>
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
