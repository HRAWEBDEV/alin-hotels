import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
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

export default function PersonsTable({ dic }: { dic: CompaniesDictionary }) {
 const { changeShowFilters } = usePersonsConfigContext();
 const { localeInfo } = useBaseConfig();
 return (
  <div className='bg-background border border-input lg:rounded-es-none lg:rounded-ss-none rounded flex flex-col overflow-hidden'>
   <div className='p-1 border-b border-input flex justify-between items-center min-h-12'>
    <div>
     <Button
      variant='outline'
      className='h-auto text-rose-700! dark:text-rose-400! border-rose-700 dark:border-rose-400'
      onClick={() => changeShowFilters(true)}
     >
      <TbFilterSearch /> {dic.table.filters} (1)
     </Button>
    </div>
    <div>
     <DropdownMenu dir={localeInfo.contentDirection}>
      <DropdownMenuTrigger asChild>
       <Button
        variant='outline'
        className='h-auto text-primary! border-primary'
       >
        <MdViewColumn /> {dic.table.columns} <ChevronDown />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'></DropdownMenuContent>
     </DropdownMenu>
    </div>
   </div>
   <div className='grow overflow-auto'>
    <Table>
     <TableHeader>
      <TableRow></TableRow>
     </TableHeader>
     <TableBody>
      <TableRow></TableRow>
     </TableBody>
    </Table>
   </div>
  </div>
 );
}
