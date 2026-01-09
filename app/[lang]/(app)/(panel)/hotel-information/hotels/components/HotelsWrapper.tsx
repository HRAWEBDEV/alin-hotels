import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelsConfigProvider from '../services/HotelsConfigProvider';
import HotelsTab from './HotelsTabs';
import HotelsContent from './HotelsContent';
import { type WrapperTypes } from '../utils/wrapperTypes';

export default function HotelsWrapper({
 dic,
 wrapperType = {
  mode: 'page',
 },
}: {
 dic: HotelsDictionary;
 wrapperType?: WrapperTypes;
}) {
 return (
  <div
   data-type={wrapperType.mode}
   className='data-[type="find"]:grow h-full flex flex-col data-[type="find"]:overflow-auto'
  >
   <HotelsConfigProvider dic={dic} {...wrapperType}>
    <HotelsTab dic={dic} />
    <HotelsContent dic={dic} />
   </HotelsConfigProvider>
  </div>
 );
}
