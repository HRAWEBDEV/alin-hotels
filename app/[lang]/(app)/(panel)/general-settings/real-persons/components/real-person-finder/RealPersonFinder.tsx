import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import PersonsWrapper from '../PersonsWrapper';
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogFooter,
} from '@/components/ui/dialog';

export default function RealPersonFinder({
 dic,
}: {
 dic: RealPersonsDictionary;
}) {
 return (
  <Dialog>
   <DialogContent className='flex flex-col w-full h-full sm:w-[min(95%,70rem)] sm:max-h-[95svh] max-w-none! p-0 overflow-hidden gap-0'>
    <DialogHeader className='shrink-0 p-5 border-b border-input'>
     <DialogTitle>{dic.title}</DialogTitle>
    </DialogHeader>
    <PersonsWrapper
     dic={dic}
     wrapperType={{
      mode: 'find',
     }}
    />
    <DialogFooter></DialogFooter>
   </DialogContent>
  </Dialog>
 );
}
