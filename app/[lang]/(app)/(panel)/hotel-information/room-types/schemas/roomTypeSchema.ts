import { z } from 'zod';
import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';

const defaultValues: Partial<RoomTypeSchema> = {
 name: '',
};

function createRoomTypeSchema({}: { dic: RoomTypesDictionary }) {
 return z.object({
  name: z.string().min(1),
 });
}

type RoomTypeSchema = z.infer<ReturnType<typeof createRoomTypeSchema>>;

export type { RoomTypeSchema };
export { defaultValues, createRoomTypeSchema };
