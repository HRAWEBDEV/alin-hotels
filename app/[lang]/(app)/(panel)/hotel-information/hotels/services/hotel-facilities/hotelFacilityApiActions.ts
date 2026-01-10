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
 quantity: number;
 capacity: number;
 scale: string;
 comment: string;
}

type SaveHotelFacilityPackage = Omit<HotelFacility, 'facilityName'>;

function getInitialData({ signal }: { signal: AbortSignal }) {
 return axios.get<InitialData>(`${hotelFacilitiesBasePath}/InitData`, {
  signal,
 });
}

function getHotelFacility(hotelFacilityID: number) {
 return axios.get<HotelFacility>(
  `${hotelFacilitiesBasePath}/${hotelFacilityID}`,
 );
}

function removeHotelFacility(hotelFacilityID: number) {
 return axios.delete<HotelFacility>(
  `${hotelFacilitiesBasePath}/${hotelFacilityID}`,
 );
}

function getHotelFacilities(hotelID: number) {
 return axios.get<HotelFacility[]>(
  `${hotelFacilitiesBasePath}/detail/${hotelID}`,
 );
}

function saveHotelFacility(facility: HotelFacility) {
 return axios.post<number>(`${hotelFacilitiesBasePath}`, {
  facility,
 });
}

function updateHotelFacility(facility: HotelFacility) {
 return axios.put<number>(`${hotelFacilitiesBasePath}`, {
  facility,
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
