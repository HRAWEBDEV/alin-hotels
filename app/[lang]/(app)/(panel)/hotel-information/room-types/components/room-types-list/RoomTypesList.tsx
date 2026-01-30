import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';
import RoomTypesFilters from './RoomTypesFilters';
import RoomTypesTable from './RoomTypesTable';

export default function RoomTypesList({ dic }: { dic: RoomTypesDictionary }) {
 return (
  <div className='relative grid lg:grid-cols-[13.5rem_1fr] grow overflow-hidden'>
   <RoomTypesFilters dic={dic} />
   <RoomTypesTable dic={dic} />
  </div>
 );
}
