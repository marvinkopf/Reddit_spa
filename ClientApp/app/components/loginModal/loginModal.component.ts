import { Component, ViewEncapsulation } from '@angular/core';

import { ModalComponent, DialogRef } from 'angular2-modal';
import { DialogPreset } from 'angular2-modal/plugins/vex';
import { FormsModule } from '@angular/forms';

import { AuthenticationService } from '../../core/services/authenticationService';

@Component({
    selector: 'login-modal',
    templateUrl: './loginModal.component.html',
    styleUrls: ['./loginModal.component.css',
        './css/vex.css',
        './css/vex-theme-default.css',
        './css/vex-theme-os.css',
        './css/vex-theme-plain.css',
        './css/vex-theme-wireframe.css',
        './css/vex-theme-flat-attack.css',
        './css/vex-theme-top.css',
        './css/vex-theme-bottom-right-corner.css'],
    encapsulation: ViewEncapsulation.None,
})

export class LoginModalComponent implements ModalComponent<DialogPreset> {
    public context: DialogPreset;

    constructor(public dialog: DialogRef<DialogPreset>) {
        this.context = dialog.context;
    }

    close(): void {
        this.dialog.close();
    }
}