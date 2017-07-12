import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

@Injectable()
export class AuthenticationService {
    isLoggedIn: boolean = false;

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
}