import { Component, ViewEncapsulation } from '@angular/core';

import { ModalComponent, DialogRef } from 'angular2-modal';
import { DialogPreset } from 'angular2-modal/plugins/vex';
import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../../core/services/authenticationService';

@Component({
    selector: 'login-modal',
    templateUrl: './loginModal.component.html',
    styleUrls: ['./loginModal.component.css'],
    encapsulation: ViewEncapsulation.None,
})

export class LoginModalComponent implements ModalComponent<DialogPreset> {
    public context: DialogPreset;

    register_username: string;
    register_password: string;
    register_verifyPassword: string;
    register_email: string;

    login_username: string;
    login_password: string;

    constructor(public dialog: DialogRef<DialogPreset>,
        private authenticationService: AuthenticationService) {
        this.context = dialog.context;
    }

    login(): void {
        this.authenticationService.Login(this.login_username, this.login_password);
        this.dialog.close();
    }

    register(): void {
        this.authenticationService.Login(this.login_username, this.login_password);
        this.dialog.close();
    }
}