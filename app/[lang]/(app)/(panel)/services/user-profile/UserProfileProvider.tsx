'use client';
import { useState, ReactNode, useEffect } from 'react';
import {
 type UserProfile,
 type UserPorifleTab,
 type UserSettingsPreferences,
 userProfileContext,
 userSettingsPreferencesDefaults,
} from './userProfileContext';
import {
 Dialog,
 DialogHeader,
 DialogTitle,
 DialogContent,
} from '@/components/ui/dialog';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';
import UserProfileTabs from './components/UserProfileTabs';
import UserProfileContent from './components/UserProfileContent';
import UserProfileSettings from './components/UserProfileSettings';
import { gridLimitSizeOptions } from './utils/gridSetup';
import {
 getUiSettingsPreferences,
 setUiSettingsPreferences,
} from './utils/uiSettingPreferencesStoreManager';

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
 const [userSettingsPreferences, setUserSettingsPreferences] =
  useState<UserSettingsPreferences>(() => {
   try {
    if (typeof window !== 'undefined' && window) {
     return getUiSettingsPreferences() || userSettingsPreferencesDefaults;
    }
    return userSettingsPreferencesDefaults;
   } catch {
    return getUiSettingsPreferences() || userSettingsPreferencesDefaults;
   }
  });
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

 function handleChangeUiSettings(
  newUiSetting: Partial<UserSettingsPreferences['ui']>,
 ) {
  const newSetting = {
   ...userSettingsPreferences,
   ui: {
    ...userSettingsPreferences.ui,
    ...newUiSetting,
   },
  };
  setUserSettingsPreferences(newSetting);
  setUiSettingsPreferences(newSetting);
 }

 const ctx: UserProfile = {
  isOpen,
  activeTabType: profileTab,
  toggle: handleToggle,
  settings: {
   ui: {
    gridLimitSizeOptions,
   },
  },
  settingsPreferences: userSettingsPreferences,
  onChangeUiSettings: handleChangeUiSettings,
 };

 function renderContent() {
  switch (profileTab) {
   case 'generalInfo':
    return <UserProfileContent />;
   case 'setting':
    return <UserProfileSettings />;
   default:
    return <div></div>;
  }
 }

 useEffect(() => {
  if (!getUiSettingsPreferences()) {
   setUiSettingsPreferences(userSettingsPreferencesDefaults);
  }
 }, []);
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
