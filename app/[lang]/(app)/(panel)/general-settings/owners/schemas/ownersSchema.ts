import { z } from 'zod';
import { type OwnersDictionary } from '@/internalization/app/dictionaries/general-settings/owners/dictionary';

const defaultValues: Partial<OwnerSchema> = {
 name: '',
};

function createOwnerSchema({}: { dic: OwnersDictionary }) {
 return z.object({
  name: z.string().min(1),
 });
}

type OwnerSchema = z.infer<ReturnType<typeof createOwnerSchema>>;

export type { OwnerSchema };
export { defaultValues, createOwnerSchema };
