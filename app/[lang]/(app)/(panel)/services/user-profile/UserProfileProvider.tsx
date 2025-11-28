'use client';
import { useState, ReactNode } from 'react';
import { type UserPorifleTab, userProfileContext } from './userProfileContext';
import {
 Dialog,
 DialogHeader,
 DialogTitle,
 DialogContent,
} from '@/components/ui/dialog';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';

export default function UserProfileProvider({
 children,
}: {
 children: ReactNode;
}) {
 const {
  shareDictionary: {
   components: { userProfileController },
  },
 } = useShareDictionary();
 const [profileTab, setProfileTab] = useState<UserPorifleTab>('profile');
 const [isOpen, setIsOpen] = useState(false);

 function handleToggle({
  open,
  tab,
 }: {
  open?: boolean;
  tab?: UserPorifleTab;
 }) {
  setIsOpen((pre) => (open === undefined ? !pre : open));
  setProfileTab(tab || 'profile');
 }

 const ctx = {
  isOpen,
  toggle: handleToggle,
 };

 return (
  <userProfileContext.Provider value={ctx}>
   {children}
   <Dialog
    open={isOpen}
    onOpenChange={(newValue) => {
     handleToggle({
      open: newValue,
     });
    }}
   >
    <DialogContent className='p-0'>
     <DialogHeader className='p-4 py-3 border-b border-input'>
      <DialogTitle className='font-medium text-base'>
       {userProfileController.description}
      </DialogTitle>
     </DialogHeader>
     <div className='p-4'></div>
    </DialogContent>
   </Dialog>
  </userProfileContext.Provider>
 );
}
