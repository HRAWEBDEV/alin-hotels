import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelManagersSchema> = {
 name: '',
 job: null,
 fromDate: null,
 endDate: null,
};

function createHotelManagersSchema({}: { dic: HotelsDictionary }) {
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
  })
  .refine(
   ({ fromDate, endDate }) =>
    !!fromDate && !!endDate && endDate.getTime() >= fromDate.getTime(),
   {
    path: ['endDate'],
   },
  );
}

type HotelManagersSchema = z.infer<
 ReturnType<typeof createHotelManagersSchema>
>;

export type { HotelManagersSchema };
export { defaultValues, createHotelManagersSchema };
