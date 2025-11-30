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
import { FaHotel } from 'react-icons/fa6';
import { IoSettings } from 'react-icons/io5';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NavList() {
 const {
  shareDictionary: {
   components: { navList },
  },
 } = useShareDictionary();
 return (
  <div className='grow overflow-hidden flex flex-col'>
   <div className='p-2 mb-1'>
    <InputGroup className='rounded-lg bg-sky-900/50 border-none'>
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
   <div className='grow overflow-auto overflow-x-hidden'>
    <Accordion
     type='single'
     collapsible
     className='w-full'
     defaultValue='item-1'
    >
     {Array.from({ length: 4 }, (_, i) => i).map((i) => (
      <AccordionItem key={i} value='item-1' className='border-none'>
       <AccordionTrigger className='p-4 py-2 hover:no-underline [&>svg]:text-inherit'>
        <div className='flex gap-3 items-center'>
         <IoSettings className='size-6' />
         <span className='font-normal'>اطلاعات اولیه</span>
        </div>
       </AccordionTrigger>
       <AccordionContent className='pb-1'>
        <div className='grid relative'>
         <div className='z-1 absolute top-0 bottom-0 w-px bg-primary-foreground dark:bg-foreground start-7 translate-x-1/2'></div>
         {Array.from({ length: 4 }, (_, i) => i).map((i) => (
          <Button
           key={i}
           variant='ghost'
           className='group hover:bg-sky-900/50 hover:text-primary-foreground hover:dark:bg-sky-900/50 hover:dark:text-foreground relative ps-14 w-full h-auto justify-start text-start rounded-none'
           asChild
          >
           <Link href='#'>
            <div className='absolute size-[0.4rem] rounded-full bg-primary-foreground dark:bg-foreground start-7 top-1/2 translate-x-1/2 -translate-y-1/2'></div>
            <span>هتل</span>
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
