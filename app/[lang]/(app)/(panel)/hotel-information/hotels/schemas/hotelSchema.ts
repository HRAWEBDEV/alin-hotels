import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelSchema> = {};

function createHotelSchema({}: { dic: HotelsDictionary }) {
 return z.object({});
}

type HotelSchema = z.infer<ReturnType<typeof createHotelSchema>>;

export type { HotelSchema };
export { defaultValues, createHotelSchema };
