import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import { type Combo } from '@/app/[lang]/(app)/utils/apiBaseTypes';

const hotelHotelMangerBasePath = '/HotelsUnion/hotelManager';

interface InitialData {
 jobTitles: Combo[];
}

interface HotelManager {
 id: number;
 hotelID: number;
 personID: number;
 jobTitleID: number;
 fromDateTimeOffset: string;
 endDateTimeOffset: string;
 hotelName: string;
 jobTitleName: string;
 personFullName: string;
}

type SaveHotelManagerPackage = Omit<
 HotelManager,
 'hotelName' | 'jobTitleName' | 'personFullName'
>;

function getInitialData({ signal }: { signal: AbortSignal }) {
 return axios.get<InitialData>(`${hotelHotelMangerBasePath}/InitData`, {
  signal,
 });
}

function getHotelManger({
 hotelManagerID,
 signal,
}: {
 hotelManagerID: number;
 signal: AbortSignal;
}) {
 return axios.get<HotelManager>(
  `${hotelHotelMangerBasePath}/${hotelManagerID}`,
  {
   signal,
  },
 );
}

function removeHotelManager(hotelManagerID: number) {
 return axios.delete<HotelManager>(
  `${hotelHotelMangerBasePath}/${hotelManagerID}`,
 );
}

function getHotelManagers({
 hotelID,
 signal,
}: {
 hotelID: number;
 signal: AbortSignal;
}) {
 return axios.get<HotelManager[]>(
  `${hotelHotelMangerBasePath}/detail/${hotelID}`,
  {
   signal,
  },
 );
}

function saveHotelManager(manager: SaveHotelManagerPackage) {
 return axios.post<number>(`${hotelHotelMangerBasePath}`, manager);
}

function updateHotelManager(manager: SaveHotelManagerPackage) {
 return axios.put<number>(`${hotelHotelMangerBasePath}`, manager);
}

export type { InitialData, HotelManager, SaveHotelManagerPackage };
export {
 hotelHotelMangerBasePath,
 getInitialData,
 getHotelManger,
 getHotelManagers,
 saveHotelManager,
 updateHotelManager,
 removeHotelManager,
};
