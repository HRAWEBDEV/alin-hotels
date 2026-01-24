import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelEmployeeSchema> = {
 name: '',
 job: null,
 fromDate: null,
 endDate: null,
};

function createHotelEmployeeSchema({}: { dic: HotelsDictionary }) {
 return z
  .object({
   name: z.string(),
   job: z
    .object({
     key: z.string(),
     value: z.string(),
    })
    .nullable(),
   fromDate: z.date().nullable(),
   endDate: z.date().nullable(),
  })
  .refine(({ job }) => !!job, {
   path: ['job'],
  })
  .refine(({ fromDate }) => !!fromDate, {
   path: ['fromDate'],
  })
  .refine(({ endDate }) => !!endDate, {
   path: ['endDate'],
  });
}

type HotelEmployeeSchema = z.infer<
 ReturnType<typeof createHotelEmployeeSchema>
>;

export type { HotelEmployeeSchema };
export { defaultValues, createHotelEmployeeSchema };
