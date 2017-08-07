import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/Rx";

import { ApplicationUser } from "../domain/applicationUser";
import { Subreddit } from "../domain/subreddit";

@Injectable()
export class SubredditService {
    subreddits: { [id: string]: Subreddit } = {};

    constructor(private http: Http) {
        let subreddit = new Subreddit();
        subreddit.name = "news";
        subreddit.description = "All kind of news.";

        this.subreddits["news"] = subreddit;
    }

    public addSubreddit(subreddit: Subreddit): Observable<void> {
        this.subreddits[subreddit.name] = subreddit;
        return Observable.empty<void>();
    }

    public getSubreddits(): Observable<{ [id: string]: Subreddit }> {
        return Observable.create(observer => {
            observer.next(this.subreddits);
            observer.complete();
        });
    }

    public getSubreddit(name: string): Observable<Subreddit> {
        return Observable.create(observer => {
            observer.next(this.subreddits[name]);
            observer.complete();
        });
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}