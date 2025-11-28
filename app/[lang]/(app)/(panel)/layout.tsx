import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Tabs from './components/nav/Tabs';
import Main from './components/main/Main';

export default function PanelLayout({
 children,
}: LayoutProps<'/[lang]/panel'>) {
 return (
  <div className='h-svh flex'>
   <Nav />
   <div className='grow flex flex-col'>
    <Header />
    <Main>{children}</Main>
    {/* <Tabs /> */}
   </div>
  </div>
 );
}
