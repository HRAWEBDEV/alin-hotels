import { z } from 'zod';
import { type LoginDictionary } from '@/internalization/app/dictionaries/login/dictionary';

function getOTPSchema({ dic }: { dic: LoginDictionary }) {
 return z.object({
  phoneNo: z.string().min(1, dic.forgetPassword.fillRequiredFields),
 });
}

function getConfirmPasswordSchema({ dic }: { dic: LoginDictionary }) {
 return z
  .object({
   confirmOTP: z.string().min(1, dic.forgetPassword.fillRequiredFields),
   password: z.string().min(1, dic.forgetPassword.fillRequiredFields),
   confirmPassword: z.string().min(1, dic.forgetPassword.fillRequiredFields),
  })
  .refine(
   ({ password, confirmPassword }) => {
    return password === confirmPassword;
   },
   {
    path: ['confirmPassword'],
    message: dic.forgetPassword.invalidConfirmPassword,
   },
  );
}

type OTPSchema = z.infer<ReturnType<typeof getOTPSchema>>;
type CofirmPasswordSchema = z.infer<
 ReturnType<typeof getConfirmPasswordSchema>
>;

export type { OTPSchema, CofirmPasswordSchema };
export { getOTPSchema, getConfirmPasswordSchema };
