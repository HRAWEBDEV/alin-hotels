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

export default function Addressbar() {
 const { activePath, activeMenu } = useNavigatorContext();
 const {
  shareDictionary: { pages: pagesDic },
 } = useShareDictionary();
 return (
  <nav className='shrink-0 p-1 px-4 border-b border-input bg-neutral-100 dark:bg-neutral-900 shadow-xl flex gap-2 justify-between items-center'>
   <div>
    {activeMenu ? (
     <Breadcrumb>
      <BreadcrumbList>
       <BreadcrumbItem>
        <BreadcrumbPage className='font-light text-xs'>
         {activePath ? pagesDic[activePath] : ''}
        </BreadcrumbPage>
       </BreadcrumbItem>
       <BreadcrumbSeparator>
        <MdKeyboardArrowLeft className='ltr:rotate-180' />
       </BreadcrumbSeparator>
       <BreadcrumbItem>
        <BreadcrumbPage className='text-primary font-medium text-xs'>
         {pagesDic[activeMenu.name]}
        </BreadcrumbPage>
       </BreadcrumbItem>
      </BreadcrumbList>
     </Breadcrumb>
    ) : (
     <></>
    )}
   </div>
   <div className='flex items-center gap-2'>
    <QuickAccessControllerButton />
    <Button
     className='hidden lg:flex size-8 rounded-full text-primary'
     variant='outline'
     size='icon'
    >
     <MdHome />
    </Button>
    <Button
     className='size-8 rounded-full text-orange-700 dark:text-orange-400'
     variant='outline'
     size='icon'
    >
     <IoReload />
    </Button>
    <Button
     className='size-8 rounded-full text-rose-700 dark:text-rose-400'
     variant='outline'
     size='icon'
    >
     <IoArrowBack />
    </Button>
   </div>
  </nav>
 );
}
