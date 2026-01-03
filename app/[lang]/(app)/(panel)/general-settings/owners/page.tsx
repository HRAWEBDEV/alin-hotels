import { getOwnersDictionary } from '@/internalization/app/dictionaries/general-settings/owners/dictionary';
import { Locale } from '@/internalization/app/localization';
import { Metadata } from 'next';
import OwnersWrapper from './components/OwnersWrapper';

export async function generateMetadata(
 props: PageProps<'/[lang]/general-settings/owners'>,
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getOwnersDictionary({
  locale: lang as Locale,
 });
 return {
  title: dic.title,
 };
}

export default async function OwnersPage(
 props: PageProps<'/[lang]/general-settings/owners'>,
) {
 const { lang } = await props.params;
 const dic = await getOwnersDictionary({
  locale: lang as Locale,
 });
 return <OwnersWrapper dic={dic} />;
}
