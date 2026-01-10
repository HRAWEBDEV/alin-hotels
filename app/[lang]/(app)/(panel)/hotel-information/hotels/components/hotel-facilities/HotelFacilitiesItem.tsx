'use client';
import { type HotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import { Field } from '@/components/ui/field';
import { InputGroup, InputGroupInput } from '@/components/ui/input-group';
import {
 type HotelFacilitiesSchema,
 defaultValues,
 createHotelFacilitiesSchema,
} from '../../schemas/hotel-facilities/hotelFacilitiesSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import {
 type HotelFacility,
 type SaveHotelFacilityPackage,
 hotelFacilitiesBasePath,
 saveHotelFacility,
 updateHotelFacility,
} from '../../services/hotel-facilities/hotelFacilityApiActions';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { Spinner } from '@/components/ui/spinner';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { useHotelFacilityContext } from '../../services/hotel-facilities/hotelFacilityContext';
import { IoTrashOutline } from 'react-icons/io5';

export default function HotelFacilitiesItem({
 dic,
 facility,
}: {
 dic: HotelsDictionary;
 facility: HotelFacility | null;
}) {
 const {} = useHotelFacilityContext();
 const queryClient = useQueryClient();
 const { localeInfo } = useBaseConfig();
 const {
  register,
  handleSubmit,
  reset,
  setValue,
  formState: { errors },
  watch,
 } = useForm<HotelFacilitiesSchema>({
  resolver: zodResolver(createHotelFacilitiesSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });

 const { mutate, isPending } = useMutation({
  mutationFn({}: HotelFacilitiesSchema) {
   // const saveOwnerPackage: SaveHotelFacilityPackage = {};
   // return facility
   //  ? updateHotelFacility()
   //  : saveHotelFacility();
   return Promise.resolve(true);
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: [hotelFacilitiesBasePath, 'all'],
   });
   if (facility) {
   } else {
    reset();
   }
  },
  onError(err: AxiosError<string>) {
   if (facility) {
   }
   toast.error(err.response?.data);
  },
 });

 return (
  <form
   data-add-edit={!!facility?.id}
   className='group grid grid-cols-1 gap-2 data-[add-edit="true"]:mb-4'
  >
   <div className='flex justify-end gap-2'>
    <Button
     type='submit'
     variant={facility ? 'secondary' : 'default'}
     className='md:w-20'
     disabled={isPending}
     onClick={(e) => {
      e.preventDefault();
      handleSubmit((data) => {
       // mutate(data);
      })();
     }}
    >
     {isPending && <Spinner />}
    </Button>
    {facility && (
     <>
      <Button
       type='button'
       variant='outline'
       className='md:20'
       disabled={isPending}
       onClick={() => {}}
      >
       {isPending && <Spinner />}
      </Button>
      <Button
       type='button'
       variant='outline'
       size='icon'
       disabled={isPending}
       className='text-rose-700 dark:text-rose-400 border-rose-700 dark:border-rose-400'
       onClick={() => {}}
      >
       {isPending ? <Spinner /> : <IoTrashOutline />}
      </Button>
     </>
    )}
   </div>
  </form>
 );
}
