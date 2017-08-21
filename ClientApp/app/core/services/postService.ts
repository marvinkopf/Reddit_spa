import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Post } from "../domain/post";
import "rxjs/Rx";

import { ApplicationUser } from "../domain/applicationUser";
import { Subreddit } from "../domain/subreddit";

@Injectable()
export class PostService {
    posts: Post[] = new Array<Post>(30);

    constructor(private http: Http) {
        for (let i = 0; i < 30; i++) {
            this.posts[i] = new Post();
            this.posts[i].postId = i;
            this.posts[i].score = i * 100;
            this.posts[i].creator = new ApplicationUser();
            this.posts[i].creator.userName = "Gustav";
            this.posts[i].subreddit = new Subreddit();
            this.posts[i].subreddit.name = "news";
            this.posts[i].created = Date.now() + i;
            this.posts[i].urlToImage = "https://madeby.google.com/static/images/google_g_logo.svg";
            this.posts[i].title = i.toFixed();
            this.posts[i].link = "www.google.de";
        }
    }

    public addPost(post: Post): void {
        post.score = 0;
        post.created = Date.now();
        post.postId = this.posts[this.posts.length - 1].postId + 1;

        this.posts.push(post);

        return null;
    }

    public getNumberOfComments(post: Post): number {
        return 30;
    }

    public getPosts(): Observable<Post[]>;
    public getPosts(subreddit?: string): Observable<Post[]> {
        return Observable.create(observer => {
            observer.next(this.posts);
            observer.complete();
        });
    }

    public getPostsFromUser(userId: number): Observable<Post[]> {
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
            posts[i].link = "www.google.de";
        }

        return Observable.create(observer => {
            observer.next(posts);
            observer.complete();
        });
    }

    public getPost(id: number): Observable<Post> {
        return Observable.create(observer => {
            observer.next(this.posts.filter(post => post.postId == id)[0]);
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