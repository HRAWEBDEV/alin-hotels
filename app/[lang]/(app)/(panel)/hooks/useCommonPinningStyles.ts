import { CSSProperties } from 'react';
import { Column } from '@tanstack/react-table';
import { LocaleInfo } from '@/internalization/app/localization';
import { useBaseConfig } from '@/services/base-config/baseConfigContext';

function getCommonPinningStyles<T>(
 column: Column<T[]>,
 dir: LocaleInfo['contentDirection'] = 'rtl',
): CSSProperties {
 const right = dir === 'rtl' ? 'left' : 'right';
 const left = dir === 'rtl' ? 'right' : 'left';
 const isPinned = column.getIsPinned();
 const isLastLeftPinnedColumn =
  isPinned === left &&
  (dir === 'rtl'
   ? column.getIsFirstColumn(left)
   : column.getIsLastColumn(left));
 const isFirstRightPinnedColumn =
  isPinned === right &&
  (dir === 'rtl'
   ? column.getIsLastColumn(right)
   : column.getIsFirstColumn(right));

 let leftPostion: string | undefined = undefined;
 let rightPosition: string | undefined = undefined;

 if (isPinned === left) {
  leftPostion =
   dir === 'rtl' ? `${column.getAfter(left)}px` : `${column.getStart(left)}px`;
 }

 if (isPinned === right) {
  rightPosition =
   dir === 'rtl'
    ? `${column.getStart(right)}px`
    : `${column.getAfter(right)}px`;
 }

 return {
  boxShadow: isLastLeftPinnedColumn
   ? '-2px 0 2px -2px gray inset'
   : isFirstRightPinnedColumn
     ? '2px 0 2px -2px gray inset'
     : undefined,
  left: leftPostion,
  right: rightPosition,
  opacity: isPinned ? 0.95 : 1,
  position: isPinned ? 'sticky' : undefined,
  width: column.getSize(),
 };
}

function useCommonPinningStyles() {
 const { localeInfo } = useBaseConfig();

 return <T>(column: Column<T[]>) => {
  return getCommonPinningStyles<T>(column, localeInfo.contentDirection);
 };
}

export { getCommonPinningStyles, useCommonPinningStyles };
