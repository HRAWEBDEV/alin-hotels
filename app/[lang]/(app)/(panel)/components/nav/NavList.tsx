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

export default function NavList() {
 const {
  shareDictionary: {
   components: { navList },
  },
 } = useShareDictionary();
 return (
  <div>
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
   <div>
    <Accordion
     type='single'
     collapsible
     className='w-full'
     defaultValue='item-1'
    >
     <AccordionItem value='item-1' className='border-none mb-2'>
      <AccordionTrigger className='p-4 py-2 hover:no-underline [&>svg]:text-inherit'>
       <div className='flex gap-3 items-center'>
        <IoSettings className='size-6' />
        <span className='font-normal'>اطلاعات اولیه</span>
       </div>
      </AccordionTrigger>
      <AccordionContent className='relative text-balance px-12 py-0'>
       <div className='absolute start-[28px] h-full w-px bg-background'></div>
       <span className='text-sm'>تعریف هتل</span>
      </AccordionContent>
     </AccordionItem>
    </Accordion>
   </div>
  </div>
 );
}
