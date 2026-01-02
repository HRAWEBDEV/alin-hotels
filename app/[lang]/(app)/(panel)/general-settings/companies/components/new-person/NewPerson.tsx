'use client';
import { useState, useEffect } from 'react';
import { type CompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { FieldLabel, Field, FieldGroup } from '@/components/ui/field';
import {
 InputGroup,
 InputGroupInput,
 InputGroupTextarea,
} from '@/components/ui/input-group';
import { Calendar } from '@/components/ui/calendar';
import { ChevronDownIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from '@/components/ui/popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
 Command,
 CommandGroup,
 CommandInput,
 CommandItem,
 CommandList,
} from '@/components/ui/command';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
 type CompanySchema,
 createCompanySchema,
 defaultValues,
} from '../../schemas/companySchema';
import { Spinner } from '@/components/ui/spinner';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
 type SaveCompanyPackage,
 companyBasePath,
 saveCompany,
 getCompany,
 updateCompany,
} from '../../services/personsApiActions';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import NoItemFound from '../../../../components/NoItemFound';
import { PersonsConfig } from '../../services/personsConfigContext';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { NumericFormat } from 'react-number-format';
import { FaRegTrashAlt } from 'react-icons/fa';

export default function NewPerson({
 dic,
 companyID,
 onSuccess,
 onCancel,
 initialData,
}: {
 dic: CompaniesDictionary;
 companyID?: number | null;
 initialData: PersonsConfig['initialData'];
 onSuccess?: PersonsConfig['persons']['onNewPersonSuccess'];
 onCancel?: PersonsConfig['persons']['onCancelNewPerson'];
}) {
 const queryClient = useQueryClient();
 // form
 const {
  control,
  register,
  handleSubmit,
  formState: { errors },
  reset,
  setValue,
 } = useForm<CompanySchema>({
  resolver: zodResolver(createCompanySchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 //
 const { locale } = useBaseConfig();
 //
 const [openNationalityCombo, setOpenNationalityCombo] = useState(false);
 //
 const { mutate, isPending } = useMutation({
  mutationFn({
   name,
   address,
   fax,
   nationalCode,
   postalCode,
   registerNo,
   tel1,
   tel2,
   tel3,
   nationality,
  }: CompanySchema) {
   const newPerson: SaveCompanyPackage = {
    id: companyID || 0,
    name,
    nationalCode: nationalCode || null,
    registerNo: registerNo || null,
    address: address || null,
    fax: fax || '',
    nationalityZoneID: nationality ? Number(nationality.key) : null,
    postalCode: postalCode || null,
    tel1: tel1 || null,
    tel2: tel2 || null,
    tel3: tel3 || null,
   };
   return companyID ? updateCompany(newPerson) : saveCompany(newPerson);
  },
  onSuccess(res) {
   reset();
   queryClient.invalidateQueries({
    queryKey: [companyBasePath, 'all'],
   });
   if (onSuccess) {
    onSuccess({
     mode: companyID ? 'edit' : 'add',
     personID: res.data,
    });
   }
   if (companyID) {
    queryClient.invalidateQueries({
     queryKey: [companyBasePath, 'person', companyID.toString()],
    });
   } else {
    toast.success(dic.newPerson.newPersonAdded);
   }
  },
  onError(err: AxiosError<string>) {
   toast.error(err.response?.data);
  },
 });
 //
 const { data, isLoading, isError, isSuccess } = useQuery({
  enabled: !!companyID,
  queryKey: [companyBasePath, 'person', companyID?.toString()],
  refetchOnWindowFocus: false,
  async queryFn({ signal }) {
   const res = await getCompany({ signal, personID: companyID! });
   return res.data;
  },
 });

 useEffect(() => {
  if (!companyID) return;
  reset();
 }, [companyID, reset]);

 useEffect(() => {
  if (!companyID || !isSuccess) return;
 }, [companyID, isSuccess]);

 if (companyID && isError) return <NoItemFound />;
 if (companyID && isLoading)
  return (
   <div className='min-h-40 grid place-content-center text-primary'>
    <Spinner className='size-12' />
   </div>
  );
 return (
  <form className='bg-background p-4 border border-input rounded-md w-[min(35rem,100%)] mx-auto'>
   <FieldGroup className='gap-5'>
    <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
     <Button
      data-disabled={!!companyID}
      disabled={!!companyID}
      variant='outline'
      className='text-rose-700! dark:text-rose-400! border-rose-700! dark:border-rose-400! data-[disabled="true"]:opacity-0'
      type='button'
      onClick={() => reset()}
     >
      {isPending && <Spinner />}
      {dic.newPerson.form.clearForm}
     </Button>
     <div className='flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center gap-4'>
      <Button
       className='sm:min-w-28'
       type='button'
       variant='outline'
       disabled={isPending || isLoading}
       onClick={() => {
        onCancel?.({
         mode: companyID ? 'edit' : 'add',
         personID: companyID || 0,
        });
       }}
      >
       {(isPending || isLoading) && <Spinner />}
       {dic.newPerson.form.cancel}
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
       {dic.newPerson.form.save}
      </Button>
     </div>
    </div>
   </FieldGroup>
  </form>
 );
}
