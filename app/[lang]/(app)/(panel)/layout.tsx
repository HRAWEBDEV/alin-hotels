import Header from './components/header/Header';
import Nav from './components/nav/Nav';
import Tabs from './components/nav/Tabs';
import Main from './components/main/Main';
import QuickAccessProvider from './services/quick-access/QuickAccessProvider';
import UserProfileProvider from './services/user-profile/UserProfileProvider';
import SettingProvider from './services/setting/SettingProvider';

export default function PanelLayout({
 children,
}: LayoutProps<'/[lang]/panel'>) {
 return (
  <div className='h-svh flex'>
   <SettingProvider>
    <UserProfileProvider>
     <QuickAccessProvider>
      <Nav />
      <div className='grow flex flex-col'>
       <Header />
       <Main>{children}</Main>
       {/* <Tabs /> */}
      </div>
     </QuickAccessProvider>
    </UserProfileProvider>
   </SettingProvider>
  </div>
 );
}
