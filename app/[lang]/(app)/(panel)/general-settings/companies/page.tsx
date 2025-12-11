import { getCompaniesDictionary } from '@/internalization/app/dictionaries/general-settings/companies/dictionary';
import { Locale } from '@/internalization/app/localization';
import { Metadata } from 'next';
import PersonsWrapper from './companies/PersonsWrapper';

export async function generateMetadata(
 props: PageProps<'/[lang]/general-settings/real-persons'>,
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getCompaniesDictionary({
  locale: lang as Locale,
 });
 return {
  title: dic.title,
 };
}

export default async function Companies(
 props: PageProps<'/[lang]/general-settings/real-persons'>,
) {
 const { lang } = await props.params;
 const dic = await getCompaniesDictionary({
  locale: lang as Locale,
 });
 return <PersonsWrapper dic={dic} />;
}
