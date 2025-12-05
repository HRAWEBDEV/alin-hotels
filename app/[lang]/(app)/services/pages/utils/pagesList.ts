type PageName = 'generalSetting' | 'test';
interface Page {
 name: PageName;
 subPages?: Page[];
}

const pagesList: Page[] = [
 {
  name: 'generalSetting',
  subPages: [
   {
    name: 'test',
   },
  ],
 },
];

export type { Page, PageName };
export { pagesList };
