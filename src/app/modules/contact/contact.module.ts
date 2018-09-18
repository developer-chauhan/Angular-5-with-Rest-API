import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../utils/shared.module';

import { ContactComponent } from './contact.component';
import { FormsComponent } from './forms/forms.component';

@NgModule({
    imports: [
        RouterModule,
        SharedModule
    ],
    declarations: [
        ContactComponent,
        FormsComponent
    ],
    providers: [],
    entryComponents: [
        FormsComponent
    ],
    exports: []
})
export class ContactModule {
}