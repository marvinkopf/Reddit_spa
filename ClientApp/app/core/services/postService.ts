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

    public addPost(post: Post): Observable<Post> {
        return null;
    }

    public getPosts(): Observable<Post[]>;
    public getPosts(subreddit?: string): Observable<Post[]> {
        let posts = new Array<Post>(30);

        for (let i = 0; i < 30; i++) {
            posts[i] = new Post();
            posts[i].postId = i;
            posts[i].score = i * 100;
            posts[i].creator = new ApplicationUser();
            posts[i].creator.userName = "Gustav";
            posts[i].subreddit = new Subreddit();
            posts[i].subreddit.name = "news";
            posts[i].created = Date.now();
            posts[i].title = i.toFixed();
            posts[i].uri = "www.google.de";
        }

        return Observable.create(observer => {
            observer.next(posts);
            observer.complete();
        });
    }

    public getPost(id: number): Observable<Post> {
        let posts = new Array<Post>(30);

        for (let i = 0; i < 30; i++) {
            posts[i] = new Post();
            posts[i].postId = i;
            posts[i].score = i * 100;
            posts[i].creator = new ApplicationUser();
            posts[i].creator.userName = "Gustav";
            posts[i].subreddit = new Subreddit();
            posts[i].subreddit.name = "news";
            posts[i].created = Date.now();
            posts[i].title = i.toFixed();
            posts[i].uri = "www.google.de";
        }

        return Observable.create(observer => {
            observer.next(posts[id]);
            observer.complete();
        });}

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