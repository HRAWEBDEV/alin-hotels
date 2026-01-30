'use client';
import { useShareDictionary } from '../../services/share-dictionary/shareDictionaryContext';

export default function NotFound() {
 const {
  shareDictionary: {
   components: { notFoundPage },
  },
 } = useShareDictionary();
 return (
  <div className='h-full flex flex-col items-center justify-center'>
   <div className='flex flex-col items-center text-center'>
    <h1 className='text-9xl text-primary font-medium'>404</h1>
    <p className='text-lg text-primary font-medium'>{notFoundPage.title}.</p>
   </div>
  </div>
 );
}
