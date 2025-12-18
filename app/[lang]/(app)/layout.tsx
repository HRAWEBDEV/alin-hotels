import { getShareDictionary } from '@/internalization/app/dictionaries/share/dictionary';
import { getMetaDictionary } from '@/internalization/app/dictionaries/meta/dictionary';
import { getLoginDictionary } from '@/internalization/app/dictionaries/login/dictionary';
import ShareDictionaryProvider from './services/share-dictionary/ShareDictionaryProvider';
import { type Locale, locales } from '@/internalization/app/localization';
import { Toaster } from '@/components/ui/sonner';
import AxoisBaseConfig from './services/axios-base-config/AxiosBaseConfig';
import LoginProvider from './login/services/login/LoginProvider';

export default async function AppLayout({
 children,
 params,
}: LayoutProps<'/[lang]'>) {
 const { lang } = await params;
 const { contentDirection } = locales[lang as Locale];
 const shareDic = await getShareDictionary({ locale: lang as Locale });
 const metaDic = await getMetaDictionary({ locale: lang as Locale });
 const loginDictionary = await getLoginDictionary({ locale: lang as Locale });
 return (
  <ShareDictionaryProvider
   loginDictionary={loginDictionary}
   shareDictionary={shareDic}
   metaDictionary={metaDic}
  >
   <LoginProvider>
    <AxoisBaseConfig />
    {children}
   </LoginProvider>
   <Toaster
    className='font-[inherit]!'
    position={contentDirection === 'rtl' ? 'top-right' : 'top-left'}
    richColors
    closeButton
   />
  </ShareDictionaryProvider>
 );
}
