'use client';
import {
 Breadcrumb,
 BreadcrumbItem,
 BreadcrumbList,
 BreadcrumbPage,
 BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { Button } from '@/components/ui/button';
import { IoReload } from 'react-icons/io5';
import { IoArrowBack } from 'react-icons/io5';
import { MdHome } from 'react-icons/md';
import { QuickAccessControllerButton } from '../QuickAccessController';
import { useNavigatorContext } from '../../services/navigator/navigatorContext';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';
import { useGoHome } from '../../hooks/useGoHome';
import { useHistoryContext } from '../../services/history-tracker/historyTrackerContext';
import { RiBookMarkedFill } from 'react-icons/ri';
import { useQuickAccessContext } from '../../services/quick-access/quickAccessContext';

export default function Addressbar() {
 const {
  isMarked: isQuickAccessitem,
  addItem,
  removeItem,
 } = useQuickAccessContext();
 const { canGoBack, goBack } = useHistoryContext();
 const goHome = useGoHome();
 const { activePath, activeMenu } = useNavigatorContext();

 const isMarked =
  activeMenu && activePath
   ? isQuickAccessitem(activePath, activeMenu.name)
   : false;

 const {
  shareDictionary: { pages: pagesDic },
 } = useShareDictionary();
 return (
  <nav className='shrink-0 p-1 px-4 border-b border-input bg-neutral-100 dark:bg-neutral-900 shadow-xl flex gap-2 justify-between items-center'>
   <div className='flex items-center'>
    {activeMenu && activePath ? (
     <div className='flex items-center gap-1'>
      <Button
       data-is-marked={isMarked}
       className='size-6 rounded-full text-neutral-500 data-[is-marked="true"]:text-primary'
       variant='ghost'
       size='icon'
       onClick={() => {
        if (!isMarked) {
         addItem(activePath, activeMenu);
        } else {
         removeItem(`${activePath}-${activeMenu.name}`);
        }
       }}
      >
       <RiBookMarkedFill className='size-5' />
      </Button>
      <Breadcrumb>
       <BreadcrumbList>
        <BreadcrumbItem>
         <BreadcrumbPage className='font-light text-[0.8rem]'>
          {activePath ? pagesDic[activePath] : ''}
         </BreadcrumbPage>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
         <MdKeyboardArrowLeft className='ltr:rotate-180' />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
         <BreadcrumbPage className='text-primary font-medium text-[0.8rem]'>
          {pagesDic[activeMenu.name]}
         </BreadcrumbPage>
        </BreadcrumbItem>
       </BreadcrumbList>
      </Breadcrumb>
     </div>
    ) : (
     <div className='flex items-center gap-2'>
      <MdHome className='size-5 text-primary' />
      <Breadcrumb>
       <BreadcrumbList>
        <BreadcrumbItem>
         <BreadcrumbPage className='text-primary font-medium text-[0.8rem]'>
          {pagesDic.home}
         </BreadcrumbPage>
        </BreadcrumbItem>
       </BreadcrumbList>
      </Breadcrumb>
     </div>
    )}
   </div>
   <div className='flex items-center gap-2'>
    <Button
     className='hidden lg:flex size-8 rounded-full text-primary'
     variant='outline'
     size='icon'
     onClick={goHome}
    >
     <MdHome className='size-5' />
    </Button>
    <Button
     className='size-8 rounded-full text-orange-700 dark:text-orange-400'
     variant='outline'
     size='icon'
    >
     <IoReload className='size-5' />
    </Button>
    <Button
     className='size-8 rounded-full text-rose-700 dark:text-rose-400'
     variant='outline'
     size='icon'
     disabled={!canGoBack}
     onClick={goBack}
    >
     <IoArrowBack className='size-5' />
    </Button>
   </div>
  </nav>
 );
}
