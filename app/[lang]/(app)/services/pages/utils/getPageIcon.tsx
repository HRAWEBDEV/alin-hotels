import { Page } from './pagesList';
import { SVGProps } from 'react';
import { IoSettings } from 'react-icons/io5';

export function getPageIcon(
 page: Page['name'],
 iconProps?: SVGProps<SVGSVGElement>,
) {
 switch (page) {
  case 'generalSetting':
   return <IoSettings {...iconProps} />;
 }
 return <IoSettings {...iconProps} />;
}
