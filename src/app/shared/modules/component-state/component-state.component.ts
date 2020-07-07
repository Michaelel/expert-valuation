import {Component, Input} from '@angular/core';
import { ComponentState } from './component-state.enum';

@Component({
    selector   : 'component-state',
    templateUrl: './component-state.component.html',
    styleUrls  : [ './component-state.component.sass' ],
})
export class StateComponent {
    @Input() state: ComponentState;
    @Input() loaderDiameter: number = 100;
    @Input() getData: Function;
    @Input() styles = {};

    readonly componentStateEnum = ComponentState;
}
