import { useMemo, useState } from 'react';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
 DropdownMenu,
 DropdownMenuCheckboxItem,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { MdViewColumn } from 'react-icons/md';
import { TbFilterSearch } from 'react-icons/tb';
import { FaPlus } from 'react-icons/fa6';
import {
 Table,
 TableBody,
 TableHeader,
 TableRow,
 TableHead,
 TableCell,
} from '@/components/ui/table';
import { useHotelEmployeeContext } from '../../services/hotel-employees/hotelEmployeeContext';
import LinearLoading from '../../../../components/LinearLoading';
import NoItemFound from '../../../../components/NoItemFound';
import { RxReload } from 'react-icons/rx';
import { type HotelEmployee } from '../../services/hotel-employees/hotelEmployeesApiActions';
import {
 ColumnDef,
 useReactTable,
 getCoreRowModel,
 flexRender,
 ColumnPinningState,
} from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useCommonPinningStyles } from '../../../../hooks/useCommonPinningStyles';
import { MdOutlinePushPin } from 'react-icons/md';
import { RiUnpinLine } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { useFormContext } from 'react-hook-form';
import { type HotelEmployeeSchema } from '../../schemas/hotel-employees/hotelEmployeesSchema';

export default function EmployeesTable({ dic }: { dic: HotelsDictionary }) {
 const { getValues } = useFormContext<HotelEmployeeSchema>();
 const validFilters = Object.keys(getValues()).filter(
  (key) => getValues()[key as keyof HotelEmployeeSchema],
 );
 const getCommonPinningStyles = useCommonPinningStyles();
 const { localeInfo, locale } = useBaseConfig();
 const [pinnedColumns, setPinnedColumns] = useState<ColumnPinningState>(() => {
  const startPinned = ['select'];
  const endPinned = ['actions'];
  return {
   right: localeInfo.contentDirection === 'rtl' ? endPinned : startPinned,
   left: localeInfo.contentDirection === 'rtl' ? startPinned : endPinned,
  };
 });
 const {
  changeShowFilters,
  hotelEmployee: {
   isFetching,
   isSuccess,
   filteredData,
   refetch,
   onEditEmployee,
   onAddEmployee,
   onRemoveHotelEmployee,
  },
 } = useHotelEmployeeContext();

 const columns: ColumnDef<HotelEmployee>[] = useMemo(() => {
  return [
   {
    accessorKey: 'personFullName',
    header: dic.hotelEmployee.form.person,
    minSize: 180,
    size: 180,
   },
   {
    accessorKey: 'jobTitleName',
    header: dic.hotelEmployee.form.job,
    minSize: 180,
    size: 180,
    meta: 'center',
   },
   {
    accessorKey: 'fromDateTimeOffset',
    header: dic.hotelEmployee.form.fromDate,
    minSize: 120,
    size: 120,
    enablePinning: false,
    meta: 'center',
    cell({ getValue }) {
     const val = getValue();
     return val ? new Date(val as string).toLocaleDateString(locale) : '';
    },
   },
   {
    accessorKey: 'endDateTimeOffset',
    header: dic.hotelEmployee.form.toDate,
    minSize: 120,
    size: 120,
    enablePinning: false,
    meta: 'center',
    cell({ getValue }) {
     const val = getValue();
     return val ? new Date(val as string).toLocaleDateString(locale) : '';
    },
   },
   {
    id: 'actions',
    enableHiding: false,
    enableSorting: false,
    enableResizing: false,
    enableColumnFilter: false,
    size: 40,
    maxSize: 40,
    minSize: 40,
    enablePinning: false,
    cell: ({ row }) => {
     return (
      <div className='grid place-content-center'>
       <DropdownMenu dir={localeInfo.contentDirection}>
        <DropdownMenuTrigger asChild>
         <Button variant='ghost' className='h-8 w-8 p-0'>
          <span className='sr-only'>Open menu</span>
          <MoreHorizontal className='size-5 text-primary' />
         </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' onClick={(e) => e.stopPropagation()}>
         <DropdownMenuItem
          className='text-secondary'
          onClick={() => {
           const typedOriginal = row.original;
           onEditEmployee(typedOriginal.id);
          }}
         >
          <FaEdit className='size-5 text-inherit' />
          {dic.hotelEmployee.form.editEmployee}
         </DropdownMenuItem>
         <DropdownMenuItem
          className='text-rose-700 dark:text-rose-400'
          onClick={() => {
           const typedOriginal = row.original;
           onRemoveHotelEmployee(typedOriginal.id);
          }}
         >
          <IoTrashOutline className='size-5 text-inherit' />
          {dic.table.remove}
         </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
      </div>
     );
    },
    meta: 'action',
   },
  ] as ColumnDef<HotelEmployee>[];
 }, [dic, onRemoveHotelEmployee, localeInfo, locale, onEditEmployee]);

 const defaultData = useMemo(() => [], []);
 const table = useReactTable({
  data: filteredData || defaultData,
  columns,
  columnResizeDirection: localeInfo.contentDirection,
  columnResizeMode: 'onChange',
  state: {
   columnPinning: pinnedColumns,
  },
  onColumnPinningChange: setPinnedColumns,
  getCoreRowModel: getCoreRowModel(),
 });

 return (
  <div className='bg-background border border-input lg:rounded-es-none lg:rounded-ss-none rounded flex flex-col overflow-hidden'>
   <div className='p-1 border-b border-input flex justify-between items-center min-h-12 shrink-0'>
    <div className='flex gap-2'>
     <Button
      variant='outline'
      className='h-auto text-rose-700! dark:text-rose-400! border-rose-700 dark:border-rose-400 px-2! gap-1'
      onClick={() => changeShowFilters(true)}
     >
      <TbFilterSearch />{' '}
      <span className='hidden lg:inline'>{dic.table.filters}</span> (
      {validFilters.length})
     </Button>
     <Button className='h-auto' onClick={() => onAddEmployee()}>
      <FaPlus />
      {dic.hotelEmployee.form.addEmployee}
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
      onClick={() => refetch()}
     >
      <RxReload className='size-4' />
     </Button>
    </div>
   </div>
   <div className='relative grow flex flex-col overflow-auto'>
    {isFetching && <LinearLoading />}
    {!filteredData?.length && isSuccess && !isFetching && <NoItemFound />}
    {isSuccess && !!filteredData?.length && (
     <Table className='table-fixed'>
      <TableHeader>
       {table.getHeaderGroups().map((group) => (
        <TableRow key={group.id}>
         {group.headers.map((header) => (
          <TableHead
           data-center={header.column.columnDef.meta === 'center'}
           data-action={header.column.columnDef.meta === 'action'}
           data-checkbox={header.column.columnDef.meta === 'checkbox'}
           data-is-pinned={!!header.column.getIsPinned()}
           key={header.id}
           className='overflow-hidden text-ellipsis group not-last:border-e border-input bg-neutral-100 dark:bg-neutral-900 data-[center="true"]:text-center data-[action="true"]:p-0 data-[checkbox="true"]:p-0 sticky top-0 z-1 data-[is-pinned="true"]:z-2 data-[checkbox="true"]:z-3'
           colSpan={header.colSpan}
           style={{ ...getCommonPinningStyles(header.column) }}
          >
           {flexRender(header.column.columnDef.header, header.getContext())}
           {header.column.getCanPin() && (
            <div className='absolute end-0 top-1/2 -translate-y-1/2 text-neutral-500'>
             <Button
              variant={'ghost'}
              size={'icon'}
              onClick={() => {
               if (header.column.getIsPinned()) {
                header.column.pin(false);
               } else {
                header.column.pin(
                 localeInfo.contentDirection === 'rtl' ? 'left' : 'right',
                );
               }
              }}
             >
              {header.column.getIsPinned() ? (
               <MdOutlinePushPin />
              ) : (
               <RiUnpinLine />
              )}
             </Button>
            </div>
           )}
           {header.column.getCanResize() && (
            <div
             data-is-resizing={header.column.getIsResizing()}
             data-dir={localeInfo.contentDirection}
             className='group-hover:bg-neutral-600/30 dark:group-hover:bg-neutral-400/30 data-[is-resizing="true"]:bg-neutral-800 dark:data-[is-resizing="true"]:bg-neutral-400 absolute top-0 h-full w-1 cursor-col-resize select-none touch-none data-[dir="rtl"]:left-0 data-[dir="ltr"]:right-0'
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
        <TableRow
         key={row.id}
         onDoubleClick={() => {
          const typedOriginal = row.original;
          onEditEmployee(typedOriginal.id);
         }}
        >
         {row.getVisibleCells().map((cell) => (
          <TableCell
           title={
            typeof cell.getValue() === 'string'
             ? (cell.getValue() as string)
             : ''
           }
           key={cell.id}
           data-is-pinned={!!cell.column.getIsPinned()}
           data-center={cell.column.columnDef.meta === 'center'}
           data-action={cell.column.columnDef.meta === 'action'}
           data-checkbox={cell.column.columnDef.meta === 'checkbox'}
           className='overflow-hidden text-ellipsis data-[is-pinned="true"]:bg-background not-last:border-e border-input data-[center="true"]:text-center data-[action="true"]:p-0 data-[checkbox="true"]:p-0 data-[is-pinned="true"]:z-1'
           style={{ ...getCommonPinningStyles(cell.column) }}
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
