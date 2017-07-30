import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { ModalService } from "../../core/services/modalService";
import { AuthenticationService } from "../../core/services/authenticationService";
import { Post } from "../../core/domain/post";
import { Comment } from "../../core/domain/comment";
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../core/services/postService';
import { CommentService } from '../../core/services/commentService';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
    post: Post;
    comments: Comment[];
    sub: any;

    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private postService: PostService,
        private commentService: CommentService) { }

    login(): void {
        this.modalService.ShowLoginModal();
    }

    userLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn;
    }

    userUpvoted(post: Post): boolean {
        if (!this.authenticationService.isLoggedIn)
            return false;

        for (let i = 0; i < this.authenticationService.getUser().upvotedPosts.length; i++) {
            if (this.authenticationService.getUser().upvotedPosts[i] == post.postId)
                return true;
        }

        return false;
    }

    userDownvoted(post: Post): boolean {
        if (!this.authenticationService.isLoggedIn)
            return false;

        for (let i = 0; i < this.authenticationService.getUser().downvotedPosts.length; i++) {
            if (this.authenticationService.getUser().downvotedPosts[i] == post.postId)
                return true;
        }

        return false;
    }

    upvote(post: Post): void {
        if (!this.authenticationService.isLoggedIn) {
            this.modalService.ShowLoginModal();
            return;
        }

        for (let i = 0; i < this.authenticationService.getUser().upvotedPosts.length; i++) {
            if (this.authenticationService.getUser().upvotedPosts[i] == post.postId) {
                // User wants to clear vote
                this.authenticationService.getUser().upvotedPosts.splice(i, 1);
                return;
            }
        }

        for (let i = 0; i < this.authenticationService.getUser().downvotedPosts.length; i++) {
            if (this.authenticationService.getUser().downvotedPosts[i] == post.postId) {
                // remove downvote
                this.authenticationService.getUser().downvotedPosts.splice(i, 1);
            }
        }

        this.authenticationService.getUser().upvotedPosts.push(post.postId);
    }

    downvote(post: Post): void {
        if (!this.authenticationService.isLoggedIn) {
            this.modalService.ShowLoginModal();
            return;
        }

        for (let i = 0; i < this.authenticationService.getUser().downvotedPosts.length; i++) {
            if (this.authenticationService.getUser().downvotedPosts[i] == post.postId) {
                // User wants to clear vote
                this.authenticationService.getUser().downvotedPosts.splice(i, 1);
                return;
            }
        }

        for (let i = 0; i < this.authenticationService.getUser().upvotedPosts.length; i++) {
            if (this.authenticationService.getUser().upvotedPosts[i] == post.postId) {
                // remove upvote
                this.authenticationService.getUser().upvotedPosts.splice(i, 1);
            }
        }

        this.authenticationService.getUser().downvotedPosts.push(post.postId);
    }

    timePassed(date: number): string {
        return "<1min";
    }

    getParentComments(): Comment[] {
        let comments = new Array<Comment>();

        for (let i = 0; i < this.comments.length; i++)
            if (this.comments[i].parentId == undefined)
                comments.push(this.comments[i]);

        return comments;
    }

    getNumberOfComments(): number {
        return this.postService.getNumberOfComments(this.post);
    }

    isEmptyOrSpaces(str: string): boolean {
        return str === null || str.match(/^ *$/) !== null;
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.postService.getPost(params['postId']).subscribe(post =>
                this.post = post);
            this.commentService.getComments(params['postId']).subscribe(comments => {
                this.comments = comments;

                for (let i = 0; i < this.comments.length; i++)
                {
                    this.comments[i].children = new Array<Comment>();
                    for (let j = 0; j < this.comments.length; j++)
                        if (this.comments[i].commentId == this.comments[j].parentId) {
                            this.comments[i].children.push(this.comments[j]);
                            this.comments[j].parent = this.comments[i];
                        }
                }
            })
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
