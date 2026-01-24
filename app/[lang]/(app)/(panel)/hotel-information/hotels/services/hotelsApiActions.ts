import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import {
 type PagedData,
 type Pagination,
 type Combo,
 type Dictionary,
} from '@/app/[lang]/(app)/utils/apiBaseTypes';

const hotelBasePath = '/HotelsUnion/Hotel';

type InitialData = {
 stateZones: Combo[];
 hotelOwnershipTypes: Combo[];
 hotelOperators: Combo[];
 hotelTypes: Combo[];
 gradeTypes: Combo[];
 degreeTypes: Combo[];
 locationTypes: Combo[];
 hotelThemes: Combo[];
};

interface Hotel {
 id: number;
 ownerID: number;
 ownerName: string;
 nameID: number;
 name: string;
 stateZoneID: number;
 stateZoneName: string;
 cityZoneID: number;
 cityZoneName: string;
 hotelOwnershipTypeID: number;
 hotelOwnershipTypeName: string;
 hotelOperatorTypeID: number;
 operatorTypeName: string;
 hotelTypeID: number;
 hotelTypeName: string;
 gradeTypeID: number;
 gradeTypeName: string;
 degreeTypeID: number;
 degreeTypeName: string;
 locationTypeID: number;
 locationTypeName: string;
 hotelThemeID: number;
 hotelThemeName: string;
 landArea: number | null;
 buildingArea: number | null;
 floorCount: number | null;
 towerCount: number | null;
 roomCount: number | null;
 bedCount: number | null;
 maxExtraBedCount: number | null;
 address: string | null;
 tel1: string | null;
 tel2: string | null;
 tel3: string | null;
 fax: string | null;
 email: string | null;
 postalCode: string | null;
 webSiteUrl: string | null;
 longitude: string | null;
 latitude: string | null;
 disabled: boolean;
}

type SaveHotelPackage = {
 mainData: Omit<
  Hotel,
  | 'ownerName'
  | 'stateZoneName'
  | 'cityZoneName'
  | 'hotelOwnershipTypeName'
  | 'operatorTypeName'
  | 'hotelTypeName'
  | 'gradeTypeName'
  | 'degreeTypeName'
  | 'locationTypeName'
  | 'hotelThemeName'
  | 'disabled'
 >;
 dictionaryData: Pick<Dictionary, 'id' | 'defaultValue'> &
  Partial<Omit<Dictionary, 'id' | 'defaultValue'>>;
};

type GetHotelProps = {
 stateZoneID?: string;
 cityZoneID?: string;
 hotelOwnershipTypeID?: string;
 hotelOperatorTypeID?: string;
 hotelTypeID?: string;
 gradeTypeID?: string;
 degreeTypeID?: string;
 locationTypeID?: string;
 hotelThemeID?: string;
 signal?: AbortSignal;
};

function getInitialData({ signal }: { signal: AbortSignal }) {
 return axios.get<InitialData>(`${hotelBasePath}/InitData`, {
  signal,
 });
}

// get list
function generateGetHotelsSearchParams(props: Omit<GetHotelProps, 'signal'>) {
 const searchParams = new URLSearchParams();
 Object.keys(props).forEach((key) => {
  const value = props[key as keyof typeof props];
  if (value) {
   searchParams.set(key, value);
  }
 });
 return searchParams;
}

function getAllHotels({ signal, ...queryProps }: GetHotelProps) {
 const searchParams = generateGetHotelsSearchParams(queryProps);
 return axios.get<Hotel[]>(`${hotelBasePath}?${searchParams.toString()}`, {
  signal,
 });
}

function getPagedHotels({
 signal,
 limit,
 offset,
 ...queryProps
}: GetHotelProps & Pagination) {
 const searchParams = generateGetHotelsSearchParams(queryProps);
 searchParams.set('limit', limit.toString());
 searchParams.set('offset', offset.toString());
 return axios.get<PagedData<Hotel>>(
  `${hotelBasePath}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

function getHotel({
 hotelID,
 signal,
}: {
 signal: AbortSignal;
 hotelID: number;
}) {
 return axios.get<Hotel>(`${hotelBasePath}/${hotelID}`, {
  signal,
 });
}

function removeHotel(hotelID: number) {
 return axios.delete(`${hotelBasePath}/${hotelID}`);
}

function saveHotel(newHotel: SaveHotelPackage) {
 return axios.post<number>(hotelBasePath, newHotel);
}

function updateHotel(updateHotel: Partial<SaveHotelPackage>) {
 return axios.put<number>(hotelBasePath, updateHotel);
}

export type { Hotel, InitialData, SaveHotelPackage, GetHotelProps };
export {
 hotelBasePath,
 getInitialData,
 getAllHotels,
 getPagedHotels,
 saveHotel,
 removeHotel,
 getHotel,
 updateHotel,
};
