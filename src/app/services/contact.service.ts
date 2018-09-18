import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { CONSTANST } from '../utils/constanst';
import { Contact } from '../models/Contact';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContactService {
    loading: boolean = true;

    constructor(
        private router: Router,
        public http: HttpClient
    ) { }

    headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    });
    getGroupList() {
        return this.http.get<ContactApi>(CONSTANST.routes.contact.grouplist, { headers: this.headers });
    }

    getList(order: string, pageSize: number, page: number, search: string) {
        let params = new HttpParams();
        params = params.append('order', order);
        params = params.append('search', search);
        params = params.append('pageSize', pageSize.toString());
        params = params.append('page', page.toString());

        return this.http.get<ContactApi>(CONSTANST.routes.contact.list, { headers: this.headers, params: params });
    }

    delete(id: number) {
        return this.http.delete(
            CONSTANST.routes.contact.delete.replace(':id', String(id)),
            { headers: this.headers }
        );
    }

    save(contact: Contact) {
        return this.http
            .post(CONSTANST.routes.contact.save,
                {
                    name: contact.name,
                    email: contact.email,
                    phone: contact.phone,
                    groupID: contact.groupID,
                    status: contact.status,
                    _id: contact.id
                },
                { headers: this.headers }
            );
    }
}

export interface ContactApi {
    success: boolean,
    data: Contact[],
    total: number,
    pageSize: number,
    page: number
}