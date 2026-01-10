'use client';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { Button } from '@/components/ui/button';
import { FieldLabel, Field, FieldGroup } from '@/components/ui/field';
import { Spinner } from '@/components/ui/spinner';
import { type HotelsConfig } from '../../services/hotelsConfigContext';
import {
 hotelFacilitiesBasePath,
 getInitialData,
} from '../../services/hotel-facilities/hotelFacilityApiActions';
import { useQuery } from '@tanstack/react-query';

export default function HotelFacilities({
 dic,
 hotelID,
 initialData,
 onCancel,
 onSuccess,
}: {
 dic: HotelsDictionary;
 hotelID: number;
 initialData: HotelsConfig['initialData'];
 onSuccess?: HotelsConfig['hotels']['onNewHotelSuccess'];
 onCancel?: HotelsConfig['hotels']['onCancelNewHotel'];
}) {
 // init data
 const {
  data: facilitiesInitialData,
  isLoading: facilitiesInitialDataLoading,
  isError: facilitiesInitialDataError,
  isSuccess: facilitiesInitialDataSuccess,
 } = useQuery({
  staleTime: 'static',
  queryKey: [hotelFacilitiesBasePath, 'initial-data'],
  async queryFn({ signal }) {
   const res = await getInitialData({ signal });
   return res.data;
  },
 });

 return <div className='w-[min(40rem,100%)] mx-auto'></div>;
}
