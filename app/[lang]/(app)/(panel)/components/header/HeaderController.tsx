import { LocaleControllerButton } from '../LocaleController';
import { ModeControllerButton } from '../ModeContoller';
import { SettingControllerButton } from '../SettingController';
import { QuickAccessControllerButton } from '../QuickAccessController';

export default function HeaderControllers() {
 return (
  <>
   <QuickAccessControllerButton />
   <SettingControllerButton />
   <ModeControllerButton />
   <LocaleControllerButton />
  </>
 );
}
