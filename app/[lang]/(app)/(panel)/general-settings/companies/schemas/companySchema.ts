import { z } from 'zod';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';

const defaultValues: Partial<CompanySchema> = {};

function createCompanySchema({}: { dic: CompaniesDictionary }) {
 return z.object({
  name: z.string(),
 });
}

type CompanySchema = z.infer<ReturnType<typeof createCompanySchema>>;

export type { CompanySchema };
export { defaultValues, createCompanySchema };
