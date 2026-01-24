import { type QuickAccessItem } from './quickAccessContext';
const quickAccessStorageName = 'quickAccess';

function setStorageQuickAccessItems(items: QuickAccessItem[]) {
 localStorage.setItem(quickAccessStorageName, JSON.stringify(items));
}

function getStorageQuickAccessItems(): QuickAccessItem[] {
 const val = localStorage.getItem(quickAccessStorageName);
 return val ? JSON.parse(val) : [];
}

function clearStorageQuickAccessItems() {
 localStorage.removeItem(quickAccessStorageName);
}

export {
 getStorageQuickAccessItems,
 setStorageQuickAccessItems,
 clearStorageQuickAccessItems,
};
