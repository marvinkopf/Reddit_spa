import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ModalService } from "../../core/services/modalService";
import { AuthenticationService } from "../../core/services/authenticationService";

import { ApplicationUser } from "../../core/domain/applicationUser";
import { Comment } from "../../core/domain/comment";

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

    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService) { }

    public Reply(): void {
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

        this.showReply = false;
        this.replyText = '';
    }

    public UserLoggedIn(): boolean {
        return this.authenticationService.IsLoggedIn();
    }

    public UserUpvoted(comment: Comment): boolean {
        if (!this.authenticationService.IsLoggedIn())
            return false;
    }

    public UserDownvoted(comment: Comment): boolean {
        if (!this.authenticationService.IsLoggedIn())
            return false;
    }

    public Upvote(comment: Comment): void {
        if (!this.authenticationService.IsLoggedIn()) {
            this.modalService.ShowLoginModal();
            return;
        }
    }

    public Downvote(comment: Comment): void {
        if (!this.authenticationService.IsLoggedIn()) {
            this.modalService.ShowLoginModal();
            return;
        }
    }

    public ShowReply(): void {
        if (!this.authenticationService.IsLoggedIn()) {
            this.modalService.ShowLoginModal();
            return;
        }

        console.log(this.backgroundColor);

        this.showReply = true;
    }

    public CancelReply(): void {
        this.showReply = false;
    }
}
