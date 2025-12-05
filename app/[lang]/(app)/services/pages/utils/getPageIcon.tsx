import { type Page } from './pagesList';
import { SVGProps } from 'react';
import { IoSettings } from 'react-icons/io5';

export function getPageIcon(
 pageName: Page['name'],
 iconProps?: SVGProps<SVGSVGElement>,
) {
 switch (pageName) {
  case 'general-settings':
   return <IoSettings {...iconProps} />;
 }
 return <IoSettings {...iconProps} />;
}
