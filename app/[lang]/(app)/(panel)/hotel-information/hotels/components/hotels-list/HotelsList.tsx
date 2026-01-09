import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelsFitlers from './HotelsFilters';
import HotelsTable from './HotelsTable';

export default function PersonsList({ dic }: { dic: HotelsDictionary }) {
 return (
  <div className='relative grid lg:grid-cols-[13.5rem_1fr] grow overflow-hidden'>
   <HotelsFitlers dic={dic} />
   <HotelsTable dic={dic} />
  </div>
 );
}
