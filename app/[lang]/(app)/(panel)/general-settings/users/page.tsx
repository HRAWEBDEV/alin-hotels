import { Metadata } from 'next';
import { getUsersDictionary } from '@/internalization/app/dictionaries/general-settings/users/dictionary';
import { type Locale } from '@/internalization/app/localization';

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
 return <></>;
}
