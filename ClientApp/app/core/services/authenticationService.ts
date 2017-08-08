import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { ApplicationUser } from "../domain/applicationUser";

@Injectable()
export class AuthenticationService {
    _isLoggedIn: boolean = false;
    user: ApplicationUser;

    constructor(private http: Http) { }

    get isLoggedIn(): boolean {
        return this._isLoggedIn;
    }

    public login(username: string, password: string): Observable<void> {
        let data = { UserName: username, Password: password };
        let body = JSON.stringify(data);
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });

        return Observable.create(observer => {
            this.http.post("account/login", body, options)
                .subscribe(response => {
                    if (response.status == 204)
                        observer.error();
                    else
                        this._isLoggedIn = true;
                }, null, () => observer.complete());
        });
    }

    public logout(): Observable<void> {
        return Observable.create(observer => {
            this.http.post("account/logout", null)
                .subscribe(response => {
                    this._isLoggedIn = false;
                }, null, () => observer.complete());
        });
    }

    public register(username: string, password: string, email: string): Observable<void> {
        let data = { UserName: username, Password: password, confirmPassword: password };
        let body = JSON.stringify(data);
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });

        return Observable.create(observer => {
            this.http.post("account/register", body, options)
                .subscribe(response => {
                    this._isLoggedIn = true;
                }, null, () => observer.complete());
        });
    }

    public getUser(): ApplicationUser {
        if (this.user == null) {
            this.user = new ApplicationUser();
            this.user.userName = "Olaf";
            this.user.upvotedPosts = new Array<number>();
            this.user.downvotedPosts = new Array<number>();
        }

        if (this.isLoggedIn)
            return this.user;

        return null;
    }
}