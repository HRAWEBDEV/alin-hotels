import { Tab } from '../services/personsConfigContext';
export type WrapperTypes =
 | { mode: 'page' }
 | {
    mode: 'find';
    defaultTab?: Tab;
    onChangePerson: (personID: number) => unknown;
    personID?: number | null;
   };
