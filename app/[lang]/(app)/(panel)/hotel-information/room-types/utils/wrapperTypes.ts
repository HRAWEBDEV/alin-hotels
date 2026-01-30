export type WrapperTypes =
 | { mode: 'page' }
 | {
    mode: 'find';
    onChangeHotel: (personID: number) => unknown;
    roomTypeID?: number | null;
   };
