'use client';
import { ReactNode, useState } from 'react';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';
import { type LogoutContext, logoutContext } from './logoutContext';
import {
 Dialog,
 DialogClose,
 DialogTitle,
 DialogDescription,
 DialogHeader,
 DialogFooter,
 DialogContent,
} from '@/components/ui/dialog';
import { IoIosWarning } from 'react-icons/io';
import { Button } from '@/components/ui/button';
import useLogout from '../../hooks/useLogout';

export default function LogoutContextProvider({
 children,
}: {
 children: ReactNode;
}) {
 const logout = useLogout();
 const [open, setOpen] = useState(false);
 const {
  shareDictionary: {
   components: { logOutModal },
  },
 } = useShareDictionary();

 function handleOpen(open?: boolean) {
  setOpen((pre) => (open === undefined ? !pre : open));
 }

 const ctx: LogoutContext = {
  open,
  onOpen: handleOpen,
 };

 return (
  <logoutContext.Provider value={ctx}>
   {children}
   <Dialog open={open} onOpenChange={(newValue) => setOpen(newValue)}>
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>{logOutModal.title}</DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {logOutModal.title}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>{logOutModal.title}</p>
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button
        variant='outline'
        className='sm:w-20'
        onClick={() => setOpen(false)}
       >
        {logOutModal.cancel}
       </Button>
      </DialogClose>
      <Button
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        setOpen(false);
        logout();
       }}
      >
       {logOutModal.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </logoutContext.Provider>
 );
}
