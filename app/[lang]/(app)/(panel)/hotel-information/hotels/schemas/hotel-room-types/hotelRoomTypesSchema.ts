import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelHotelRoomSchema> = {
 name: '',
};

function createHotelRoomTypesSchema({}: { dic: HotelsDictionary }) {
 return z.object({
  name: z.string(),
 });
}

type HotelHotelRoomSchema = z.infer<
 ReturnType<typeof createHotelRoomTypesSchema>
>;

export type { HotelHotelRoomSchema };
export { defaultValues, createHotelRoomTypesSchema };
