import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import { Dictionary } from '@/app/[lang]/(app)/utils/apiBaseTypes';

const roomTypesBasePath = '/HotelsUnion/RoomType';

type RoomType = {
 id: number;
 name: string;
 dictionary: Dictionary | null;
};

type SaveRoomTypePackage = Omit<RoomType, ''>;

type GetRoomTypeProps = {
 signal?: AbortSignal;
};

// get list
function generateGetRoomTypesSearchParams(
 props: Omit<GetRoomTypeProps, 'signal'>,
) {
 const searchParams = new URLSearchParams();
 Object.keys(props).forEach((key) => {
  const value = props[key as keyof typeof props];
  if (value) {
   searchParams.set(key, value);
  }
 });
 return searchParams;
}

function getAllRoomTypes({ signal, ...queryProps }: GetRoomTypeProps) {
 const searchParams = generateGetRoomTypesSearchParams(queryProps);
 return axios.get<RoomType[]>(
  `${roomTypesBasePath}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

function getRoomType({
 roomTypeID,
 signal,
}: {
 signal: AbortSignal;
 roomTypeID: number;
}) {
 return axios.get<RoomType>(`${roomTypesBasePath}/${roomTypeID}`, {
  signal,
 });
}

function removeRoomType(roomTypeID: number) {
 return axios.delete(`${roomTypesBasePath}/${roomTypeID}`);
}

function saveRoomType(newRoomType: SaveRoomTypePackage) {
 return axios.post<number>(roomTypesBasePath, newRoomType);
}

function updateRoomType(roomType: Partial<SaveRoomTypePackage>) {
 return axios.put<number>(roomTypesBasePath, roomType);
}

export type { RoomType, SaveRoomTypePackage, GetRoomTypeProps };
export {
 roomTypesBasePath,
 getAllRoomTypes,
 saveRoomType,
 removeRoomType,
 getRoomType,
 updateRoomType,
};
