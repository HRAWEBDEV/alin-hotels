import HeaderProfile from './HeaderProfile';

export default function Header() {
 return (
  <header className='bg-background flex justify-between shrink-0 h-(--panel-header-height) border-b border-input'>
   <div></div>
   <div>
    <HeaderProfile />
   </div>
  </header>
 );
}
