import { ModalService } from '../../core/services/modalService';
import { ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [ModalService]
})
export class AppComponent implements OnInit {
    constructor(private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle('reddit');
    }
}
