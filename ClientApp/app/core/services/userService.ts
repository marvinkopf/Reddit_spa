import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { ApplicationUser } from "../domain/applicationUser";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    users: ApplicationUser[];

    public GetUser(name: string): ApplicationUser {
        if (this.users == null) {
            this.users = new Array<ApplicationUser>();
            let user = new ApplicationUser();
            user.userName = "Gustav";
            this.users.push(user);
        }

        if (name == "Gustav")
            return this.users[0];

        return null;
    }
}