import { z } from 'zod';
import { type RealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';

const defaultValues: Partial<RealPersonSchema> = {
 name: '',
 lastName: '',
 fatherName: '',
 zone: null,
 nationality: null,
 address: '',
 educationField: null,
 educationGrade: null,
 email: '',
 mobileNo: '',
 nationalCode: '',
 postalCode: '',
 gender: null,
 birthDate: null,
};

function createRealPersonSchema({}: { dic: RealPersonsDictionary }) {
 return z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  fatherName: z.string(),
  zone: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  gender: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  birthDate: z.date().nullable(),
  nationality: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  educationGrade: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  educationField: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  nationalCode: z.string(),
  mobileNo: z.string(),
  email: z.string(),
  postalCode: z.string(),
  address: z.string(),
 });
}

type RealPersonSchema = z.infer<ReturnType<typeof createRealPersonSchema>>;

export type { RealPersonSchema };
export { defaultValues, createRealPersonSchema };
