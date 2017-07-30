import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ModalService } from "../../core/services/modalService";
import { AuthenticationService } from "../../core/services/authenticationService";

@Component({
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService) { }

    login(): void {
        this.modalService.ShowLoginModal();
    }

    userLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn;
    }
}
