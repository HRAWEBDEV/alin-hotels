import { LocaleControllerButton } from '../LocaleController';
import { ModeControllerButton } from '../ModeContoller';
import { SettingControllerButton } from '../SettingController';
import { SupportControllerButton } from '../SupportController';
import { LogoutControllerButton } from '../LogoutController';
import { NotificationControllerButton } from '../NotificationsController';

export default function HeaderControllers() {
 return (
  <>
   <LogoutControllerButton />
   <SupportControllerButton />
   <NotificationControllerButton />
   <SettingControllerButton />
   <ModeControllerButton />
   <LocaleControllerButton />
  </>
 );
}
