import { z } from 'zod';
import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';

const defaultValues: Partial<SmsConfigSchema> = {
 number: '',
 isDefault: false,
};

function createSmsConfigSchema({}: { dic: SmsPanelConfigDictionary }) {
 return z
  .object({
   isDefault: z.boolean(),
   number: z.string().min(1),
   provider: z
    .object({
     key: z.string(),
     value: z.string(),
    })
    .nullable(),
   smsConfigType: z
    .object({
     key: z.string(),
     value: z.string(),
    })
    .nullable(),
  })
  .refine(({ provider }) => !!provider, {
   path: ['provider'],
  })
  .refine(({ smsConfigType }) => !!smsConfigType, {
   path: ['smsConfigType'],
  });
}

type SmsConfigSchema = z.infer<ReturnType<typeof createSmsConfigSchema>>;

export type { SmsConfigSchema };
export { defaultValues, createSmsConfigSchema };
