import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import { type Combo } from '@/app/[lang]/(app)/utils/apiBaseTypes';

const hotelHotelEmployeeBasePath = '/HotelsUnion/hotelEmployee';

interface InitialData {
 jobTitles: Combo[];
}

interface HotelEmployee {
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

type SaveHotelEmployeePackage = Omit<
 HotelEmployee,
 'hotelName' | 'jobTitleName' | 'personFullName'
>;

function getInitialData({ signal }: { signal: AbortSignal }) {
 return axios.get<InitialData>(`${hotelHotelEmployeeBasePath}/InitData`, {
  signal,
 });
}

function getHotelEmployee({
 hotelEmployeeID,
 signal,
}: {
 hotelEmployeeID: number;
 signal: AbortSignal;
}) {
 return axios.get<HotelEmployee>(
  `${hotelHotelEmployeeBasePath}/${hotelEmployeeID}`,
  {
   signal,
  },
 );
}

function removeHotelEmployee(hotelEmployeeID: number) {
 return axios.delete<HotelEmployee>(
  `${hotelHotelEmployeeBasePath}/${hotelEmployeeID}`,
 );
}

function getHotelEmployees({
 hotelID,
 signal,
}: {
 hotelID: number;
 signal: AbortSignal;
}) {
 return axios.get<HotelEmployee[]>(
  `${hotelHotelEmployeeBasePath}/detail/${hotelID}`,
  {
   signal,
  },
 );
}

function saveHotelEmployee(employee: SaveHotelEmployeePackage) {
 return axios.post<number>(`${hotelHotelEmployeeBasePath}`, employee);
}

function updateHotelEmployee(employee: SaveHotelEmployeePackage) {
 return axios.put<number>(`${hotelHotelEmployeeBasePath}`, employee);
}

export type { InitialData, HotelEmployee, SaveHotelEmployeePackage };
export {
 hotelHotelEmployeeBasePath,
 getInitialData,
 getHotelEmployee,
 getHotelEmployees,
 saveHotelEmployee,
 updateHotelEmployee,
 removeHotelEmployee,
};
