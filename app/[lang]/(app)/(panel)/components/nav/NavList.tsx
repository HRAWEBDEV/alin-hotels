'use client';
import { useState } from 'react';
import {
 InputGroup,
 InputGroupInput,
 InputGroupAddon,
} from '@/components/ui/input-group';
import {
 Accordion,
 AccordionItem,
 AccordionContent,
 AccordionTrigger,
} from '@/components/ui/accordion';
import { FaSearch } from 'react-icons/fa';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { TbLayoutSidebarRightCollapseFilled } from 'react-icons/tb';
import { useNavigationContext } from '../../services/navigation/navigationContext';
import { usePagesContext } from '../../../services/pages/pagesContext';
import { getPageIcon } from '../../../services/pages/utils/getPageIcon';
import { filterPages } from '../../../services/pages/utils/filterPages';
import Highlighter from 'react-highlight-words';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import {
 type Pages,
 type Path,
 type Page,
} from '../../../services/pages/utils/pagesList';
import { useNavigatorContext } from '../../services/navigator/navigatorContext';
import { RiBookMarkedFill } from 'react-icons/ri';
import { useQuickAccessContext } from '../../services/quick-access/quickAccessContext';

export default function NavList() {
 const {
  addItem: addQuickAccessItem,
  removeItem: removeQuickAccessItem,
  isMarked: isQuickAccess,
 } = useQuickAccessContext();
 const { activePath, activeMenu } = useNavigatorContext();
 const { locale } = useBaseConfig();
 const [searchedPage, setSearchedPage] = useState('');
 const { pages } = usePagesContext();
 const {
  shareDictionary: {
   components: { navList },
   pages: pagesDic,
  },
 } = useShareDictionary();
 const { toggle: toggleNav } = useNavigationContext();

 const preveiwPages = filterPages({
  pages: pages,
  searchedName: searchedPage,
  dic: pagesDic,
 });

 return (
  <div className='grow overflow-hidden flex flex-col'>
   <div className='p-2 mb-1'>
    <div className='flex gap-2'>
     <Button
      size='icon'
      className='lg:hidden h-auto text-rose-800 bg-neutral-300'
      onClick={() => toggleNav()}
     >
      <TbLayoutSidebarRightCollapseFilled className='size-6' />
     </Button>
     <InputGroup className='grow rounded-lg bg-sky-900/50 border-none'>
      <InputGroupInput
       value={searchedPage}
       onChange={(e) => setSearchedPage(e.target.value)}
       type='search'
       placeholder={navList.search + ' ...'}
       className='placeholder:text-neutral-400 placeholder:font-light'
      />
      <InputGroupAddon align={'inline-end'}>
       <FaSearch className='size-4' />
      </InputGroupAddon>
     </InputGroup>
    </div>
   </div>
   <div className='grow overflow-auto overflow-x-hidden'>
    <Accordion
     type='multiple'
     className='w-full'
     defaultValue={Object.keys(preveiwPages)}
    >
     {Object.keys(preveiwPages).map((pageKey) => (
      <AccordionItem key={pageKey} value={pageKey} className='border-none'>
       <AccordionTrigger className='text-neutral-200 p-4 py-3 hover:no-underline [&>svg]:text-inherit [&>svg]:size-4'>
        <div className='flex gap-3 items-center'>
         {getPageIcon(pageKey as keyof Pages, {
          className: 'size-5',
         })}
         <span className='font-medium'>{pagesDic[pageKey as keyof Pages]}</span>
        </div>
       </AccordionTrigger>
       <AccordionContent className='pb-1'>
        <div className='grid relative'>
         <div className='z-1 absolute top-0 bottom-0 w-px bg-sky-200 start-12 translate-x-1/2'></div>
         {Object.values(preveiwPages[pageKey as keyof Pages] || {}).map(
          (page) => {
           const typedPage = page as Page;
           const { name } = typedPage;
           const isMarked = isQuickAccess(pageKey as Path, name);
           return (
            <Button
             data-active-menu={
              activePath === pageKey && activeMenu?.name === name
             }
             key={name}
             variant='ghost'
             className='text-neutral-200 group hover:bg-sky-900/50 hover:text-primary-foreground hover:dark:bg-sky-900/50 data-[active-menu=true]:bg-sky-900/50 hover:dark:text-foreground relative ps-16 pe-7 w-full h-auto justify-start text-start rounded-none'
             asChild
            >
             <Link
              href={`/${locale}/${pageKey as 'general-settings'}/${name as 'users'}`}
              onClick={() => toggleNav(false)}
             >
              <div className='absolute size-[0.3rem] rounded-full bg-sky-200 start-12 top-1/2 translate-x-1/2 -translate-y-1/2 z-1 group-data-[active-menu=true]:bg-orange-300'></div>
              <Highlighter
               className='font-medium text-[0.85rem] group-data-[active-menu=true]:text-orange-300'
               searchWords={[searchedPage]}
               textToHighlight={pagesDic[name]}
               autoEscape
              />
              <div className='absolute end-0'>
               <Button
                data-is-marked={isMarked}
                type='button'
                variant='ghost'
                size='icon'
                className='hover:bg-black/10 hover:text-sky-300 data-[is-marked="true"]:text-orange-300'
                onClick={(e) => {
                 e.preventDefault();
                 e.stopPropagation();
                 if (isMarked) {
                  removeQuickAccessItem(`${pageKey as Path}-${name}`);
                 } else {
                  addQuickAccessItem(pageKey as Path, typedPage);
                 }
                }}
               >
                <RiBookMarkedFill />
               </Button>
              </div>
             </Link>
            </Button>
           );
          },
         )}
        </div>
       </AccordionContent>
      </AccordionItem>
     ))}
    </Accordion>
   </div>
  </div>
 );
}
