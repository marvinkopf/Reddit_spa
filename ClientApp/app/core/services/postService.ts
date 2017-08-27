import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Post } from "../domain/post";
import "rxjs/Rx";

import { ApplicationUser } from "../domain/applicationUser";
import { Subreddit } from "../domain/subreddit";

@Injectable()
export class PostService {
    constructor(private http: Http) { }

    public addPost(post: Post): void {
        let body = JSON.stringify(post);
        let headers = new Headers({
            "Content-Type": "application/json; charset=utf-8",
            "Accept": "application/json"
        });
        let options = new RequestOptions({ headers: headers });

        this.http.post('http://localhost:5000/api/post', body, options)
            .subscribe(null, null, null);

        return null;
    }

    public getNumberOfComments(post: Post): number {
        return 30;
    }

    public getPosts(): Observable<Post[]>;
    public getPosts(subreddit?: string): Observable<Post[]> {
        return this.http.get('http://localhost:5000/top').map(result => result.json());
    }

    public getPostsFromUser(userId: number): Observable<Post[]> {
        return null;
    }

    public getPost(id: number): Observable<Post> {
        return this.http.get('http://localhost:5000/api/post/' + id).map(result => result.json());
    }

    public removePost(post: Post) {
        return null;
    }

    public Upvote(post: Post) {

    }

    public Downvote(post: Post) {

    }

    public ClearVote(post: Post) {

    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}