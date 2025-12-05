import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { useRouter } from 'next/navigation';

export function useGoHome() {
 const { locale } = useBaseConfig();
 const router = useRouter();
 return () => {
  router.push(`/${locale}`);
 };
}
