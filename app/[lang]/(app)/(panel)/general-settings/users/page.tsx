import { Metadata } from 'next';
import { getRealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { getUsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import { type Locale } from '@/internalization/app/localization';
import UsersWrapper from './components/UsersWrapper';

export async function generateMetadata(
 props: PageProps<'/[lang]/general-settings/users'>,
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getUsersDictionary({
  locale: lang as Locale,
 });
 return {
  title: dic.title,
 };
}

export default async function Users(
 props: PageProps<'/[lang]/general-settings/users'>,
) {
 const { lang } = await props.params;
 const dic = await getUsersDictionary({
  locale: lang as Locale,
 });
 const realPersonDic = await getRealPersonsDictionary({
  locale: lang as Locale,
 });
 return (
  <div className='mx-auto w-[min(100%,70rem)] h-full flex flex-col'>
   <UsersWrapper dic={dic} realPersonDic={realPersonDic} />
  </div>
 );
}
