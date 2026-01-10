import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelFacilitiesSchema> = {};

function createHotelFacilitiesSchema({}: { dic: HotelsDictionary }) {
 return z.object({});
}

type HotelFacilitiesSchema = z.infer<
 ReturnType<typeof createHotelFacilitiesSchema>
>;

export type { HotelFacilitiesSchema };
export { defaultValues, createHotelFacilitiesSchema };
