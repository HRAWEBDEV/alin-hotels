import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import {
 type PagedData,
 type Pagination,
} from '@/app/[lang]/(app)/utils/apiBaseTypes';

const realPersonsBasePath = '/HotelsUnion/Person';

interface RealPerson {
 id: number;
 name: string | null;
 lastName: string | null;
 fatherName: string | null;
 genderID: number;
 genderName: string;
 birthDate: string | null;
 nationalityZoneID: number | null;
 educationGradeID: number | null;
 educationGradeName: string | null;
 educationFieldID: number | null;
 educationFieldName: string | null;
 nationalCode: string | null;
 mobileNo: string | null;
 email: string | null;
 postalCode: string | null;
 address: string | null;
 zoneNameID: number | null;
 zoneName: string | null;
 personFullName: string | null;
}

type SaveRealPersonPackage = Omit<
 RealPerson,
 | 'educationGradeName'
 | 'educationFieldName'
 | 'zoneName'
 | 'personFullName'
 | 'genderName'
>;

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

function saveRealPerson(newPerson: SaveRealPersonPackage) {
 return axios.post(realPersonsBasePath, newPerson);
}
function updateRealPerson(updatePerson: Partial<SaveRealPersonPackage>) {}

export type { RealPerson, SaveRealPersonPackage };
export {
 realPersonsBasePath,
 getAllRealPersons,
 getPagedRealPersons,
 saveRealPerson,
};
