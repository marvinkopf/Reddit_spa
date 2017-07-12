import { Component } from '@angular/core';
import { ModalService } from '../../core/services/modalService';
import { ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css',
        './css/vex.css',
        './css/vex-theme-default.css',
        './css/vex-theme-os.css',
        './css/vex-theme-plain.css',
        './css/vex-theme-wireframe.css',
        './css/vex-theme-flat-attack.css',
        './css/vex-theme-top.css',
        './css/vex-theme-bottom-right-corner.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ModalService]
})
export class AppComponent {
}
