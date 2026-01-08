import { OutOfContext } from '@/utils/OutOfContext';
import { use, createContext } from 'react';

const userProfileTabs = [
 'generalInfo',
 'quickAccess',
 'notifications',
 'support',
 'setting',
] as const;

type UserPorifleTab = (typeof userProfileTabs)[number];

interface UserSettings {
 ui: {
  gridLimitSizeOptions: number[];
 };
}

interface UserSettingsPreferences {
 ui: {
  gridLimitSizeOption: number;
 };
}

interface UserProfile {
 isOpen: boolean;
 activeTabType: UserPorifleTab;
 toggle: (params: { open?: boolean; type?: UserPorifleTab }) => unknown;
 settings: UserSettings;
 settingsPreferences: UserSettingsPreferences;
 onChangeUiSettings: (
  newSetting: Partial<UserSettingsPreferences['ui']>,
 ) => unknown;
}

const userSettingsPreferencesDefaults: UserSettingsPreferences = {
 ui: {
  gridLimitSizeOption: 10,
 },
};

const userProfileContext = createContext<null | UserProfile>(null);

function useUserProfileContext() {
 const val = use(userProfileContext);
 if (!val) throw new OutOfContext('settingContext');
 return val;
}

export type {
 UserSettings,
 UserProfile,
 UserPorifleTab,
 UserSettingsPreferences,
};
export {
 userProfileContext,
 userProfileTabs,
 userSettingsPreferencesDefaults,
 useUserProfileContext,
};
