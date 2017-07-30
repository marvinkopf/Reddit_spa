import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ModalService } from "../../core/services/modalService";
import { AuthenticationService } from "../../core/services/authenticationService";

import { ApplicationUser } from "../../core/domain/applicationUser";
import { Comment } from "../../core/domain/comment";

import { CommentService } from "../../core/services/commentService";

@Component({
    selector: 'comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent {
    @Input()
    comment: Comment;

    @Input()
    backgroundColor: string;

    showReply: boolean = false;
    replyText: string;
    showHideChildCommentsText: string = "hide child comments";
    showChildComments: boolean = true;
    isCollapsed: boolean = false;

    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService,
        private commentService: CommentService) { }

    showHideChildComments(): void {
        this.showChildComments = !this.showChildComments;
    }

    collapse(): void {
        this.isCollapsed = !this.isCollapsed;
    }

    reply(): void {
        let comment = new Comment();
        comment.postId = this.comment.postId;
        comment.text = this.replyText;
        comment.creator = new ApplicationUser();
        comment.creator.userName = "Gustav";
        comment.created = Date.now();
        comment.score = 1;
        comment.parentId = this.comment.commentId;
        comment.parent = this.comment;
        comment.children = new Array<Comment>();
        this.comment.children.push(comment);

        this.commentService.addComment(comment);

        this.showReply = false;
        this.replyText = '';
    }

    userLoggedIn(): boolean {
        return this.authenticationService.isLoggedIn;
    }

    userUpvoted(comment: Comment): boolean {
        if (!this.authenticationService.isLoggedIn)
            return false;
    }

    userDownvoted(comment: Comment): boolean {
        if (!this.authenticationService.isLoggedIn)
            return false;
    }

    upvote(comment: Comment): void {
        if (!this.authenticationService.isLoggedIn) {
            this.modalService.ShowLoginModal();
            return;
        }
    }

    downvote(comment: Comment): void {
        if (!this.authenticationService.isLoggedIn) {
            this.modalService.ShowLoginModal();
            return;
        }
    }

    doShowReply(): void {
        if (!this.authenticationService.isLoggedIn) {
            this.modalService.ShowLoginModal();
            return;
        }

        console.log(this.backgroundColor);

        this.showReply = true;
    }

    cancelReply(): void {
        this.showReply = false;
    }
}
