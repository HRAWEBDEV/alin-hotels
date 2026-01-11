import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import { type Combo } from '@/app/[lang]/(app)/utils/apiBaseTypes';

const hotelFacilitiesBasePath = '/HotelsUnion/facilityHotel';

interface InitialData {
 facilities: Combo[];
}

interface HotelFacility {
 id: number;
 hotelID: number;
 facilityID: number;
 facilityName: string;
 quantity: number | null;
 capacity: number | null;
 scale: string | null;
 comment: string | null;
}

type SaveHotelFacilityPackage = Omit<HotelFacility, 'facilityName'>;

function getInitialData({ signal }: { signal: AbortSignal }) {
 return axios.get<InitialData>(`${hotelFacilitiesBasePath}/InitData`, {
  signal,
 });
}

function getHotelFacility({
 hotelFacilityID,
 signal,
}: {
 hotelFacilityID: number;
 signal: AbortSignal;
}) {
 return axios.get<HotelFacility>(
  `${hotelFacilitiesBasePath}/${hotelFacilityID}`,
  {
   signal,
  },
 );
}

function removeHotelFacility(hotelFacilityID: number) {
 return axios.delete<HotelFacility>(
  `${hotelFacilitiesBasePath}/${hotelFacilityID}`,
 );
}

function getHotelFacilities({
 hotelID,
 signal,
}: {
 hotelID: number;
 signal: AbortSignal;
}) {
 return axios.get<HotelFacility[]>(
  `${hotelFacilitiesBasePath}/detail/${hotelID}`,
  {
   signal,
  },
 );
}

function saveHotelFacility(facility: SaveHotelFacilityPackage) {
 return axios.post<number>(`${hotelFacilitiesBasePath}`, {
  ...facility,
 });
}

function updateHotelFacility(facility: SaveHotelFacilityPackage) {
 return axios.put<number>(`${hotelFacilitiesBasePath}`, {
  ...facility,
 });
}

export type { InitialData, HotelFacility, SaveHotelFacilityPackage };
export {
 hotelFacilitiesBasePath,
 getInitialData,
 getHotelFacilities,
 saveHotelFacility,
 updateHotelFacility,
 getHotelFacility,
 removeHotelFacility,
};
