import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { of as observableOf } from 'rxjs/observable/of';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';

import { Router } from '@angular/router';

import { Contact } from '../../models/Contact';
import { ContactService } from '../../services/contact.service';
import { AuthService } from '../../services/auth.service';

// DIALOGS
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmComponent } from '../../components/confirm/confirm.component';
import { FormsComponent } from './forms/forms.component';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css'],
    providers: [ContactService]
})
export class ContactComponent implements AfterViewInit {
    displayedColumns = ['groupID', 'name', 'email', 'phone', , 'status', '_id'];
    dataSource = new MatTableDataSource();

    resultsLength = 0;

    pageEvent: PageEvent;
    pageSizeOptions = [5, 10, 25, 100];
    pageSize = 5;
    page = 1;
    isLoading = false;
    isTotalReached = false;
    totalItems = 0;
    search = '';
    groups: any;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private cdr: ChangeDetectorRef,
        private contactService: ContactService,
        private authService: AuthService,
        private router: Router,
        public dialog: MatDialog,
        public snack: MatSnackBar
    ) { }

    ngOnInit() {
        if (!this.authService.loggedIn.getValue()) {
            this.router.navigate(['/login']);
        }
    }

    ngAfterViewInit() {
        this.getData();
        this.dataSource.sort = this.sort;
        this.dataSource.sortingDataAccessor = (data, header) => data[header];
        this.dataSource.paginator = this.paginator;
    }

    ngAfterViewChecked() {
        this.cdr.detectChanges();
    }

    openSnack(data) {
        this.snack.openFromComponent(SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    }

    onPaginateChange(event) {
        this.page = event.pageIndex + 1;
        this.pageSize = event.pageSize;
        this.getData();
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.search = filterValue;
        this.dataSource.filter = filterValue;
    }

    // GET CONTACT
    getData() {
        this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoading = true;
                    return this.contactService!
                        .getList(
                            this.sort.direction,
                            this.pageSize,
                            this.page,
                            this.search
                        );
                }),
                map(data => {
                    this.isLoading = false;
                    this.isTotalReached = false;
                    this.totalItems = data.data.length;
                    return data.data;
                }),
                catchError(() => {
                    this.isLoading = false;
                    this.isTotalReached = true;
                    return observableOf([]);
                })
            ).subscribe(data => this.dataSource.data = data);
    }

    // EDIT CONTACT
    edit(row: Contact): void {
        let dialogRef = this.dialog.open(FormsComponent, {
            height: '450px',
            width: '600px',
            data: { title: 'Edit Contact', action: 'edit', data: row }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.paginator._changePageSize(this.paginator.pageSize);
        });
    }

    // SAVE CONTACT
    save(): void {
        let dialogRef = this.dialog.open(FormsComponent, {
            height: '450px',
            width: '600px',
            data: { title: 'Add Contact', action: 'save' }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result)
                this.paginator._changePageSize(this.paginator.pageSize);
        });
    }

    // DELETE CONTACT
    delete(row) {
        let dialogRef = this.dialog.open(ConfirmComponent, {
            width: '250px',
            data: {
                title: 'Confirm to Delete',
                message: 'are you sure, want to delete ?'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.contactService.delete(row._id).subscribe((data: any) => {
                    if (data.success) {
                        this.paginator._changePageSize(this.paginator.pageSize);
                        this.openSnack(data);
                    } else {
                        this.openSnack(data);
                    }
                });
            }
        });
    }

}
