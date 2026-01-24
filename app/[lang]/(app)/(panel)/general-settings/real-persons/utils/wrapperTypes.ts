import { Tab } from '../services/personsConfigContext';
export type WrapperTypes =
 | { mode: 'page' }
 | {
    mode: 'find';
    defaultTab?: Tab;
    justEditTab?: boolean;
    onChangePerson: (personID: number) => unknown;
    personID?: number | null;
   };
