import { useMemo } from 'react';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuTrigger,
 DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { MdViewColumn } from 'react-icons/md';
import { TbFilterSearch } from 'react-icons/tb';
import {
 Table,
 TableBody,
 TableHeader,
 TableRow,
 TableHead,
 TableCell,
} from '@/components/ui/table';
import { usePersonsConfigContext } from '../../services/personsConfigContext';
import LinearLoading from '../../../../components/LinearLoading';
import NoItemFound from '../../../../components/NoItemFound';
import { RxReload } from 'react-icons/rx';
import { type RealPerson } from '../../services/personsApiActions';
import {
 ColumnDef,
 useReactTable,
 getCoreRowModel,
 flexRender,
} from '@tanstack/react-table';

export default function PersonsTable({ dic }: { dic: RealPersonsDictionary }) {
 const {
  changeShowFilters,
  persons: { isFetching, isSuccess, data, refetchPersons },
 } = usePersonsConfigContext();
 const { localeInfo } = useBaseConfig();

 const columns: ColumnDef<RealPerson[]>[] = useMemo(() => {
  return [
   {
    accessorKey: 'name',
    header: dic.newPerson.form.name,
    minSize: 140,
    size: 140,
   },
   {
    accessorKey: 'lastName',
    header: dic.newPerson.form.lastName,
    minSize: 160,
    size: 160,
   },
   {
    accessorKey: 'fatherName',
    header: dic.newPerson.form.fatherName,
    minSize: 140,
    size: 140,
   },
   {
    accessorKey: 'genderName',
    header: dic.newPerson.form.gender,
    enableResizing: false,
    minSize: 70,
    size: 70,
    meta: 'center',
   },
  ] as ColumnDef<RealPerson[]>[];
 }, [dic]);

 const table = useReactTable({
  data: data?.rows || [],
  columns,
  columnResizeDirection: localeInfo.contentDirection,
  columnResizeMode: 'onChange',
  getCoreRowModel: getCoreRowModel(),
 });

 return (
  <div className='bg-background border border-input lg:rounded-es-none lg:rounded-ss-none rounded flex flex-col overflow-hidden'>
   <div className='p-1 border-b border-input flex justify-between items-center min-h-12'>
    <div>
     <Button
      variant='outline'
      className='h-auto text-rose-700! dark:text-rose-400! border-rose-700 dark:border-rose-400 px-2! gap-1'
      onClick={() => changeShowFilters(true)}
     >
      <TbFilterSearch />{' '}
      <span className='hidden lg:inline'>{dic.table.filters}</span> (1)
     </Button>
    </div>
    <div className='flex gap-2'>
     <DropdownMenu dir={localeInfo.contentDirection}>
      <DropdownMenuTrigger asChild>
       <Button
        variant='outline'
        className='h-auto text-primary! border-primary px-2! gap-1'
       >
        <MdViewColumn />{' '}
        <span className='hidden lg:inline'>{dic.table.columns}</span>{' '}
        <ChevronDown />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
       {table
        .getAllColumns()
        .filter((col) => col.getCanHide())
        .map((col) => (
         <DropdownMenuCheckboxItem
          key={col.id}
          disabled={!col.getCanHide()}
          checked={col.getIsVisible()}
          onCheckedChange={() => col.toggleVisibility()}
         >
          {col.columnDef.header as string}
         </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
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
       {table.getHeaderGroups().map((group) => (
        <TableRow key={group.id}>
         {group.headers.map((header) => (
          <TableHead
           data-center={header.column.columnDef.meta === 'center'}
           key={header.id}
           className='group relative not-last:border-e border-input bg-sky-50 dark:bg-sky-950 data-[center="true"]:text-center'
           colSpan={header.colSpan}
           style={{
            width: header.getSize(),
           }}
          >
           {flexRender(header.column.columnDef.header, header.getContext())}
           {header.column.getCanResize() && (
            <div
             data-is-resizing={header.column.getIsResizing()}
             data-dir={localeInfo.contentDirection}
             className='group-hover:bg-sky-600/30 dark:group-hover:bg-sky-400/30 data-[is-resizing="true"]:bg-sky-800 dark:data-[is-resizing="true"]:bg-sky-400 absolute top-0 h-full w-1 cursor-col-resize select-none touch-none data-[dir="rtl"]:left-0 data-[dir="ltr"]:right-0'
             {...{
              onDoubleClick: () => header.column.resetSize(),
              onMouseDown: header.getResizeHandler(),
              onTouchStart: header.getResizeHandler(),
              style: {
               transform:
                false && header.column.getIsResizing()
                 ? `translateX(${
                    (table.options.columnResizeDirection === 'rtl' ? -1 : 1) *
                    (table.getState().columnSizingInfo.deltaOffset ?? 0)
                   }px)`
                 : '',
              },
             }}
            />
           )}
          </TableHead>
         ))}
        </TableRow>
       ))}
      </TableHeader>
      <TableBody>
       {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id}>
         {row.getVisibleCells().map((cell) => (
          <TableCell
           data-center={cell.column.columnDef.meta === 'center'}
           key={cell.id}
           className='not-last:border-e border-input data-[center="true"]:text-center'
          >
           {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
         ))}
        </TableRow>
       ))}
      </TableBody>
     </Table>
    )}
   </div>
  </div>
 );
}
