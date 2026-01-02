import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import {
 type PagedData,
 type Pagination,
 type Combo,
} from '@/app/[lang]/(app)/utils/apiBaseTypes';

const companyBasePath = '/HotelsUnion/Company';

type InitialData = {
 nationalityZones: Combo[];
};

interface Company {
 id: number;
 name: string;
 nameID: number;
 registerNo: string | null;
 nationalCode: string | null;
 postalCode: string | null;
 nationalityZoneID: number | null;
 nationalityZoneName: string | null;
 tel1: string | null;
 tel2: string | null;
 tel3: string | null;
 fax: string | null;
 address: string | null;
 createDateTimeOffset: string | null;
}

type SaveCompanyPackage = Omit<
 Company,
 'nameID' | 'nationalityZoneName' | 'createDateTimeOffset'
>;

type GetCompanyProps = {
 nationalityZoneID?: string;
 nationalCode?: string;
 name?: string;
 registerNo?: string;
 signal?: AbortSignal;
};

function getInitialData({ signal }: { signal: AbortSignal }) {
 return axios.get<InitialData>(`${companyBasePath}/InitData`, {
  signal,
 });
}

// get list
function generateGetCompaniesSearchParams(
 props: Omit<GetCompanyProps, 'signal'>,
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

function getAllCompanies({ signal, ...queryProps }: GetCompanyProps) {
 const searchParams = generateGetCompaniesSearchParams(queryProps);
 return axios.get<Company[]>(`${companyBasePath}?${searchParams.toString()}`, {
  signal,
 });
}

function getPagedCompanies({
 signal,
 limit,
 offset,
 ...queryProps
}: GetCompanyProps & Pagination) {
 const searchParams = generateGetCompaniesSearchParams(queryProps);
 searchParams.set('limit', limit.toString());
 searchParams.set('offset', offset.toString());
 return axios.get<PagedData<Company[]>>(
  `${companyBasePath}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

function getCompany({
 personID,
 signal,
}: {
 signal: AbortSignal;
 personID: number;
}) {
 return axios.get<Company>(`${companyBasePath}/${personID}`, {
  signal,
 });
}

function removeCompany(personID: number) {
 return axios.delete(`${companyBasePath}/${personID}`);
}

function saveCompany(newPerson: SaveCompanyPackage) {
 return axios.post<number>(companyBasePath, newPerson);
}

function updateCompany(updatePerson: Partial<SaveCompanyPackage>) {
 return axios.put<number>(companyBasePath, updatePerson);
}

export type { Company, InitialData, SaveCompanyPackage, GetCompanyProps };
export {
 companyBasePath,
 getInitialData,
 getAllCompanies,
 getPagedCompanies,
 saveCompany,
 removeCompany,
 getCompany,
 updateCompany,
};
