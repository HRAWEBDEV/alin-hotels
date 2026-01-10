import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelFacilitiesSchema> = {
 facility: null,
 name: '',
 quantity: '',
 capacity: '',
 scale: '',
 comment: '',
};

function createHotelFacilitiesSchema({}: { dic: HotelsDictionary }) {
 return z.object({
  name: z.string(),
  facility: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  quantity: z.literal('').or(z.number()),
  capacity: z.literal('').or(z.number()),
  scale: z.string(),
  comment: z.string(),
 });
}

type HotelFacilitiesSchema = z.infer<
 ReturnType<typeof createHotelFacilitiesSchema>
>;

export type { HotelFacilitiesSchema };
export { defaultValues, createHotelFacilitiesSchema };
