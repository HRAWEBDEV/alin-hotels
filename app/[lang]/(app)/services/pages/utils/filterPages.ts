import { type Pages, type Page } from './pagesList';
import { ShareDictionary } from '@/internalization/app/dictionaries/share/dictionary';

type FilteredPages = Partial<{
 [k in keyof Pages]: Partial<Pages[k]>;
}>;

export function filterPages({
 pages,
 searchedName,
 dic,
}: {
 pages: Pages;
 searchedName: string;
 dic: ShareDictionary['pages'];
}): Partial<FilteredPages> {
 if (!searchedName) return pages;
 const newPages: FilteredPages = {};

 Object.keys(pages).forEach((pageKey) => {
  const typedPageKey = pageKey as keyof Pages;
  Object.keys(pages[typedPageKey]).forEach((subPageKey) => {
   const typedSubPageKey = subPageKey as Page['name'];
   const doesIncludeSearchedText = dic[typedSubPageKey].includes(searchedName);
   if (doesIncludeSearchedText) {
    if (!(typedPageKey in newPages)) {
     newPages[typedPageKey] = {};
    }
    newPages[typedPageKey as 'general-settings']![typedSubPageKey as 'users'] =
     pages[typedPageKey as 'general-settings'][typedSubPageKey as 'users'];
   }
  });
 });

 return newPages;
}
