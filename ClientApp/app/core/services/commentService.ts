import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Comment } from "../domain/comment";
import "rxjs/Rx";

import { ApplicationUser } from "../domain/applicationUser";
import { Subreddit } from "../domain/subreddit";

@Injectable()
export class CommentService {

    constructor(private http: Http) { }

    public addComment(comment: Comment): Observable<Comment> {
        return null;
    }
    
    public getComments(postId: number): Observable<Comment[]> {
        let comments = new Array<Comment>();

        for (let i = 0; i < 30; i++) {
            let comment = new Comment();
            comment.commentId = i;
            comment.postId = postId;
            comment.text = i.toString();
            comment.creator = new ApplicationUser();
            comment.creator.userName = "Gustav";
            comment.created = Date.now();
            comment.score = i * 11;

            if (i > 0 && i % 2 == 0)
            {
                comment.parentId = i - 1;
            }

            comments.push(comment);
        }

        return Observable.create(observer => {
            observer.next(comments);
            observer.complete();
        });
    }

    public GetCommentsFromUser(userId: number): Observable<Comment[]> {
        let comments = new Array<Comment>();

        for (let i = 0; i < 30; i++) {
            let comment = new Comment();
            comment.commentId = i;
            comment.text = i.toString();
            comment.creator = new ApplicationUser();
            comment.creator.userName = "Gustav";
            comment.created = Date.now();
            comment.score = i * 11;

            if (i > 0 && i % 2 == 0)
            {
                comment.parentId = i - 1;
            }

            comments.push(comment);
        }

        return Observable.create(observer => {
            observer.next(comments);
            observer.complete();
        });
    }

    public remove(comment: Comment) {
        return null;
    }

    public Upvote(comment: Comment) {

    }

    public Downvote(comment: Comment) {

    }

    public ClearVote(comment: Comment) {

    } 

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}