import { Switch } from '@/components/ui/switch';
import { User } from '../../services/usersApiActions';
import { updateUser, usersBasePath } from '../../services/usersApiActions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { Spinner } from '@/components/ui/spinner';
import { useUsersConfigContext } from '../../services/usersConfigContext';

export default function UserStatusSwitch({ user }: { user: User }) {
 const {
  users: { onChangeSelectedUserID },
 } = useUsersConfigContext();
 const queryClient = useQueryClient();
 const { mutate, isPending } = useMutation({
  mutationFn() {
   return updateUser({ disabled: !user.disabled, personID: user.personID });
  },
  onSuccess() {
   queryClient.invalidateQueries({
    queryKey: [usersBasePath, 'all'],
   });
   queryClient.invalidateQueries({
    queryKey: [usersBasePath, 'user', user.personID.toString()],
   });
   onChangeSelectedUserID(null);
  },
  onError(err: AxiosError<string>) {
   toast.error(err.message);
  },
 });
 return (
  <div
   onClick={(e) => e.stopPropagation()}
   onDoubleClick={(e) => e.stopPropagation()}
   style={{ direction: 'ltr' }}
   className='w-full flex justify-center items-center'
  >
   {isPending ? (
    <Spinner className='text-primary' />
   ) : (
    <Switch
     className='cursor-pointer'
     checked={!user.disabled}
     onCheckedChange={() => mutate()}
    />
   )}
  </div>
 );
}
