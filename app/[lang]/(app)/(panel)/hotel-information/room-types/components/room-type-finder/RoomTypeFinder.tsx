import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';
import RoomTypesWrapper from '../RoomTypesWrapper';
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogFooter,
} from '@/components/ui/dialog';
import { WrapperTypes } from '../../utils/wrapperTypes';

export default function RoomTypeFinder({
 dic,
 open,
 onOpenChange,
 wrapperType,
}: {
 open: boolean;
 dic: RoomTypesDictionary;
 onOpenChange: (open?: boolean) => unknown;
 wrapperType: Omit<Extract<WrapperTypes, { mode: 'find' }>, 'mode'>;
}) {
 return (
  <Dialog open={open} onOpenChange={onOpenChange}>
   <DialogContent className='flex flex-col w-full h-full sm:w-[min(95%,70rem)] sm:max-h-[95svh] max-w-none! p-0 overflow-hidden gap-0'>
    <DialogHeader className='shrink-0 p-4 border-b border-input'>
     <DialogTitle className='text-base font-medium'>{dic.title}</DialogTitle>
    </DialogHeader>
    <RoomTypesWrapper
     dic={dic}
     wrapperType={{
      mode: 'find',
      ...wrapperType,
     }}
    />
    <DialogFooter></DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
