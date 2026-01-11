import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelManagersSchema> = {
 job: null,
 fromDate: null,
 endDate: null,
};

function createHotelManagersSchema({}: { dic: HotelsDictionary }) {
 return z.object({
  job: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  fromDate: z.date().nullable(),
  endDate: z.date().nullable(),
 });
}

type HotelManagersSchema = z.infer<
 ReturnType<typeof createHotelManagersSchema>
>;

export type { HotelManagersSchema };
export { defaultValues, createHotelManagersSchema };
