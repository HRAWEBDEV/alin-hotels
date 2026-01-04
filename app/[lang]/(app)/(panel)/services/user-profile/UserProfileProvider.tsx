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
import UserProfileTabs from './components/UserProfileTabs';
import UserProfileContent from './components/UserProfileContent';

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
 const [profileTab, setProfileTab] = useState<UserPorifleTab>('generalInfo');
 const [isOpen, setIsOpen] = useState(false);

 function handleToggle({
  open,
  type,
 }: {
  open?: boolean;
  type?: UserPorifleTab;
 }) {
  setIsOpen((pre) => (open === undefined ? !pre : open));
  setProfileTab(type || 'generalInfo');
 }

 const ctx = {
  isOpen,
  activeTabType: profileTab,
  toggle: handleToggle,
 };

 function renderContent() {
  switch (profileTab) {
   case 'generalInfo':
    return <UserProfileContent />;

   default:
    return <div></div>;
  }
 }

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
    <DialogContent className='p-0 sm:max-w-160 gap-0'>
     <DialogHeader className='p-4 py-3 border-b border-input'>
      <DialogTitle className='font-medium text-base'>
       {userProfileController.description}
      </DialogTitle>
     </DialogHeader>
     <div className='h-[80svh] overflow-hidden flex flex-col lg:flex-row'>
      <UserProfileTabs />
      <div className='grow overflow-auto bg-neutral-100 dark:bg-neutral-900'>
       {renderContent()}
      </div>
     </div>
    </DialogContent>
   </Dialog>
  </userProfileContext.Provider>
 );
}
