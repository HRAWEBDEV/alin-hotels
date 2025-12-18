import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { MdViewColumn } from 'react-icons/md';
import { TbFilterSearch } from 'react-icons/tb';
import { Table, TableBody, TableHeader, TableRow } from '@/components/ui/table';
import { usePersonsConfigContext } from '../../services/personsConfigContext';
import LinearLoading from '../../../../components/LinearLoading';
import NoItemFound from '../../../../components/NoItemFound';
import { RxReload } from 'react-icons/rx';

export default function PersonsTable({ dic }: { dic: RealPersonsDictionary }) {
 const {
  changeShowFilters,
  persons: { isFetching, isSuccess, data, refetchPersons },
 } = usePersonsConfigContext();
 const { localeInfo } = useBaseConfig();
 return (
  <div className='bg-background border border-input lg:rounded-es-none lg:rounded-ss-none rounded flex flex-col overflow-hidden'>
   <div className='p-1 border-b border-input flex justify-between items-center min-h-12'>
    <div>
     <Button
      variant='outline'
      className='h-auto text-rose-700! dark:text-rose-400! border-rose-700 dark:border-rose-400 px-2! gap-1'
      onClick={() => changeShowFilters(true)}
     >
      <TbFilterSearch /> {dic.table.filters} (1)
     </Button>
    </div>
    <div className='flex gap-2'>
     <DropdownMenu dir={localeInfo.contentDirection}>
      <DropdownMenuTrigger asChild>
       <Button
        variant='outline'
        className='h-auto text-primary! border-primary px-2! gap-1'
       >
        <MdViewColumn /> {dic.table.columns} <ChevronDown />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'></DropdownMenuContent>
     </DropdownMenu>
     <Button
      variant={'outline'}
      size={'icon'}
      className='h-auto text-primary border-primary'
      disabled={isFetching}
      onClick={() => refetchPersons()}
     >
      <RxReload className='size-4' />
     </Button>
    </div>
   </div>
   <div className='relative grow overflow-auto'>
    {isFetching && <LinearLoading />}
    {!data?.rows.length && <NoItemFound />}
    {isSuccess && !!data?.rows.length && (
     <Table>
      <TableHeader>
       <TableRow></TableRow>
      </TableHeader>
      <TableBody>
       <TableRow></TableRow>
      </TableBody>
     </Table>
    )}
   </div>
  </div>
 );
}
