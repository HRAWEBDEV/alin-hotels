'use client';
import { userProfileTabs } from '../userProfileContext';
import { Button } from '@/components/ui/button';
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';
import { getTabIcon } from '../utils/getTabIcon';
import { useUserProfileContext } from '../userProfileContext';

export default function UserProfileTabs() {
 const { toggle, activeTabType } = useUserProfileContext();
 const {
  shareDictionary: {
   components: {
    userProfileController: { tabs: tabsDic },
   },
  },
 } = useShareDictionary();
 return (
  <aside className='shrink-0 lg:w-26 lg:border-e border-input overflow-auto'>
   <ul>
    {userProfileTabs.map((tab) => (
     <li key={tab}>
      <Button
       data-active-tab={activeTabType === tab}
       variant='ghost'
       className='h-auto w-full flex-col rounded-none border-b border-input gap-2 text-neutral-600 dark:text-neutral-400 data-[active-tab="true"]:text-primary'
       onClick={() => {
        toggle({
         open: true,
         type: tab,
        });
       }}
      >
       {getTabIcon(tab)}
       <span className='font-medium text-xs'>{tabsDic[tab]}</span>
      </Button>
     </li>
    ))}
   </ul>
  </aside>
 );
}
