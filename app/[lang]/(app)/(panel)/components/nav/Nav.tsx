import NavProfile from './NavProfile';
import NavList from './NavList';
import NavExtra from './NavExtra';
import NavWrapper from './NavWrapper';

export default function Nav() {
 return (
  <NavWrapper>
   <div className='hidden lg:block'>
    <NavProfile />
   </div>
   <div className='overflow-hidden grow flex flex-col'>
    <NavList />
   </div>
   <NavExtra />
  </NavWrapper>
 );
}
