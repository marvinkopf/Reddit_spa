import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ModalService } from "../../core/services/modalService";
import { AuthenticationService } from "../../core/services/authenticationService";

@Component({
    selector: 'submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.css']
})
export class SubmitComponent {
    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService) { }
}
