import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// FILTER
import { AuthGuard } from './guards/auth.guard';
import {
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    NotFoundComponent,
    GroupComponent,
    UserComponent,
} from './utils/index.pages';

// LAYOUTS
import { AdminLayoutComponent } from './modules/admin-layout/admin-layout.component';
import { LoginLayoutComponent } from './modules/login-layout/login-layout.component';

// ROUTES
const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: GroupComponent },
            { path: 'contact', component: ContactComponent }
        ]
    },
    {
        path: '',
        component: LoginLayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: '404', component: NotFoundComponent },
            { path: '**', redirectTo: '/404' }
        ]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

