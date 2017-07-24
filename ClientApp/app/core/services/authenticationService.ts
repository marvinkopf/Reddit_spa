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

    public Login(username: string, password: string): Observable<void> {
        this.isLoggedIn = true;
        return Observable.empty<void>();
    }

    public Logout(): Observable<void> {
        this.isLoggedIn = false;
        return Observable.empty<void>();
    }

    public Register(username: string, password: string, email: string): Observable<void> {
        return Observable.throw("Server cannot be reached.");
    }

    public getUser(): ApplicationUser {
        if (this.user == null) {
            this.user = new ApplicationUser();
            this.user.userName = "Olaf";
            this.user.upvotedPosts = new Array<number>();
            this.user.downvotedPosts = new Array<number>();
        }

        if (this.IsLoggedIn())
            return this.user;

        return null;
    }
}