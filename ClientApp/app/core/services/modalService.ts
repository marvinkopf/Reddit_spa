import { LoginModalComponent } from '../../components/loginModal/loginModal.component';
import { Overlay, OverlayRenderer, DOMOverlayRenderer } from "angular2-modal";
import { overlayConfigFactory } from "angular2-modal";
import { ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { Injectable } from "@angular/core";

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

@Injectable()
export class ModalService {
    theme: VEXBuiltInThemes = <VEXBuiltInThemes>'default';
    @ViewChild('templateRef') public templateRef: TemplateRef<any>;
    
    constructor(public modal: Modal) {
    }

    public ShowLoginModal() {
        new DialogPresetBuilder<DialogPreset>(this.modal)
            .className(this.theme)
            .isBlocking(false)
            .content(LoginModalComponent)
            .open();
    }
}
