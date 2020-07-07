import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { StateComponent } from './component-state.component';

@NgModule({
    declarations: [
        StateComponent,
    ],
    imports     : [
        CommonModule,
        MaterialModule,
    ],
    exports     : [
        StateComponent,
    ],
})
export class ComponentStateModule {
}
