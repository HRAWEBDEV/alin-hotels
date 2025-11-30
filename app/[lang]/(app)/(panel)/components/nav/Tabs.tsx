'use client';
import { Button } from '@/components/ui/button';
import { MdSupportAgent } from 'react-icons/md';
import { IoMdHome } from 'react-icons/io';
import { MdOutlineApps } from 'react-icons/md';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';
import { useUserProfileContext } from '../../services/user-profile/userProfileContext';
import Link from 'next/link';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useNavigationContext } from '../../services/navigation/navigationContext';

export default function Tabs() {
 const { toggle: toggleNav } = useNavigationContext();
 const { locale } = useBaseConfig();
 const { toggle } = useUserProfileContext();
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
  <nav className='grid lg:hidden grid-cols-3 shrink-0 h-(--panel-tabs-height) border-b border-input'>
   <Button variant='ghost' className={tabClass} asChild>
    <Link href={`/${locale}`}>
     <IoMdHome className={tabIconClass} />
     <span className={tabText}>{tabs.home}</span>
    </Link>
   </Button>
   <Button
    variant='ghost'
    className={tabClass}
    onClick={() => {
     toggleNav(true);
    }}
   >
    <MdOutlineApps className={tabIconClass} />
    <span className={tabText}>{tabs.menus}</span>
   </Button>
   <Button
    variant='ghost'
    className={tabClass}
    onClick={() =>
     toggle({
      open: true,
      type: 'support',
     })
    }
   >
    <MdSupportAgent className={tabIconClass} />
    <span className={tabText}>{tabs.support}</span>
   </Button>
  </nav>
 );
}
