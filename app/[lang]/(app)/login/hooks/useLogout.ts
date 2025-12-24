import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { clearUserLoginToken } from '../utils/loginTokenManager';

export default function useLogout() {
 const queryClient = useQueryClient();
 const router = useRouter();
 const { locale } = useBaseConfig();
 return () => {
  queryClient.clear();
  clearUserLoginToken();
  router.push(`/${locale}/login`);
 };
}
