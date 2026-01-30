import { type Dictionary } from '@/app/[lang]/(app)/utils/apiBaseTypes';
import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';

const hotelHotelRoomTypeBasePath = '/HotelsUnion/RoomTypeHotel';

interface HotelRoomType {
 id: number;
 nameID: number;
 hotelID: number;
 roomTypeID: number;
 roomCount: number;
 bedCount: number;
 name: string;
 hotelName: string;
 roomTypeName: string;
 dictionary: Dictionary | null;
}

type SaveHotelRoomTypePackage = {
 mainData: Omit<HotelRoomType, 'hotelName' | 'roomTypeName' | 'dictionay'>;
 dictionaryData: Pick<Dictionary, 'id' | 'defaultValue'> &
  Partial<Omit<Dictionary, 'id' | 'defaultValue'>>;
};

function getHotelRoomType({
 hotelRoomTypeID,
 signal,
}: {
 hotelRoomTypeID: number;
 signal: AbortSignal;
}) {
 return axios.get<HotelRoomType>(
  `${hotelHotelRoomTypeBasePath}/${hotelRoomTypeID}`,
  {
   signal,
  },
 );
}

function removeHotelRoomType(hotelRoomTypeID: number) {
 return axios.delete<HotelRoomType>(
  `${hotelHotelRoomTypeBasePath}/${hotelRoomTypeID}`,
 );
}

function getHotelRoomTypes({
 hotelID,
 signal,
}: {
 hotelID: number;
 signal: AbortSignal;
}) {
 return axios.get<HotelRoomType[]>(
  `${hotelHotelRoomTypeBasePath}/detail/${hotelID}`,
  {
   signal,
  },
 );
}

function saveHotelRoomType(roomType: SaveHotelRoomTypePackage) {
 return axios.post<number>(`${hotelHotelRoomTypeBasePath}`, roomType);
}

function updateHotelRoomType(roomType: SaveHotelRoomTypePackage) {
 return axios.put<number>(`${hotelHotelRoomTypeBasePath}`, roomType);
}

export type { HotelRoomType, SaveHotelRoomTypePackage };
export {
 hotelHotelRoomTypeBasePath,
 getHotelRoomType,
 getHotelRoomTypes,
 saveHotelRoomType,
 updateHotelRoomType,
 removeHotelRoomType,
};
