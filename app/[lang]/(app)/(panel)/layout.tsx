import Header from './components/header/Header';
import Addressbar from './components/address-bar/Addressbar';
import Nav from './components/nav/Nav';
import Tabs from './components/nav/Tabs';
import Main from './components/main/Main';
import UserInfoProvider from './services/user-info/UserInfoProvider';
import UserProfileProvider from './services/user-profile/UserProfileProvider';
import NavigationProvider from './services/navigation/NavigationProvider';
import AxoisCredentials from './services/axios-credentials/AxiosCredentials';
import PagesProvider from '../services/pages/PagesProvider';
import NavigatorProvider from './services/navigator/NavigatorProvider';
import HistoryTrakcer from './services/history-tracker/HistoryTracker';
import QuickAccessProvider from './services/quick-access/QuickAccessProvider';
import LoginAxiosInterceptor from '../login/services/LoginAxiosInterceptor';
import LogoutContextProvider from '../login/services/logout/LogoutContextProvider';

export default function PanelLayout({ children }: LayoutProps<'/[lang]'>) {
 return (
  <div className='h-svh flex overflow-hidden'>
   <AxoisCredentials />
   <UserInfoProvider>
    <LoginAxiosInterceptor />
    <LogoutContextProvider>
     <NavigatorProvider>
      <HistoryTrakcer>
       <PagesProvider>
        <UserProfileProvider>
         <QuickAccessProvider>
          <NavigationProvider>
           <Nav />
           <div className='grow flex flex-col'>
            <Header />
            <Addressbar />
            <Main>{children}</Main>
            <Tabs />
           </div>
          </NavigationProvider>
         </QuickAccessProvider>
        </UserProfileProvider>
       </PagesProvider>
      </HistoryTrakcer>
     </NavigatorProvider>
    </LogoutContextProvider>
   </UserInfoProvider>
  </div>
 );
}
