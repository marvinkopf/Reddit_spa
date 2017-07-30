import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LoginModalComponent } from '../loginModal/loginModal.component';
import { AuthenticationService } from '../../core/services/authenticationService';
import { ModalService } from '../../core/services/modalService';


@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css']
})
export class NavMenuComponent {
    constructor(private authenticationService: AuthenticationService,
     private modalService: ModalService) {
    }

    userLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn;
    }

    login(): void {
        this.modalService.ShowLoginModal();
    }

    logoff(): void {
        this.authenticationService.logout();
    }

    getUserName(): string {
        return this.authenticationService.getUser().userName;
    }
}
