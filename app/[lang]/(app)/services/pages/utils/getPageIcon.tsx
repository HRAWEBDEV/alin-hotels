import { type Pages } from './pagesList';
import { SVGProps } from 'react';
import { IoSettings } from 'react-icons/io5';
import { FaHotel } from 'react-icons/fa6';

export function getPageIcon(
 pageName: keyof Pages,
 iconProps?: SVGProps<SVGSVGElement>,
) {
 switch (pageName) {
  case 'general-settings':
   return <IoSettings {...iconProps} />;
  case 'hotel-information':
   return <FaHotel {...iconProps} />;
 }
 return <IoSettings {...iconProps} />;
}
