'use client';
import { useState, useEffect } from 'react';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';
import { IoIosClock } from 'react-icons/io';
import { appVersion } from '@/services/base-config/baseConfigContext';

export default function NavExtra() {
 const { locale } = useBaseConfig();
 const [date, setDate] = useState<Date>(new Date());

 useEffect(() => {
  const intervalID = setInterval(() => {
   setDate(new Date());
  }, 1000 * 60);
  return () => clearInterval(intervalID);
 }, []);

 return (
  <div className='bg-sky-900/30 p-2 flex justify-between items-center gap-2'>
   <div className='flex gap-1 items-center text-sm font-light'>
    <IoIosClock className='size-5' />
    <span>
     {date.toLocaleDateString(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
     })}
    </span>
   </div>
   <div className='flex gap-1 items-center text-sm'>
    <span>(v{appVersion})</span>
   </div>
  </div>
 );
}
