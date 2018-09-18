import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { SharedModule } from './utils/shared.module';


import { AppRoutingModule } from "./app.routes";


import { AuthGuard } from './guards/auth.guard';


import './rxjs-operators';

// COMPONENTS
import { AppComponent } from './components/app/app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';

// SERVICES
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { GroupService } from './services/group.service';
import { ContactService } from './services/contact.service';

import { UserComponent } from './modules/user/user.component';
import { AdminLayoutModule } from './modules/admin-layout/admin-layout.module';
import { LoginLayoutModule } from './modules/login-layout/login-layout.module';
import { RegisterComponent } from './modules/login-layout/register/register.component';
import { GroupModule } from './modules/group/group.module';
import { ContactModule } from './modules/contact/contact.module';

import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
@NgModule({
    declarations: [
        NotFoundComponent,
        UserComponent,
        ConfirmComponent,
        SnackbarComponent,
        RegisterComponent,
        AppComponent
    ],
    imports: [ /*DECLARACIÓN DE MODULOS*/
        SharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        AdminLayoutModule,
        LoginLayoutModule,
        GroupModule,
        ContactModule,
        MatPasswordStrengthModule.forRoot()
    ],
    providers: [
        AuthGuard,
        AuthService,
        UserService,
        ContactService,
        GroupService
    ],
    entryComponents: [
        ConfirmComponent,
        SnackbarComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
