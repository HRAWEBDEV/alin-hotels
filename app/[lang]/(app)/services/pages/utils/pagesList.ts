type PageName = 'general-settings' | 'users';

interface Page {
 name: PageName;
 subPages?: Page[];
}

const pagesList: Page[] = [
 {
  name: 'general-settings',
  subPages: [
   {
    name: 'users',
   },
  ],
 },
];

export type { Page, PageName };
export { pagesList };
