import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';

const hotelHotelOperatorBasePath = '/HotelsUnion/hotelOperator';

interface HotelOperator {
 id: number;
 hotelID: number;
 companyID: number | null;
 personID: number | null;
 percentage: number;
 fromDateTimeOffset: string;
 endDateTimeOffset: string;
}

type SaveHotelOperatorPackage = Omit<HotelOperator, ''>;

function getHotelOperator({
 hotelOperatorID,
 signal,
}: {
 hotelOperatorID: number;
 signal: AbortSignal;
}) {
 return axios.get<HotelOperator>(
  `${hotelHotelOperatorBasePath}/${hotelOperatorID}`,
  {
   signal,
  },
 );
}

function removeHotelOperator(hotelOperatorID: number) {
 return axios.delete<HotelOperator>(
  `${hotelHotelOperatorBasePath}/${hotelOperatorID}`,
 );
}

function getHotelOperators({
 hotelID,
 signal,
}: {
 hotelID: number;
 signal: AbortSignal;
}) {
 return axios.get<HotelOperator[]>(
  `${hotelHotelOperatorBasePath}/detail/${hotelID}`,
  {
   signal,
  },
 );
}

function saveHotelOperator(operator: SaveHotelOperatorPackage) {
 return axios.post<number>(`${hotelHotelOperatorBasePath}`, operator);
}

function updateHotelOperator(operator: SaveHotelOperatorPackage) {
 return axios.put<number>(`${hotelHotelOperatorBasePath}`, operator);
}

export type { HotelOperator, SaveHotelOperatorPackage };
export {
 hotelHotelOperatorBasePath,
 getHotelOperator,
 getHotelOperators,
 saveHotelOperator,
 updateHotelOperator,
 removeHotelOperator,
};
