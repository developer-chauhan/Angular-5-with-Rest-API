import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { SnackbarComponent } from '../../../components/snackbar/snackbar.component';

@Component({
    selector: 'app-forms',
    templateUrl: './forms.component.html',
    styleUrls: ['./forms.component.css']
})

export class FormsComponent {
    frm: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<FormsComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
        private fb: FormBuilder,
        private groupService: GroupService,
        public snack: MatSnackBar
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit() {
        this.initializeForm();
    }

    openSnack(data) {
        this.snack.openFromComponent(SnackbarComponent, {
            data: { data: data },
            duration: 3000
        });
    }

    initializeForm() {
        if (this.data.action == 'edit') {
            console.log('this.data.data.', this.data.data);

            this.frm = this.fb.group({
                groupname: new FormControl(this.data.data.groupname, [Validators.required, Validators.minLength(3)]),
                status: new FormControl(this.data.data.status.toString(), [Validators.required]),
                id: new FormControl(this.data.data._id)
            });
        } else {
            this.frm = new FormGroup({
                groupname: new FormControl(null, [Validators.required, Validators.minLength(3)]),
                status: new FormControl(null, [Validators.required]),
                id: new FormControl(null)
            });
        }
    }

    save(form: FormGroup) {
        console.log(form.value);
        this.groupService.save(form.value).subscribe((data: any) => {
            if (data.success) {
                this.dialogRef.close(true);
                this.openSnack(data);
            } else {
                this.openSnack(data);
            }
        });
    }

    getGroupNameErrorMessage() {
        return this.frm.controls.groupname.hasError('required') ? 'Group Name is required' :
            this.frm.controls.groupname.hasError('minlength') ? 'name should be minimum 3 character long' : '';
    }
    getStatusErrorMessage() {
        return this.frm.controls.status.hasError('required') ? 'Status is required' : '';

    }
}
