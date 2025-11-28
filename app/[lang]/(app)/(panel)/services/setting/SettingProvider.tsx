'use client';
import { useState, ReactNode } from 'react';
import { settingContext } from './settingContext';
import {
 Dialog,
 DialogHeader,
 DialogTitle,
 DialogContent,
} from '@/components/ui/dialog';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';

export default function SettingProvider({ children }: { children: ReactNode }) {
 const {
  shareDictionary: {
   components: { settingController },
  },
 } = useShareDictionary();
 const [isOpen, setIsOpen] = useState(false);

 function handleToggle(open?: boolean) {
  setIsOpen((pre) => (open === undefined ? !pre : open));
 }

 const ctx = {
  isOpen,
  toggle: handleToggle,
 };

 return (
  <settingContext.Provider value={ctx}>
   {children}
   <Dialog
    open={isOpen}
    onOpenChange={(newValue) => {
     handleToggle(newValue);
    }}
   >
    <DialogContent className='p-0'>
     <DialogHeader className='p-4 py-3 border-b border-input'>
      <DialogTitle className='font-medium text-base'>
       {settingController.description}
      </DialogTitle>
     </DialogHeader>
     <div className='p-4'></div>
    </DialogContent>
   </Dialog>
  </settingContext.Provider>
 );
}
