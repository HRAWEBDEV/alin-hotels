import { z } from 'zod';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';

const defaultValues: Partial<HotelSchema> = {
 name: '',
 state: null,
 city: null,
 owner: null,
 hotelOperatorType: null,
 hotelOwnershipType: null,
 gradeType: null,
 degreeType: null,
 hotelTheme: null,
 hotelType: null,
 locationType: null,
 bedCount: '',
 buildingArea: '',
 email: '',
 fax: '',
 floorCount: '',
 address: '',
 landArea: '',
 latitude: '',
 longitude: '',
 maxExtraBedCount: '',
 postalCode: '',
 roomCount: '',
 tel1: '',
 tel2: '',
 tel3: '',
 towerCount: '',
 website: '',
};

function createHotelSchema({}: { dic: HotelsDictionary }) {
 return z.object({
  name: z.string().min(1),
  owner: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  state: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  city: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  hotelOwnershipType: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  hotelOperatorType: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  hotelType: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  gradeType: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  degreeType: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  locationType: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  hotelTheme: z
   .object({
    key: z.string(),
    value: z.string(),
   })
   .nullable(),
  landArea: z.literal('').or(z.number()),
  buildingArea: z.literal('').or(z.number()),
  floorCount: z.literal('').or(z.number()),
  towerCount: z.literal('').or(z.number()),
  roomCount: z.literal('').or(z.number()),
  bedCount: z.literal('').or(z.number()),
  maxExtraBedCount: z.literal('').or(z.number()),
  address: z.string(),
  tel1: z.string(),
  tel2: z.string(),
  tel3: z.string(),
  fax: z.string(),
  email: z.email(),
  postalCode: z.string(),
  website: z.string(),
  longitude: z.string(),
  latitude: z.string(),
 });
}

type HotelSchema = z.infer<ReturnType<typeof createHotelSchema>>;

export type { HotelSchema };
export { defaultValues, createHotelSchema };
