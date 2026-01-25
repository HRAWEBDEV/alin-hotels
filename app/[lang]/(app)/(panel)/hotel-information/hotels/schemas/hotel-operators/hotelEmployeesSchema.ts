import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelOperatorSchema> = {
 name: '',
 personType: 'none',
 fromDate: null,
 endDate: null,
};

function createHotelOperatorSchema({}: { dic: HotelsDictionary }) {
 return z
  .object({
   name: z.string(),
   personType: z.enum(['realPerson', 'company', 'none']),
   percentage: z.coerce.number(),
   fromDate: z.date().nullable(),
   endDate: z.date().nullable(),
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

type HotelOperatorSchema = z.infer<
 ReturnType<typeof createHotelOperatorSchema>
>;

export type { HotelOperatorSchema };
export { defaultValues, createHotelOperatorSchema };
