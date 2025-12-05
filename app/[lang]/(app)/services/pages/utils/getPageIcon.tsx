import { type Pages } from './pagesList';
import { SVGProps } from 'react';
import { IoSettings } from 'react-icons/io5';

export function getPageIcon(
 pageName: keyof Pages,
 iconProps?: SVGProps<SVGSVGElement>,
) {
 switch (pageName) {
  case 'general-settings':
   return <IoSettings {...iconProps} />;
 }
 return <IoSettings {...iconProps} />;
}
