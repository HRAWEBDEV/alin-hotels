import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelOperatorSchema> = {};

function createHotelOperatorSchema({}: { dic: HotelsDictionary }) {
 return z.object({});
}

type HotelOperatorSchema = z.infer<
 ReturnType<typeof createHotelOperatorSchema>
>;

export type { HotelOperatorSchema };
export { defaultValues, createHotelOperatorSchema };
