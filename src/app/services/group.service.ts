import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { CONSTANST } from '../utils/constanst';
import { Group } from '../models/Group';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class GroupService {
    loading: boolean = true;

    constructor(
        private router: Router,
        public http: HttpClient
    ) { }

    headers = new HttpHeaders({

        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    });

    getList(order: string, pageSize: number, page: number, search: string) {
        let params = new HttpParams();
        params = params.append('order', order);
        params = params.append('search', search);
        params = params.append('pageSize', pageSize.toString());
        params = params.append('page', page.toString());

        return this.http.get<GroupApi>(CONSTANST.routes.group.list, { headers: this.headers, params: params });
    }

    delete(id: number) {
        return this.http.delete(
            CONSTANST.routes.group.delete.replace(':id', String(id)),
            { headers: this.headers }
        );
    }

    save(group: Group) {
        return this.http
            .post(CONSTANST.routes.group.save,
                {
                    groupname: group.groupname,
                    status: group.status,
                    _id: group.id
                },
                { headers: this.headers }
            );
    }
}

export interface GroupApi {
    success: boolean,
    data: Group[],
    total: number,
    pageSize: number,
    page: number
}