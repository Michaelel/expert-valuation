import { ComponentState } from './component-state.enum';

export interface StateComponentInterface {
    state: ComponentState;
    getData?: Function;
}
