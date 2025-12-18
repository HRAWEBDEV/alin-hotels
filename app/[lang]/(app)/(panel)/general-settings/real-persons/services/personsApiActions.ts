import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import {
 type PagedData,
 type Pagination,
} from '@/app/[lang]/(app)/utils/apiBaseTypes';

const realPersonsBasePath = '/HotelsUnion/Person';

interface RealPerson {
 id: number;
 name: string;
 lastName: string;
 fatherName: string;
 genderID: number;
 genderName: string;
 birthDate: string | null;
 nationalityZoneID: number;
 educationGradeID: number;
 educationGradeName: string;
 educationFieldID: number;
 educationFieldName: string;
 nationalCode: string;
 mobileNo: string;
 email: string;
 postalCode: string;
 address: string;
 zoneNameID: number;
 zoneName: string;
 personFullName: string;
}

type GetRealPersonProps = {
 name?: string;
 fatherName?: string;
 genderID?: string;
 nationalityZoneID?: string;
 mobileNo?: string;
 nationalCode?: string;
 email?: string;
 signal?: AbortSignal;
};

// get list
function generateGetRealPersonsSearchParams(
 props: Omit<GetRealPersonProps, 'signal'>,
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

function getAllRealPersons({ signal, ...queryProps }: GetRealPersonProps) {
 const searchParams = generateGetRealPersonsSearchParams(queryProps);
 return axios.get<RealPerson[]>(
  `${realPersonsBasePath}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

function getPagedRealPersons({
 signal,
 limit,
 offset,
 ...queryProps
}: GetRealPersonProps & Pagination) {
 const searchParams = generateGetRealPersonsSearchParams(queryProps);
 searchParams.set('limit', limit.toString());
 searchParams.set('offset', offset.toString());
 return axios.get<PagedData<RealPerson[]>>(
  `${realPersonsBasePath}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

export type { RealPerson };
export { realPersonsBasePath, getAllRealPersons, getPagedRealPersons };
