import { z } from 'zod';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';

const defaultValues: Partial<UserSchema> = {
 userName: '',
};

function createUserSchema({}: { dic: UsersDictionary }) {
 return z.object({
  userName: z.string(),
 });
}

type UserSchema = z.infer<ReturnType<typeof createUserSchema>>;

export type { UserSchema };
export { defaultValues, createUserSchema };
