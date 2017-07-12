import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { Overlay, OverlayRenderer, DOMOverlayRenderer } from "angular2-modal";
import { overlayConfigFactory } from "angular2-modal";
import {
    VEXBuiltInThemes,
    Modal,
    DialogPreset,
    DialogFormModal,
    DialogPresetBuilder,
    VEXModalContext,
    VexModalModule,
    providers
} from 'angular2-modal/plugins/vex';
import { FormsModule } from '@angular/forms';

import { LoginModalComponent } from '../loginModal/loginModal.component';
import { AuthenticationService } from '../../core/services/authenticationService';


@Component({
    selector: 'nav-menu',
    templateUrl: './navmenu.component.html',
    styleUrls: ['./navmenu.component.css'],
    providers: [Modal, Overlay, { provide: OverlayRenderer, useClass: DOMOverlayRenderer }]
})
export class NavMenuComponent {
    theme: VEXBuiltInThemes = <VEXBuiltInThemes>'default';
    @ViewChild('templateRef') public templateRef: TemplateRef<any>;

    constructor(public modal: Modal,
        private authenticationService: AuthenticationService) {
    }

    UserLoggedIn(): boolean {
        return this.authenticationService.IsLoggedIn();
    }

    login(): void {
        new DialogPresetBuilder<DialogPreset>(this.modal)
            .className(this.theme)
            .isBlocking(false)
            .content(LoginModalComponent)
            .open();
    }

    logoff(): void {
        this.authenticationService.Logout();
    }
}
