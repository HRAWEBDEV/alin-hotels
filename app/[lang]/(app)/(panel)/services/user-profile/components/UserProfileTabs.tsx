'use client';
import { userProfileTabs } from '../userProfileContext';
import { Button } from '@/components/ui/button';
import { useShareDictionary } from '@/app/[lang]/(app)/services/share-dictionary/shareDictionaryContext';
import { getTabIcon } from '../utils/getTabIcon';
import { useUserProfileContext } from '../userProfileContext';
import { useKeenSlider } from 'keen-slider/react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function UserProfileTabs() {
 const { localeInfo } = useBaseConfig();
 const [sliderRef] = useKeenSlider({
  rtl: localeInfo.contentDirection === 'rtl',
  slides: {
   perView: 4,
  },
 });
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
   <div className='keen-slider lg:hidden!' ref={sliderRef}>
    {userProfileTabs.map((tab, i) => (
     <div key={tab} className={`keen-slider__slide number-slide${i}`}>
      <Button
       data-active-tab={activeTabType === tab}
       variant='ghost'
       className='h-auto w-full flex-col rounded-none border-b border-e border-input gap-2 text-neutral-600 dark:text-neutral-400 data-[active-tab="true"]:text-primary'
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
     </div>
    ))}
   </div>
   <ul className='hidden lg:block'>
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
