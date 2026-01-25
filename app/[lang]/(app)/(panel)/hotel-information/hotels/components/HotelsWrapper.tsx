import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelsConfigProvider from '../services/HotelsConfigProvider';
import HotelsTab from './HotelsTabs';
import HotelsContent from './HotelsContent';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import { type WrapperTypes } from '../utils/wrapperTypes';

export default function HotelsWrapper({
 dic,
 realPersonDic,
 companyDic,
 wrapperType = {
  mode: 'page',
 },
}: {
 dic: HotelsDictionary;
 realPersonDic: RealPersonsDictionary;
 companyDic: CompaniesDictionary;
 wrapperType?: WrapperTypes;
}) {
 return (
  <div
   data-type={wrapperType.mode}
   className='data-[type="find"]:grow h-full flex flex-col data-[type="find"]:overflow-auto'
  >
   <HotelsConfigProvider dic={dic} {...wrapperType}>
    <HotelsTab dic={dic} />
    <HotelsContent
     dic={dic}
     realPersonDic={realPersonDic}
     companyDic={companyDic}
    />
   </HotelsConfigProvider>
  </div>
 );
}
