import {Component, Input, Output, EventEmitter} from "@angular/core";
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authenticationService';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})

export class LoginComponent {
    @Output()
    completeEvent = new EventEmitter();

    register_username: string;
    register_password: string;
    register_verifyPassword: string;
    register_email: string;

    login_username: string;
    login_password: string;

    registerErrorMessage: string;
    loginErrorMessage: string;

    constructor(private authenticationService: AuthenticationService) { }

    login(): void {
        this.registerErrorMessage = null;
        this.loginErrorMessage = null;

        if (this.login_username == null || this.login_password == null) {

            this.loginErrorMessage = "Fields missing.";
            return;
        }

        this.authenticationService.Login(this.login_username, this.login_password).subscribe(
            null,
            err => this.loginErrorMessage = err,
            () => this.completeEvent.next()
        );
    }

    register(): void {
        this.registerErrorMessage = null;
        this.loginErrorMessage = null;

        if (this.register_username == null || this.register_password == null ||
            this.register_email == null) {
            this.registerErrorMessage = "Fields missing.";
            return;
        }

        if (this.register_password != this.register_verifyPassword) {
            this.registerErrorMessage = "Passwords do not match."
        }

        this.authenticationService.Register(
            this.register_username,
            this.register_password,
            this.register_email).subscribe(
            null,
            err => this.registerErrorMessage = err,
            () => this.completeEvent.next()
            );
    }
}