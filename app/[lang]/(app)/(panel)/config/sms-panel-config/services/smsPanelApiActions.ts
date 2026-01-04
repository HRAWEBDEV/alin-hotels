import { axios } from '@/app/[lang]/(app)/utils/defaultAxios';
import { type Combo } from '@/app/[lang]/(app)/utils/apiBaseTypes';

const smsConfigBasePath = '/HotelsUnion/smsConfig';

interface InitialData {
 providers: Combo[];
 smsConfigTypes: Combo[];
}

interface SmsConfig {
 id: number;
 number: string;
 smsConfigTypeID: number;
 providerID: number;
 isDefault: boolean;
}

type SaveSmsConfigPackage = SmsConfig;

type GetSmsConfigProps = {
 smsConfigTypeID?: string;
 providerID?: string;
 signal?: AbortSignal;
};

function getInitialData({ signal }: { signal: AbortSignal }) {
 return axios.get<InitialData>(`${smsConfigBasePath}/InitData`, {
  signal,
 });
}

// get list
function generateGetSmsConfigSearchParams(
 props: Omit<GetSmsConfigProps, 'signal'>,
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

function getAllSmsConfig({ signal, ...queryProps }: GetSmsConfigProps) {
 const searchParams = generateGetSmsConfigSearchParams(queryProps);
 return axios.get<SmsConfig[]>(
  `${smsConfigBasePath}?${searchParams.toString()}`,
  {
   signal,
  },
 );
}

function getSmsConfig({
 smsConfigID,
 signal,
}: {
 signal: AbortSignal;
 smsConfigID: number;
}) {
 return axios.get<SmsConfig>(`${smsConfigBasePath}/${smsConfigID}`, {
  signal,
 });
}

function removeSmsConfig(smsConfigID: number) {
 return axios.delete(`${smsConfigBasePath}/${smsConfigID}`);
}

function saveSmsConfig(newConfig: SaveSmsConfigPackage) {
 return axios.post<number>(smsConfigBasePath, newConfig);
}

function updateSmsConfig(updateConfig: Partial<SaveSmsConfigPackage>) {
 return axios.put<number>(smsConfigBasePath, updateConfig);
}

export type { SmsConfig, InitialData, SaveSmsConfigPackage, GetSmsConfigProps };
export {
 smsConfigBasePath,
 getInitialData,
 getAllSmsConfig,
 saveSmsConfig,
 removeSmsConfig,
 getSmsConfig,
 updateSmsConfig,
};
