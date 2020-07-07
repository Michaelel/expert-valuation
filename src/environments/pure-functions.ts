import { ComponentState } from '../app/shared/modules/component-state/component-state.enum';

export const defineState = (items: any[]): ComponentState => {
    if (!items) {
        return ComponentState.Error;
    } else if (items.length > 0) {
        return ComponentState.Success;
    } else {
        return ComponentState.Empty;
    }
};
