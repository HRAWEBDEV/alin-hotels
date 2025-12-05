type PageName = 'generalSetting' | 'users';
interface Page {
 name: PageName;
 subPages?: Page[];
}

const pagesList: Page[] = [
 {
  name: 'generalSetting',
  subPages: [
   {
    name: 'users',
   },
  ],
 },
];

export type { Page, PageName };
export { pagesList };
