import NavProfile from './NavProfile';
export default function Nav() {
 return (
  <nav className='shrink-0 w-(--panel-nav-width) bg-primary dark:bg-sky-950 text-primary-foreground dark:text-foreground'>
   <NavProfile />
  </nav>
 );
}
