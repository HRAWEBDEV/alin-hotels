interface Page {
 readonly name: string;
 readonly subPages?: Page[];
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
] as const;

export type { Page };
export { pagesList };
