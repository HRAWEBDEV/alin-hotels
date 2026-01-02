import { type Dictionary } from '@/app/[lang]/(app)/utils/apiBaseTypes';
import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';

const ownersBasePath = '/HotelsUnion/Owner';

type Owner = {
 id: number;
 nameID: number;
 name: string;
};

type SaveOwnerPackage = Pick<Dictionary, 'id' | 'defaultValue'> &
 Partial<Omit<Dictionary, 'id' | 'defaultValue'>>;

type GetOwnerProps = {
 signal?: AbortSignal;
};

// get list
function generateGetRealPersonsSearchParams(
 props: Omit<GetOwnerProps, 'signal'>,
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

function getAllOwners({ signal, ...queryProps }: GetOwnerProps) {
 const searchParams = generateGetRealPersonsSearchParams(queryProps);
 return axios.get<Owner[]>(`${ownersBasePath}?${searchParams.toString()}`, {
  signal,
 });
}

function getOwner({
 ownerID,
 signal,
}: {
 signal: AbortSignal;
 ownerID: number;
}) {
 return axios.get<Owner>(`${ownersBasePath}/${ownerID}`, {
  signal,
 });
}

function removeOwner(ownerID: number) {
 return axios.delete(`${ownersBasePath}/${ownerID}`);
}

function saveOwner(newOwner: SaveOwnerPackage) {
 return axios.post<number>(ownersBasePath, newOwner);
}

function updateOwner(ownerID: number, updateOwner: Partial<SaveOwnerPackage>) {
 return axios.put<number>(`${ownersBasePath}?ownerID=${ownerID}`, updateOwner);
}

export type { Owner, SaveOwnerPackage, GetOwnerProps };
export {
 ownersBasePath,
 getAllOwners,
 saveOwner,
 removeOwner,
 getOwner,
 updateOwner,
};
