'use client';
import {
 InputGroup,
 InputGroupInput,
 InputGroupAddon,
} from '@/components/ui/input-group';
import { FaSearch } from 'react-icons/fa';
import { useShareDictionary } from '../../../services/share-dictionary/shareDictionaryContext';

export default function NavList() {
 const {
  shareDictionary: {
   components: { navList },
  },
 } = useShareDictionary();
 return (
  <div>
   <div className='p-2'>
    <InputGroup className='rounded-full bg-sky-900 border-none'>
     <InputGroupInput
      type='search'
      placeholder={navList.search + ' ...'}
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
