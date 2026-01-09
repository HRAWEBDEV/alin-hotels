export type WrapperTypes =
 | { mode: 'page' }
 | {
    mode: 'find';
    onChangeHotel: (personID: number) => unknown;
    hotelID?: number | null;
   };
