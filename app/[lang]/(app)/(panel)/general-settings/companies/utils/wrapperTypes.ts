import { Tab } from '../services/personsConfigContext';

export type WrapperTypes =
 | { mode: 'page' }
 | {
    mode: 'find';
    justEditTab?: boolean;
    defaultTab?: Tab;
    onChangePerson: (personID: number) => unknown;
    personID?: number | null;
   };
