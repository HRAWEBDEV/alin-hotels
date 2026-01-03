import { Locale } from '@/internalization/app/localization';
import { Metadata } from 'next';
import { getSmsPanelConfigDictionary } from '@/internalization/app/dictionaries/config/sms-panel-config/dictionary';

export async function generateMetadata(
 props: PageProps<'/[lang]/config/sms-panel-config'>,
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getSmsPanelConfigDictionary({
  locale: lang as Locale,
 });
 return {
  title: dic.title,
 };
}

export default async function SmsPanelConfigPage(
 props: PageProps<'/[lang]/config/sms-panel-config'>,
) {
 const { lang } = await props.params;
 const dic = await getSmsPanelConfigDictionary({
  locale: lang as Locale,
 });
 return <>test</>;
}
