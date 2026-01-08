import { type UserSettingsPreferences } from '../userProfileContext';

const uiSettingStoreName = 'ui-setting-preferences';

function setUiSettingsPreferences(newSetting: UserSettingsPreferences) {
 localStorage.setItem(uiSettingStoreName, JSON.stringify(newSetting));
}

function getUiSettingsPreferences(): UserSettingsPreferences | null {
 const value = localStorage.getItem(uiSettingStoreName);
 return value ? JSON.parse(value) : null;
}

export { setUiSettingsPreferences, getUiSettingsPreferences };
