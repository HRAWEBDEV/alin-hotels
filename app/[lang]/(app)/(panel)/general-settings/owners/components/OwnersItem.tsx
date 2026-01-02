'use client';
import { type OwnersDictionary } from '@/internalization/app/dictionaries/general-settings/owners/dictionary';
import { Field } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import {
 type OwnerSchema,
 defaultValues,
 createOwnerSchema,
} from '../schemas/ownersSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import {
 type Owner,
 type SaveOwnerPackage,
 ownersBasePath,
 saveOwner,
 updateOwner,
} from '../services/ownersApiActions';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { Spinner } from '@/components/ui/spinner';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useOwnersConfigContext } from '../services/ownersConfigContext';
import { IoTrashOutline } from 'react-icons/io5';

export default function OwnersItem({
 dic,
 owner,
}: {
 dic: OwnersDictionary;
 owner: Owner | null;
}) {
 const {
  owners: { onRemoveOwner },
 } = useOwnersConfigContext();
 const queryClient = useQueryClient();
 const { localeInfo } = useBaseConfig();
 const {
  register,
  handleSubmit,
  reset,
  setValue,
  formState: { errors },
  watch,
 } = useForm<OwnerSchema>({
  resolver: zodResolver(createOwnerSchema({ dic })),
  defaultValues: {
   ...defaultValues,
   name: owner?.name || '',
  },
 });

 const nameValue = watch('name');

 const { mutate, isPending } = useMutation({
  mutationFn({ name }: OwnerSchema) {
   const saveOwnerPackage: SaveOwnerPackage = {
    id: owner?.nameID || 0,
    defaultValue: name,
    [localeInfo.latinName]: name,
   };
   return owner
    ? updateOwner(owner.id, saveOwnerPackage)
    : saveOwner(saveOwnerPackage);
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: [ownersBasePath, 'all'],
   });
   if (owner) {
   } else {
    reset();
   }
  },
  onError(err: AxiosError<string>) {
   toast.error(err.response?.data);
  },
 });

 return (
  <form
   data-add-form={!owner?.id}
   className='grid grid-cols-1 md:grid-cols-[1fr_max-content] gap-2 data-[add-from="false"]:mb-4'
  >
   <Field className='gap-2' data-invalid={!!errors.name}>
    <InputGroup data-invalid={!!errors.name}>
     <InputGroupInput
      placeholder={dic.newOwner.form.nameOwner + ' ...'}
      id='name'
      {...register('name')}
     />
    </InputGroup>
   </Field>
   <div className='flex justify-end gap-2'>
    <Button
     type='submit'
     variant={owner ? 'secondary' : 'default'}
     className='md:w-20'
     disabled={isPending || Boolean(owner && owner.name === nameValue)}
     onClick={(e) => {
      e.preventDefault();
      handleSubmit((data) => {
       mutate(data);
      })();
     }}
    >
     {isPending && <Spinner />}
     {owner ? dic.newOwner.form.updateOwner : dic.newOwner.form.addOwner}
    </Button>
    {owner && (
     <>
      <Button
       type='button'
       variant='outline'
       className='md:20'
       disabled={isPending || Boolean(owner && owner.name === nameValue)}
       onClick={() => {
        setValue('name', owner.name);
       }}
      >
       {isPending && <Spinner />}
       {dic.newOwner.form.cancel}
      </Button>
      <Button
       type='button'
       variant='outline'
       size='icon'
       disabled={isPending}
       className='text-rose-700 dark:text-rose-400 border-rose-700 dark:border-rose-400'
       onClick={() => {
        onRemoveOwner(owner.id);
       }}
      >
       {isPending ? <Spinner /> : <IoTrashOutline />}
      </Button>
     </>
    )}
   </div>
  </form>
 );
}
