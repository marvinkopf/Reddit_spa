import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Comment } from "../domain/comment";
import "rxjs/Rx";

import { ApplicationUser } from "../domain/applicationUser";
import { Subreddit } from "../domain/subreddit";

@Injectable()
export class CommentService {
    comments: { [id: number]: Array<Comment> } = {};

    constructor(private http: Http) {
        for (let j = 0; j < 30; j++) {
            this.comments[j] = new Array<Comment>();
            for (let i = 0; i < 30; i++) {
                let comment = new Comment();
                comment.commentId = j + i;
                comment.postId = j;
                comment.text = i.toString();
                comment.creator = new ApplicationUser();
                comment.creator.userName = "Gustav";
                comment.created = Date.now();
                comment.score = i * 11;

                if (i > 0 && i % 2 == 0) {
                    comment.parentId = j + i - 1;
                }

                this.comments[j].push(comment);
            }
        }
    }

    public addComment(comment: Comment): Observable<Comment> {
        if (this.comments[comment.postId] == null)
            this.comments[comment.postId] = new Array<Comment>();

        comment.commentId = comment.postId +
            this.comments[comment.postId][this.comments[comment.postId].length - 1].commentId;

        this.comments[comment.postId].push(comment);
 
        return null;
    }

    public getComments(postId: number): Observable<Comment[]> {
        return Observable.create(observer => {
            observer.next(this.comments[postId]);
            observer.complete();
        });
    }

    public getCommentsFromUser(userId: number): Observable<Comment[]> {
        let comments = new Array<Comment>();

        for (let i = 0; i < 30; i++) {
            let comment = new Comment();
            comment.commentId = i;
            comment.text = i.toString();
            comment.creator = new ApplicationUser();
            comment.creator.userName = "Gustav";
            comment.created = Date.now();
            comment.score = i * 11;

            if (i > 0 && i % 2 == 0) {
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

    public upvote(comment: Comment) {

    }

    public downvote(comment: Comment) {

    }

    public clearVote(comment: Comment) {

    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}