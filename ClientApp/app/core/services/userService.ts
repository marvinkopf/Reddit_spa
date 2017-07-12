import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { ApplicationUser } from "../domain/applicationUser";

@Injectable()
export class UserService {
    constructor(private http: Http) { }

    public GetUser(name: string): ApplicationUser {
        return null;
    }
}