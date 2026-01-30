import HeaderProfile from './HeaderProfile';
import HeaderControllers from './HeaderController';
import HeaderLogo from './HeaderLogo';

export default function Header() {
 return (
  <header className='bg-background flex justify-between shrink-0 h-(--panel-header-height) border-b border-input'>
   <div className='flex items-center ms-2'>
    <HeaderLogo />
   </div>
   <div className='flex items-center gap-2'>
    <HeaderControllers />
    <HeaderProfile />
   </div>
  </header>
 );
}
