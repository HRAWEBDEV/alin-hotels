'use client';
import {
 InputGroup,
 InputGroupInput,
 InputGroupAddon,
} from '@/components/ui/input-group';
import { FaSearch } from 'react-icons/fa';

export default function NavList() {
 return (
  <div>
   <div className='p-2'>
    <InputGroup className='rounded-full bg-sky-900 border-none'>
     <InputGroupInput
      type='search'
      placeholder='جستجو...'
      className='placeholder:text-neutral-400'
     />
     <InputGroupAddon align={'inline-end'}>
      <FaSearch />
     </InputGroupAddon>
    </InputGroup>
   </div>
  </div>
 );
}
