import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User, Register } from '../models/user';

import { CONSTANST } from '../utils/constanst';

@Injectable()
export class AuthService {
    public loggedIn = new BehaviorSubject<boolean>(this.hasToken());

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    constructor(
        private router: Router,
        public http: HttpClient
    ) { }

    headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    });

    login(user: User) {
        if (user.email !== '' && user.password !== '') {
            return this.http
                .post(CONSTANST.routes.authorization.login, {
                    email: user.email,
                    password: user.password
                })
        }
    }
    register(register: Register) {
        return this.http
            .post(CONSTANST.routes.authorization.register,
                {
                    name: register.name,
                    email: register.email,
                    username: register.userName,
                    password: register.password
                }
            );
    }

    logout() {
        // this.authToken = null;
        // this.user = null;
        localStorage.clear();
        this.router.navigate(['/login']);
        // return this.http.get(CONSTANST.routes.authorization.logout, { headers: this.headers });
    }

    hasToken(): boolean {
        return !!localStorage.getItem('token');
    }
}
