'use client';
import { useState } from 'react';
import { type OwnersDictionary } from '@/internalization/app/dictionaries/general-settings/owners/dictionary';
import { ReactNode } from 'react';
import { type OwnersConfig, ownersConfigContext } from './ownersConfigContext';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { ownersBasePath, getAllOwners, removeOwner } from './ownersApiActions';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import {
 Dialog,
 DialogClose,
 DialogTitle,
 DialogDescription,
 DialogHeader,
 DialogFooter,
 DialogContent,
} from '@/components/ui/dialog';
import { IoIosWarning } from 'react-icons/io';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useForm, FormProvider } from 'react-hook-form';
import {
 type OwnerSchema,
 defaultValues,
 createOwnerSchema,
} from '../schemas/ownersSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDebouncedValue } from '@tanstack/react-pacer';

export default function OwnersConfigProvider({
 children,
 dic,
}: {
 children: ReactNode;
 dic: OwnersDictionary;
}) {
 // filters setup
 const realPersonFilters = useForm<OwnerSchema>({
  resolver: zodResolver(createOwnerSchema({ dic })),
  defaultValues: {
   ...defaultValues,
  },
 });
 //
 const queryClient = useQueryClient();
 const { locale } = useBaseConfig();
 const [showFilters, setShowFilters] = useState(false);
 const [selectedOwnerID, setSelectedOwnerID] = useState<number | null>(null);
 const [showRemoveOwnerConfirm, setShowRemoveOwnerConfirm] = useState(false);
 // data
 const {
  data: ownersData,
  isLoading: ownersLoading,
  isFetching: ownersFetching,
  isError: ownersError,
  isSuccess: ownersSucess,
  refetch: refetchOwners,
 } = useQuery({
  queryKey: [ownersBasePath, 'all'],
  async queryFn({ signal }) {
   const res = await getAllOwners({
    signal,
   });
   return res.data;
  },
 });
 // remove owner
 function handleRemoveOwner(ownerID: number) {
  setShowRemoveOwnerConfirm(true);
  setSelectedOwnerID(ownerID);
 }

 const { mutate: confirmRemoveOwner, isPending: removeOwnerIsPending } =
  useMutation({
   async mutationFn() {
    return removeOwner(selectedOwnerID!);
   },
   onSuccess() {
    queryClient.invalidateQueries({
     queryKey: [ownersBasePath, 'all'],
    });
    queryClient.invalidateQueries({
     queryKey: [ownersBasePath, 'owner', setSelectedOwnerID!.toString()],
    });
    setSelectedOwnerID(null);
    setShowRemoveOwnerConfirm(false);
   },
   onError(err: AxiosError<string>) {
    toast.error(err.response?.data);
   },
  });

 const ctx: OwnersConfig = {
  owners: {
   queries: {},
   data: ownersData,
   isError: ownersError,
   isFetching: ownersFetching,
   isLoading: ownersLoading,
   isSuccess: ownersSucess,
   selectedOwnerID,
   refetchOwners,
   onRemoveOwner: handleRemoveOwner,
  },
 };

 return (
  <ownersConfigContext.Provider value={ctx}>
   <FormProvider {...realPersonFilters}>{children}</FormProvider>
   <Dialog
    open={showRemoveOwnerConfirm}
    onOpenChange={(newValue) => setShowRemoveOwnerConfirm(newValue)}
   >
    <DialogContent>
     <DialogHeader>
      <DialogTitle className='hidden'>{dic.removeOwner.title}</DialogTitle>
      <DialogDescription className='hidden font-medium text-base'>
       {dic.removeOwner.confirmRemovePerson}
      </DialogDescription>
     </DialogHeader>
     <div className='flex gap-1 items-center'>
      <IoIosWarning className='size-8 text-rose-700 dark:text-rose-400' />
      <p className='font-medium text-base'>
       {dic.removeOwner.confirmRemovePerson}
      </p>
     </div>
     <DialogFooter>
      <DialogClose asChild>
       <Button
        disabled={removeOwnerIsPending}
        variant='outline'
        className='sm:w-20'
       >
        {removeOwnerIsPending && <Spinner />}
        {dic.removeOwner.cancel}
       </Button>
      </DialogClose>
      <Button
       disabled={removeOwnerIsPending}
       variant='destructive'
       className='sm:w-20'
       onClick={() => {
        confirmRemoveOwner();
       }}
      >
       {removeOwnerIsPending && <Spinner />}
       {dic.removeOwner.confirm}
      </Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </ownersConfigContext.Provider>
 );
}
