import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../utils/shared.module';

import { GroupComponent } from './group.component';
import { FormsComponent } from './forms/forms.component';

@NgModule({
    imports: [
        RouterModule,
        SharedModule
    ],
    declarations: [
        GroupComponent,
        FormsComponent
    ],
    providers: [],
    entryComponents: [
        FormsComponent
    ],
    exports: []
})
export class GroupModule {
}