import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

// SERVICES
import { AuthService } from './../../../services/auth.service';

// ERROR MESSAGE
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    providers: []
})

export class RegisterComponent implements OnInit {
    form: FormGroup;
    private formSubmitAttempt: boolean;
    number: boolean = false;
    upper: boolean = false;
    lower: boolean = false;
    special: boolean = false;
    strength: String;
    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        public snack: MatSnackBar,
        private location: PlatformLocation
    ) {
    }

    ngOnInit() {
        if (localStorage.getItem('token')) {
            this.router.navigate(['/']);
        }

        this.form = this.fb.group({
            userName: new FormControl(null, [Validators.required]),
            name: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(inmar)\.com$")]),
            password: new FormControl(null, [Validators.required]),
        });
    }

    isFieldInvalid(field: string) {
        return (
            (!this.form.get(field).valid && this.form.get(field).touched) ||
            (this.form.get(field).untouched && this.formSubmitAttempt)
        );
    }

    onSubmit() {
        if (this.form.valid) {
            this.authService.register(this.form.value).subscribe((data: any) => {
                if (data.success) {
                    this.router.navigate(['/login']);
                } else {
                    console.log('Something went wrong');
                }
            });
        }
        this.formSubmitAttempt = true;
    }
    getEmailErrorMessage() {
        return this.form.controls.email.hasError('required') ? 'Email is required' :
            this.form.controls.email.hasError('email') ? 'enter correct email' : '';
    }
}
