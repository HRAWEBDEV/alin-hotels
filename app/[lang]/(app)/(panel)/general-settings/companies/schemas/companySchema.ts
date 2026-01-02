import { z } from 'zod';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';

const defaultValues: Partial<CompanySchema> = {
 name: '',
 nationalCode: '',
 postalCode: '',
 registerNo: '',
 fax: '',
 tel1: '',
 tel2: '',
 tel3: '',
 nationality: null,
 address: '',
};

function createCompanySchema({}: { dic: CompaniesDictionary }) {
 return z.object({
  name: z.string(),
  nationalCode: z.string(),
  registerNo: z.string(),
  postalCode: z.string(),
  fax: z.string(),
  tel1: z.string(),
  tel2: z.string(),
  tel3: z.string(),
  address: z.string(),
  nationality: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
 });
}

type CompanySchema = z.infer<ReturnType<typeof createCompanySchema>>;

export type { CompanySchema };
export { defaultValues, createCompanySchema };
