import { Locale } from '@/internalization/app/localization';
import { Metadata } from 'next';
import { getRoomTypesDictionary } from '@/internalization/app/dictionaries/hotel-information/room-types/dictionary';
import RoomTypesWrapper from './components/RoomTypesWrapper';

export async function generateMetadata(
 props: PageProps<'/[lang]/hotel-information/room-types'>,
): Promise<Metadata> {
 const { lang } = await props.params;
 const dic = await getRoomTypesDictionary({
  locale: lang as Locale,
 });
 return {
  title: dic.title,
 };
}

export default async function RoomTypePage(
 props: PageProps<'/[lang]/hotel-information/room-types'>,
) {
 const { lang } = await props.params;
 const dic = await getRoomTypesDictionary({
  locale: lang as Locale,
 });
 return <RoomTypesWrapper dic={dic} />;
}
