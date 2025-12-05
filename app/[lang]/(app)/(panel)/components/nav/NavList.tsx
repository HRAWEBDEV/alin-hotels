'use client';
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

export default function NavList() {
 const { pagesList } = usePagesContext();
 const {
  shareDictionary: {
   components: { navList },
   pages: pagesDic,
  },
 } = useShareDictionary();
 const { toggle: toggleNav } = useNavigationContext();
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
     type='single'
     collapsible
     className='w-full'
     defaultValue='item-1'
    >
     {pagesList.map((page) => (
      <AccordionItem key={page.name} value={page.name} className='border-none'>
       <AccordionTrigger className='p-4 py-2 hover:no-underline [&>svg]:text-inherit [&>svg]:size-4'>
        <div className='flex gap-3 items-center'>
         {getPageIcon('generalSetting', {
          className: 'size-5',
         })}
         <span className='font-normal'>{pagesDic[page.name]}</span>
        </div>
       </AccordionTrigger>
       <AccordionContent className='pb-1'>
        <div className='grid relative'>
         <div className='z-1 absolute top-0 bottom-0 w-px bg-primary-foreground dark:bg-foreground start-7 translate-x-1/2'></div>
         {page.subPages?.map((subPage) => (
          <Button
           key={subPage.name}
           variant='ghost'
           className='group hover:bg-sky-900/50 hover:text-primary-foreground hover:dark:bg-sky-900/50 hover:dark:text-foreground relative ps-14 w-full h-auto justify-start text-start rounded-none'
           asChild
          >
           <Link href='#' onClick={() => toggleNav(false)}>
            <div className='absolute size-[0.4rem] rounded-full bg-primary-foreground dark:bg-foreground start-7 top-1/2 translate-x-1/2 -translate-y-1/2'></div>
            <span></span>
           </Link>
          </Button>
         ))}
        </div>
       </AccordionContent>
      </AccordionItem>
     ))}
    </Accordion>
   </div>
  </div>
 );
}
