export type WrapperTypes =
 | { mode: 'page' }
 | {
    mode: 'find';
    onChangePerson: (personID: number) => unknown;
    personID?: number | null;
   };
