'use client';
import { Button } from '@/components/ui/button';
import { IoMdSettings } from 'react-icons/io';
import { RiBookMarkedFill } from 'react-icons/ri';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineApps } from 'react-icons/md';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';

export default function Tabs() {
 const {
  shareDictionary: {
   components: { tabs },
  },
 } = useShareDictionary();
 const tabClass =
  'h-auto rounded-none flex-col p-1 gap-1 text-neutral-700 dark:text-neutral-300';
 const tabIconClass = 'size-6';
 const tabText = 'font-light text-sm';
 return (
  <nav className='grid lg:hidden grid-cols-4 shrink-0 h-(--panel-tabs-height) border-b border-input'>
   <Button variant='ghost' className={tabClass}>
    <IoMdHome className={tabIconClass} />
    <span className={tabText}>{tabs.home}</span>
   </Button>
   <Button variant='ghost' className={tabClass}>
    <MdOutlineApps className={tabIconClass} />
    <span className={tabText}>{tabs.menus}</span>
   </Button>
   <Button variant='ghost' className={tabClass}>
    <RiBookMarkedFill className={tabIconClass} />
    <span className={tabText}>{tabs.quickAccess}</span>
   </Button>
   <Button variant='ghost' className={tabClass}>
    <IoMdSettings className={tabIconClass} />
    <span className={tabText}>{tabs.settings}</span>
   </Button>
  </nav>
 );
}
