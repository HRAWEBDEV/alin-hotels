const pagesList = [
 {
  name: 'generalSetting',
  subPages: [
   {
    name: 'test',
   },
  ],
 },
] as const;

type Page = (typeof pagesList)[number];

export type { Page };
export { pagesList };
