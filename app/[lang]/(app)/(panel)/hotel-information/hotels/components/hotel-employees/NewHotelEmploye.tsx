import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import {
 Dialog,
 DialogClose,
 DialogTitle,
 DialogHeader,
 DialogFooter,
 DialogContent,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function NewHotelEmployee({
 dic,
 open,
 selectedEmployeeID,
 setOpen,
}: {
 dic: HotelsDictionary;
 open: boolean;
 selectedEmployeeID: number | null;
 setOpen: (open: boolean) => unknown;
}) {
 return (
  <Dialog open={open} onOpenChange={(newValue) => setOpen(newValue)}>
   <DialogContent className='p-0 gap-0'>
    <DialogHeader className='p-4 py-3 border border-input'>
     <DialogTitle className='text-base font-medium'>
      {selectedEmployeeID
       ? dic.hotelEmployee.form.editEmployee
       : dic.hotelEmployee.form.addEmployee}
     </DialogTitle>
    </DialogHeader>
    <div className='p-4'></div>
    <DialogFooter className='p-4 py-2 border-t border-input'>
     <DialogClose asChild>
      <Button variant='outline' className='sm:w-20'>
       {dic.hotelEmployee.form.cancel}
      </Button>
     </DialogClose>
     <Button className='sm:w-20' onClick={() => {}}>
      {dic.hotelEmployee.form.save}
     </Button>
    </DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
