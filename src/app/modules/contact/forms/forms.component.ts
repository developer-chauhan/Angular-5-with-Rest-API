import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.css']
})

export class FormsComponent {
    frm: FormGroup;
    groups: any;
    constructor(
        public dialogRef: MatDialogRef<FormsComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
        private fb: FormBuilder,
        private contactService: ContactService,
        public snack: MatSnackBar
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {

        this.getGroup();
    }
    getGroup() {
        this.contactService.getGroupList().subscribe(data => {
            if (data) {
                this.groups = data['group'];
                this.initializeForm();
            } else {
                console.log('Something went wrong');
            }

        });
    }
    openSnack(data) {
        this.snack.openFromComponent(SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    }

    initializeForm() {
        if (this.data.action == 'edit') {
            this.frm = this.fb.group({
                groupID: new FormControl(this.data.data.groupID._id, [Validators.required]),
                name: new FormControl(this.data.data.name, [Validators.required, Validators.minLength(3)]),
                email: new FormControl(this.data.data.email, [Validators.required, Validators.email]),
                phone: new FormControl(this.data.data.phone, [Validators.required, Validators.min(10)]),
                status: new FormControl(this.data.data.status.toString(), [Validators.required]),
                id: new FormControl(this.data.data._id)
            });
        } else {
            this.frm = new FormGroup({
                groupID: new FormControl(this.groups, [Validators.required]),
                name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
                email: new FormControl(null, [Validators.required, Validators.email]),
                phone: new FormControl(null, [Validators.required, Validators.min(10)]),
                status: new FormControl(null, [Validators.required]),
                id: new FormControl(null)
            });
        }
    }

    save(form: FormGroup) {
        this.contactService.save(form.value).subscribe((data: any) => {
            if (data.success) {
                this.dialogRef.close(true);
                this.openSnack(data);
            } else {
                this.openSnack(data);
            }
        });
    }

    getNameErrorMessage() {
        return this.frm.controls.name.hasError('required') ? 'Name is required' :
            this.frm.controls.name.hasError('minlength') ? 'Name should be minimum 3 character long' : '';
    }
    getGroupIDErrorMessage() {
        return this.frm.controls.groupID.hasError('required') ? 'Group is required' : '';
    }
    getEmailErrorMessage() {
        return this.frm.controls.email.hasError('required') ? 'Email is required' : '';
    }
    getPhoneErrorMessage() {
        return this.frm.controls.phone.hasError('required') ? 'Phone is required' : '';
    }
    getStatusErrorMessage() {
        return this.frm.controls.status.hasError('required') ? 'Status is required' : '';
    }
}
