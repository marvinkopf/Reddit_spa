import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { ModalService } from "../../core/services/modalService";
import { AuthenticationService } from "../../core/services/authenticationService";
import { UserService } from "../../core/services/userService";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'userpage',
    templateUrl: './userpage.component.html',
    styleUrls: ['./userpage.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
    // Cache the params observable to unsubscribe on destroy
    sub: any;
    userExists: boolean = false;

    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let name = (params['name']);
            let user = this.userService.GetUser(name);
            if (user == null)
                this.router.navigateByUrl('./NotFound', { skipLocationChange : true });
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
