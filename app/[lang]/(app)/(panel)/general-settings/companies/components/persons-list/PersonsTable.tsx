import { useMemo, useState } from 'react';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
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
import { type Company } from '../../services/personsApiActions';
import {
 ColumnDef,
 useReactTable,
 getCoreRowModel,
 flexRender,
 RowSelectionState,
 ColumnPinningState,
} from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { MoreHorizontal } from 'lucide-react';
import { useCommonPinningStyles } from '../../../../hooks/useCommonPinningStyles';
import { MdOutlinePushPin } from 'react-icons/md';
import { RiUnpinLine } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import { IoTrashOutline } from 'react-icons/io5';
import { Field, FieldLabel } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import {
 MdKeyboardDoubleArrowLeft,
 MdKeyboardDoubleArrowRight,
 MdKeyboardArrowLeft,
 MdKeyboardArrowRight,
} from 'react-icons/md';
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';
import { useFormContext } from 'react-hook-form';
import { type CompanySchema } from '../../schemas/companySchema';

export default function PersonsTable({ dic }: { dic: CompaniesDictionary }) {
 const { getValues } = useFormContext<CompanySchema>();
 const validFilters = Object.keys(getValues()).filter(
  (key) => getValues()[key as keyof CompanySchema],
 );
 const {
  shareDictionary: { components },
 } = useShareDictionary();
 const getCommonPinningStyles = useCommonPinningStyles();
 const { localeInfo, locale } = useBaseConfig();
 const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
 const [pinnedColumns, setPinnedColumns] = useState<ColumnPinningState>(() => {
  const startPinned = ['select'];
  const endPinned = ['actions'];
  return {
   right: localeInfo.contentDirection === 'rtl' ? endPinned : startPinned,
   left: localeInfo.contentDirection === 'rtl' ? startPinned : endPinned,
  };
 });
 const {
  wrapperType,
  changeShowFilters,
  persons: {
   isFetching,
   isSuccess,
   data,
   refetchPersons,
   pagination,
   onChangePagination,
   onRemovePerson,
   onEditPerson,
  },
 } = usePersonsConfigContext();

 const columns: ColumnDef<Company[]>[] = useMemo(() => {
  const defaultColumns: ColumnDef<Company[]>[] =
   wrapperType.mode === 'page'
    ? []
    : [
       {
        id: 'select',
        enablePinning: false,
        header: ({ table }) => (
         <div className='grid place-content-center'>
          <Checkbox
           className='border-neutral-400 dark:border-orange-600 scale-125 cursor-pointer'
           disabled
           checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
           }
           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
           aria-label='Select all'
          />
         </div>
        ),
        cell: ({ row }) => (
         <div className='grid place-content-center'>
          <Checkbox
           className='border-neutral-400 dark:border-orange-600 scale-125 cursor-pointer'
           checked={row.getIsSelected()}
           onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            if (value) {
             wrapperType.onChangePerson(
              (row.original as unknown as Company).id,
             );
            }
           }}
           aria-label='Select row'
          />
         </div>
        ),
        enableSorting: false,
        enableHiding: false,
        enableResizing: false,
        enableColumnFilter: false,
        minSize: 40,
        size: 40,
        maxSize: 40,
        meta: 'checkbox',
       },
      ];
  return [
   ...defaultColumns,
   {
    accessorKey: 'name',
    header: dic.newPerson.form.name,
    size: 160,
    minSize: 160,
   },
   {
    accessorKey: 'nationalCode',
    header: dic.newPerson.form.nationalCode,
    size: 120,
    minSize: 100,
   },
   {
    accessorKey: 'registerNo',
    header: dic.newPerson.form.registerNo,
    size: 120,
    minSize: 100,
   },
   {
    accessorKey: 'nationalityZoneName',
    header: dic.newPerson.form.nationality,
    size: 120,
    minSize: 100,
    enablePinning: false,
   },
   {
    accessorKey: 'fax',
    header: dic.newPerson.form.fax,
    size: 120,
    minSize: 100,
    enablePinning: false,
   },
   {
    accessorKey: 'tel1',
    header: dic.newPerson.form.tel + ' 1',
    size: 120,
    minSize: 100,
    enablePinning: false,
   },
   {
    accessorKey: 'tel2',
    header: dic.newPerson.form.tel + ' 2',
    size: 120,
    minSize: 100,
    enablePinning: false,
   },
   {
    accessorKey: 'tel3',
    header: dic.newPerson.form.tel + ' 3',
    size: 120,
    minSize: 100,
    enablePinning: false,
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
           const typedOriginal = row.original as unknown as Company;
           onEditPerson(typedOriginal.id);
          }}
         >
          <FaEdit className='size-5 text-inherit' />
          {dic.table.edit}
         </DropdownMenuItem>
         <DropdownMenuItem
          className='text-rose-700 dark:text-rose-400'
          onClick={() => {
           const typedOriginal = row.original as unknown as Company;
           onRemovePerson(typedOriginal.id);
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
  ] as ColumnDef<Company[]>[];
 }, [dic, localeInfo, onRemovePerson, onEditPerson, wrapperType]);

 const defaultData = useMemo(() => [], []);
 const table = useReactTable({
  data: data?.rows || defaultData,
  columns,
  columnResizeDirection: localeInfo.contentDirection,
  columnResizeMode: 'onChange',
  state: {
   rowSelection,
   pagination: pagination,
   columnPinning: pinnedColumns,
  },
  enableMultiRowSelection: false,
  rowCount: data?.rowsCount,
  manualPagination: true,
  onRowSelectionChange: setRowSelection,
  onColumnPinningChange: setPinnedColumns,
  onPaginationChange: onChangePagination,
  getCoreRowModel: getCoreRowModel(),
 });

 return (
  <div className='bg-background border border-input lg:rounded-es-none lg:rounded-ss-none rounded flex flex-col overflow-hidden'>
   <div className='p-1 border-b border-input flex justify-between items-center min-h-12 shrink-0'>
    <div>
     <Button
      variant='outline'
      className='h-auto text-rose-700! dark:text-rose-400! border-rose-700 dark:border-rose-400 px-2! gap-1'
      onClick={() => changeShowFilters(true)}
     >
      <TbFilterSearch />{' '}
      <span className='hidden lg:inline'>{dic.table.filters}</span> (
      {validFilters.length})
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
   <div className='relative grow flex flex-col overflow-auto'>
    {isFetching && <LinearLoading />}
    {!data?.rows.length && isSuccess && !isFetching && <NoItemFound />}
    {isSuccess && !!data?.rows.length && (
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
         onClick={() => {
          if (wrapperType.mode === 'page') return;
          const typedOriginal = row.original as unknown as Company;
          wrapperType.onChangePerson(typedOriginal.id);
         }}
         onDoubleClick={() => {
          if (wrapperType.mode === 'find') return;
          const typedOriginal = row.original as unknown as Company;
          onEditPerson(typedOriginal.id);
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
   <div className='shrink-0 border-t border-input p-1 flex justify-between gap-2'>
    <div></div>
    <div className='flex gap-1 items-center text-neutral-600 dark:text-neutral-400'>
     {table.getPageCount() > 1 && (
      <div className='basis-24'>
       <Field className='flex-row gap-1'>
        <FieldLabel className='text-xs w-auto!'>
         {components.pagination.search}:
        </FieldLabel>
        <InputGroup className='grow'>
         <InputGroupInput
          defaultValue={table.getState().pagination.pageIndex + 1 || ''}
          value={table.getState().pagination.pageIndex + 1}
          onClick={(e) => e.currentTarget.select()}
          onChange={(e) => {
           const newValue = Number(e.target.value);
           if (!newValue) return;
           const newPageIndex = newValue - 1;
           table.setPageIndex(newPageIndex);
          }}
         />
        </InputGroup>
       </Field>
      </div>
     )}
     <div className='flex gap-1 items-center'>
      <Button
       variant='outline'
       size='icon'
       disabled={!table.getCanPreviousPage()}
       onClick={() => table.firstPage()}
      >
       <MdKeyboardDoubleArrowRight className='size-4 ltr:rotate-180' />
      </Button>
      <Button
       variant='outline'
       className='gap-1'
       disabled={!table.getCanPreviousPage()}
       onClick={() => table.previousPage()}
      >
       <MdKeyboardArrowRight />
       <span className='hidden lg:inline'>{components.pagination.prev}</span>
      </Button>
      {table.getPageCount() ? (
       <div
        style={{
         direction: 'ltr',
        }}
        className='text-base'
       >
        <span>{table.getState().pagination.pageIndex + 1}</span> /{' '}
        <span>{table.getPageCount()}</span>
       </div>
      ) : (
       <div>...</div>
      )}
      <Button
       variant='outline'
       className='gap-1 ltr:rotate-180'
       disabled={!table.getCanNextPage()}
       onClick={() => {
        table.nextPage();
       }}
      >
       <span className='hidden lg:inline'>{components.pagination.next}</span>
       <MdKeyboardArrowLeft className='ltr:rotate-180' />
      </Button>
      <Button
       variant='outline'
       size='icon'
       disabled={!table.getCanNextPage()}
       onClick={() => table.lastPage()}
      >
       <MdKeyboardDoubleArrowLeft className='size-4 ltr:rotate-180' />
      </Button>
     </div>
    </div>
   </div>
  </div>
 );
}
