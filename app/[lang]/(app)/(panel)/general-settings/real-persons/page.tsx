import { getRealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';
import { Locale } from '@/internalization/app/localization';
import { Metadata } from 'next';
import PersonsWrapper from './components/PersonsWrapper';

export async function generateMetadata(
 props: PageProps<'/[lang]/general-settings/real-persons'>,
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getRealPersonsDictionary({
  locale: lang as Locale,
 });
 return {
  title: dic.title,
 };
}

export default async function RealPersons(
 props: PageProps<'/[lang]/general-settings/real-persons'>,
) {
 const { lang } = await props.params;
 const dic = await getRealPersonsDictionary({
  locale: lang as Locale,
 });
 return <PersonsWrapper dic={dic} />;
}
