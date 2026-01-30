'use client';
import { useEffect } from 'react';
import { type RoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';
import { FieldLabel, Field, FieldGroup } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type RoomTypeSchema,
 createRoomTypeSchema,
 defaultValues,
} from '../../schemas/roomTypeSchema';
import { Spinner } from '@/components/ui/spinner';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 type SaveRoomTypePackage,
 roomTypesBasePath,
 saveRoomType,
 getRoomType,
 updateRoomType,
} from '../../services/roomTypesApiActions';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import NoItemFound from '../../../../components/NoItemFound';
import { type RoomTypesConfig } from '../../services/roomTypesConfigContext';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { dictionaryDefaultValues } from '@/app/[lang]/(app)/utils/apiBaseTypes';
import { setTimeout } from 'timers';

export default function NewRoomType({
 dic,
 roomTypeID,
 onSuccess,
 onCancel,
}: {
 dic: RoomTypesDictionary;
 roomTypeID?: number | null;
 onSuccess?: RoomTypesConfig['roomTypes']['onNewRoomTypeSuccess'];
 onCancel?: RoomTypesConfig['roomTypes']['onCancelNewRoomType'];
}) {
 const queryClient = useQueryClient();
 // form
 const {
  register,
  handleSubmit,
  formState: { errors },
  reset,
  setValue,
  setFocus,
 } = useForm<RoomTypeSchema>({
  resolver: zodResolver(createRoomTypeSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 //
 const { localeInfo } = useBaseConfig();
 //
 const { mutate, isPending } = useMutation({
  mutationFn({ name }: RoomTypeSchema) {
   const newRoomType: SaveRoomTypePackage = {
    ...dictionaryDefaultValues,
    id: data?.nameID || 0,
    defaultValue: name,
    [localeInfo.latinName]: name,
   };
   return roomTypeID
    ? updateRoomType(roomTypeID, newRoomType)
    : saveRoomType(newRoomType);
  },
  onSuccess(res) {
   reset();
   queryClient.invalidateQueries({
    queryKey: [roomTypesBasePath, 'all'],
   });
   if (onSuccess) {
    onSuccess({
     mode: roomTypeID ? 'edit' : 'add',
     roomTypeID: res.data,
    });
   }
   if (roomTypeID) {
    queryClient.invalidateQueries({
     queryKey: [roomTypesBasePath, 'roomType', roomTypeID.toString()],
    });
   } else {
    toast.success(dic.newRoomType.newRoomTypeAdded);
   }
   setTimeout(() => {
    setFocus('name');
   }, 200);
  },
  onError(err: AxiosError<string>) {
   toast.error(err.response?.data);
  },
 });
 //
 const { data, isLoading, isError, isSuccess } = useQuery({
  enabled: !!roomTypeID,
  queryKey: [roomTypesBasePath, 'roomType', roomTypeID?.toString()],
  refetchOnWindowFocus: false,
  async queryFn({ signal }) {
   const res = await getRoomType({ signal, roomTypeID: roomTypeID! });
   return res.data;
  },
 });
 //
 useEffect(() => {
  if (!roomTypeID) return;
  reset();
 }, [roomTypeID, reset]);

 useEffect(() => {
  if (!roomTypeID || !isSuccess) return;
  const { name } = data;
  setValue('name', name);
 }, [roomTypeID, isSuccess, data, setValue]);

 if (roomTypeID && isError) return <NoItemFound />;
 if (roomTypeID && isLoading)
  return (
   <div className='min-h-40 grid place-content-center text-primary'>
    <Spinner className='size-12' />
   </div>
  );
 return (
  <form className='w-[min(30rem,100%)] mx-auto'>
   <FieldGroup className='gap-2'>
    <div className='grid gap-y-2'>
     <div className='grid grid-cols-1 gap-3 gap-y-4 bg-background p-4 border border-input rounded-md'>
      <Field className='gap-2' data-invalid={!!errors.name}>
       <FieldLabel htmlFor='name'>{dic.newRoomType.form.title} *</FieldLabel>
       <InputGroup data-invalid={!!errors.name}>
        <InputGroupInput id='name' {...register('name')} />
       </InputGroup>
      </Field>
     </div>
    </div>
    <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
     <Button
      data-disabled={!!roomTypeID}
      disabled={!!roomTypeID}
      variant='outline'
      className='text-rose-700! dark:text-rose-400! border-rose-700! dark:border-rose-400! data-[disabled="true"]:opacity-0'
      type='button'
      onClick={() => reset()}
     >
      {isPending && <Spinner />}
      {dic.newRoomType.form.clearForm}
     </Button>
     <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
      <Button
       className='sm:min-w-28'
       type='button'
       variant='outline'
       disabled={isPending || isLoading}
       onClick={() => {
        onCancel?.({
         mode: roomTypeID ? 'edit' : 'add',
         roomTypeID: roomTypeID || 0,
        });
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newRoomType.form.cancel}
      </Button>
      <Button
       className='sm:min-w-28'
       type='submit'
       disabled={isPending || isLoading}
       onClick={(e) => {
        e.preventDefault();
        handleSubmit((data) => mutate(data))();
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newRoomType.form.save}
      </Button>
     </div>
    </div>
   </FieldGroup>
  </form>
 );
}
