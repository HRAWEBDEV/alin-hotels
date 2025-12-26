import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import {
 type PagedData,
 type Pagination,
} from '@/app/[lang]/(app)/utils/apiBaseTypes';

const usersBasePath = '/HotelsUnion/User';

interface User {
 id: number;
}

type SaveUserPackage = unknown;

type GetUsersProps = {
 userName?: string;
 personName?: string;
 phoneNumber?: string;
 signal?: AbortSignal;
};

// get list
function generateGetUsersSearchParams(props: Omit<GetUsersProps, 'signal'>) {
 const searchParams = new URLSearchParams();
 Object.keys(props).forEach((key) => {
  const value = props[key as keyof typeof props];
  if (value) {
   searchParams.set(key, value);
  }
 });
 return searchParams;
}

function getAllUsersPersons({ signal, ...queryProps }: GetUsersProps) {
 const searchParams = generateGetUsersSearchParams(queryProps);
 return axios.get<User[]>(`${usersBasePath}?${searchParams.toString()}`, {
  signal,
 });
}

function getPagedUsers({
 signal,
 limit,
 offset,
 ...queryProps
}: GetUsersProps & Pagination) {
 const searchParams = generateGetUsersSearchParams(queryProps);
 searchParams.set('limit', limit.toString());
 searchParams.set('offset', offset.toString());
 return axios.get<PagedData<User[]>>(
  `${usersBasePath}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

function getUser({ userID, signal }: { signal: AbortSignal; userID: number }) {
 return axios.get<User>(`${usersBasePath}/${userID}`, {
  signal,
 });
}

function removeUser(userID: number) {
 return axios.delete(`${usersBasePath}/${userID}`);
}

function saveUser(newPerson: SaveUserPackage) {
 return axios.post<number>(usersBasePath, newPerson);
}

function updateUser(updatePerson: Partial<SaveUserPackage>) {
 return axios.put<number>(usersBasePath, updatePerson);
}

export type { User, SaveUserPackage, GetUsersProps };
export {
 usersBasePath,
 getAllUsersPersons,
 getPagedUsers,
 saveUser,
 removeUser,
 getUser,
 updateUser,
};
