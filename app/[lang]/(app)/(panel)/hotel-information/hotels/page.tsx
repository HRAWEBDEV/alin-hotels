import { Locale } from '@/internalization/app/localization';
import { Metadata } from 'next';
import { getHotelsDictionary } from '@/internalization/app/dictionaries/hotel-information/hotels/dictionary';
import HotelsWrapper from './components/HotelsWrapper';
import { getRealPersonsDictionary } from '@/internalization/app/dictionaries/general-settings/real-persons/dictionary';

export async function generateMetadata(
 props: PageProps<'/[lang]/hotel-information/hotels'>,
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getHotelsDictionary({
  locale: lang as Locale,
 });
 return {
  title: dic.title,
 };
}

export default async function HotelsPage(
 props: PageProps<'/[lang]/hotel-information/hotels'>,
) {
 const { lang } = await props.params;
 const dic = await getHotelsDictionary({
  locale: lang as Locale,
 });
 const realPersonDic = await getRealPersonsDictionary({
  locale: lang as Locale,
 });
 return <HotelsWrapper dic={dic} realPersonDic={realPersonDic} />;
}
