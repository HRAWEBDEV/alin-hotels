import { z } from 'zod';
import { type SmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';

const defaultValues: Partial<SmsConfigSchema> = {
 name: '',
};

function createSmsConfigSchema({}: { dic: SmsPanelConfigDictionary }) {
 return z.object({
  name: z.string().min(1),
 });
}

type SmsConfigSchema = z.infer<ReturnType<typeof createSmsConfigSchema>>;

export type { SmsConfigSchema };
export { defaultValues, createSmsConfigSchema };
