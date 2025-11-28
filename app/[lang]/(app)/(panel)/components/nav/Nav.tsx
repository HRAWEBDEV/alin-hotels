import NavProfile from './NavProfile';
export default function Nav() {
 return (
  <nav className='hidden shrink-0 w-(--panel-nav-width) bg-primary dark:bg-sky-950 text-primary-foreground dark:text-foreground overflow-hidden lg:flex flex-col'>
   <div className='hidden lg:block'>
    <NavProfile />
   </div>
   <div className='overflow-auto'></div>
  </nav>
 );
}
