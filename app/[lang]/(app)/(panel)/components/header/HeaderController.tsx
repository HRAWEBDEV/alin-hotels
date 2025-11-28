import { LocaleControllerButton } from '../LocaleController';
import { ModeControllerButton } from '../ModeContoller';
import { SettingControllerButton } from '../SettingController';
import { QuickAccessControllerButton } from '../QuickAccessController';
import { SupportControllerButton } from '../SupportController';

export default function HeaderControllers() {
 return (
  <>
   <SupportControllerButton />
   <QuickAccessControllerButton />
   <SettingControllerButton />
   <ModeControllerButton />
   <LocaleControllerButton />
  </>
 );
}
