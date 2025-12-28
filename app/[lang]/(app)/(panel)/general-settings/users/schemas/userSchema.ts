import { z } from 'zod';
import { type UsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';

const defaultValues: Partial<UserSchema> = {
 userName: '',
 name: '',
 lastName: '',
 phoneNumber: '',
};

function createUserSchema({}: { dic: UsersDictionary }) {
 return z.object({
  userName: z.string().min(1),
  name: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
 });
}

function createUserCredentialsSchema({ dic }: { dic: UsersDictionary }) {
 return z
  .object({
   password: z.string().min(1),
   confirmPassword: z
    .string()
    .min(1, dic.newUser.formValidation.invalidConfirmPassword),
  })
  .refine(
   ({ password, confirmPassword }) => {
    return password === confirmPassword;
   },
   {
    path: ['confirmPassword'],
    message: dic.newUser.formValidation.invalidConfirmPassword,
   },
  );
}

type UserSchema = z.infer<ReturnType<typeof createUserSchema>>;
type UserCredentialsSchema = z.infer<
 ReturnType<typeof createUserCredentialsSchema>
>;

export type { UserSchema, UserCredentialsSchema };
export { defaultValues, createUserSchema, createUserCredentialsSchema };
