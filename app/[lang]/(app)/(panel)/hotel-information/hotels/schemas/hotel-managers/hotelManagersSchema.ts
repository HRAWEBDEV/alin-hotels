import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelManagersSchema> = {};

function createHotelManagersSchema({}: { dic: HotelsDictionary }) {
 return z.object({});
}

type HotelManagersSchema = z.infer<
 ReturnType<typeof createHotelManagersSchema>
>;

export type { HotelManagersSchema };
export { defaultValues, createHotelManagersSchema };
