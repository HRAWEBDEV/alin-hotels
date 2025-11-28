import { LocaleControllerButton } from '../LocaleController';
import { ModeControllerButton } from '../ModeContoller';
import { SettingControllerButton } from '../SettingController';
import { QuickAccessControllerButton } from '../QuickAccessController';
import { SupportControllerButton } from '../SupportController';
import { LogoutControllerButton } from '../LogoutController';

export default function HeaderControllers() {
 return (
  <>
   <LogoutControllerButton />
   <SupportControllerButton />
   <QuickAccessControllerButton />
   <SettingControllerButton />
   <ModeControllerButton />
   <LocaleControllerButton />
  </>
 );
}
