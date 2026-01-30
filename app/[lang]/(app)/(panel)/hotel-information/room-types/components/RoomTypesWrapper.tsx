import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';
import RoomTypesConfigProvider from '../services/RoomTypesConfigProvider';
import RoomTypesTabs from './RoomTypesTabs';
import RoomTypesContent from './RoomTypesContent';
import { type WrapperTypes } from '../utils/wrapperTypes';

export default function RoomTypesWrapper({
 dic,
 wrapperType = {
  mode: 'page',
 },
}: {
 dic: RoomTypesDictionary;
 wrapperType?: WrapperTypes;
}) {
 return (
  <div
   data-type={wrapperType.mode}
   className='data-[type="find"]:grow h-full flex flex-col data-[type="find"]:overflow-auto'
  >
   <RoomTypesConfigProvider dic={dic} {...wrapperType}>
    <RoomTypesTabs dic={dic} />
    <RoomTypesContent dic={dic} />
   </RoomTypesConfigProvider>
  </div>
 );
}
