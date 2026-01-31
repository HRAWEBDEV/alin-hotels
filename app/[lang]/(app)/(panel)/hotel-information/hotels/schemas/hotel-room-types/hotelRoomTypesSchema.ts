import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelHotelRoomSchema> = {
 name: '',
 roomType: null,
 roomCount: '',
 bedCount: '',
};

function createHotelRoomTypesSchema({}: { dic: HotelsDictionary }) {
 return z
  .object({
   name: z.string().min(1),
   roomType: z
    .object({
     key: z.string(),
     value: z.string(),
    })
    .nullable(),
   roomCount: z.literal('').or(z.number()),
   bedCount: z.literal('').or(z.number()),
  })
  .refine(({ roomType }) => !!roomType, {
   path: ['roomType'],
  })
  .refine(({ roomCount }) => !!roomCount || roomCount === 0, {
   path: ['roomCount'],
  })
  .refine(({ bedCount }) => !!bedCount || bedCount === 0, {
   path: ['bedCount'],
  });
}

type HotelHotelRoomSchema = z.infer<
 ReturnType<typeof createHotelRoomTypesSchema>
>;

export type { HotelHotelRoomSchema };
export { defaultValues, createHotelRoomTypesSchema };
