import { type Page } from './pagesList';
import { ShareDictionary } from '@/internalization/app/dictionaries/share/dictionary';

export function filterPages({
 pages,
 searchedName,
 dic,
}: {
 pages: Page[];
 searchedName: string;
 dic: ShareDictionary['pages'];
}): Page[] {
 if (!searchedName) return pages;
 const newPages: Page[] = [];
 pages.forEach((page) => {
  const addedPage = { ...page };
  if (page.subPages) {
   addedPage.subPages = filterPages({
    pages: page.subPages,
    searchedName,
    dic,
   });
   if (addedPage.subPages?.length) newPages.push(addedPage);
  } else {
   if (dic[page.name].includes(searchedName)) newPages.push(addedPage);
  }
 });
 return newPages;
}
