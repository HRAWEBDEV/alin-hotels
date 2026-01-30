import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';

const hotelHotelRoomTypeBasePath = '/HotelsUnion/RoomTypeHotel';

interface HotelRoomType {
 id: number;
}

type SaveHotelRoomTypePackage = Omit<HotelRoomType, ''>;

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
