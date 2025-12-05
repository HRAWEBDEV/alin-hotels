'use client';
import { useEffect } from 'react';
import { axios } from '../../../utils/defaultAxios';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

export default function AxoisCredentials() {
 const { locale } = useBaseConfig();
 useEffect(() => {
  const interceptorID = axios.interceptors.request.use((config) => {
   return config;
  });
  return () => {
   axios.interceptors.request.eject(interceptorID);
  };
 }, [locale]);
 return <></>;
}
