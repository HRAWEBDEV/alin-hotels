import { type UserPorifleTab } from '../userProfileContext';
import { IoMdSettings } from 'react-icons/io';
import { MdSupportAgent } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';
import { RiBookMarkedFill } from 'react-icons/ri';
import { FaUserCircle } from 'react-icons/fa';

const tabClass = 'size-6';

export function getTabIcon(tabName: UserPorifleTab) {
 switch (tabName) {
  case 'generalInfo':
   return <FaUserCircle className={tabClass} />;
  case 'quickAccess':
   return <RiBookMarkedFill className={tabClass} />;
  case 'support':
   return <MdSupportAgent className={tabClass} />;
  case 'notifications':
   return <IoMdNotifications className={tabClass} />;
  default:
   return <IoMdSettings className={tabClass} />;
 }
}
