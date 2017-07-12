import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { ApplicationUser } from "../domain/applicationUser";

@Injectable()
export class AuthenticationService {
    isLoggedIn: boolean = false;
    user: ApplicationUser;

    constructor(private http: Http) { }

    public IsLoggedIn(): boolean {
        return this.isLoggedIn;
    }

    public Login(username: string, password: string): boolean {
        return this.isLoggedIn = true;
    }

    public Logout(): void {
        this.isLoggedIn = false;
    }

    public getUser(): ApplicationUser {
        if (this.user == null) {
            this.user = new ApplicationUser();
            this.user.userName = "Olaf";
            this.user.upvotedPosts = new Array<number>();
        }

        if (this.IsLoggedIn())
            return this.user;

        return null;
    }
}