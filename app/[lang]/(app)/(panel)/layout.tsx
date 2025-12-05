import Header from './components/header/Header';
import Addressbar from './components/address-bar/Addressbar';
import Nav from './components/nav/Nav';
import Tabs from './components/nav/Tabs';
import Main from './components/main/Main';
import UserProfileProvider from './services/user-profile/UserProfileProvider';
import NavigationProvider from './services/navigation/NavigationProvider';
import AxoisCredentials from './services/axios-credentials/AxiosCredentials';

export default function PanelLayout({
 children,
}: LayoutProps<'/[lang]/panel'>) {
 return (
  <div className='h-svh flex overflow-hidden'>
   <AxoisCredentials />
   <UserProfileProvider>
    <NavigationProvider>
     <Nav />
     <div className='grow flex flex-col'>
      <Header />
      <Addressbar />
      <Main>{children}</Main>
      <Tabs />
     </div>
    </NavigationProvider>
   </UserProfileProvider>
  </div>
 );
}
