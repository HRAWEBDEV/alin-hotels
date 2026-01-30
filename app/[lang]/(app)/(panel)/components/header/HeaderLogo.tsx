'use client';
import LogoWithInlineText from '@/components/icons/LogoWithInlineText';
import Link from 'next/link';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function HeaderLogo() {
 const { locale } = useBaseConfig();
 return (
  <Link href={`/${locale}`}>
   {/*<LogoWithInlineText height={'2.2rem'} />*/}
  </Link>
 );
}
