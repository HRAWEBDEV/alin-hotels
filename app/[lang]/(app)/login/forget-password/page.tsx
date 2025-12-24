import { getLoginDictionary } from '@/internalization/app/dictionaries/login/dictionary';
import { type Locale } from '@/internalization/app/localization';
import { Metadata } from 'next';
import ForgetPasswordWrapper from './components/ForgetPasswordWrapper';

export async function generateMetadata({
 params,
}: PageProps<'/[lang]/login/forget-password'>): Promise<Metadata> {
 const { lang } = await params;
 const dic = await getLoginDictionary({
  locale: lang as Locale,
 });
 return { title: dic.title };
}

export default async function ForgetPassword({
 params,
}: PageProps<'/[lang]/login/forget-password'>) {
 const { lang } = await params;
 const dic = await getLoginDictionary({
  locale: lang as Locale,
 });
 return <ForgetPasswordWrapper dic={dic} />;
}
