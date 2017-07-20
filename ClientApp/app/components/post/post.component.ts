import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { ModalService } from "../../core/services/modalService";
import { AuthenticationService } from "../../core/services/authenticationService";
import { Post } from "../../core/domain/post";
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../core/services/postService';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
    post: Post;
    sub: any;

    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private postService: PostService) { }

    public login(): void {
        this.modalService.ShowLoginModal();
    }

    public UserLoggedIn(): boolean {
        return this.authenticationService.IsLoggedIn();
    }

    public UserUpvoted(post: Post): boolean {
        if (!this.authenticationService.IsLoggedIn())
            return false;

        for (let i = 0; i < this.authenticationService.getUser().upvotedPosts.length; i++) {
            if (this.authenticationService.getUser().upvotedPosts[i] == post.postId)
                return true;
        }

        return false;
    }

    public UserDownvoted(post: Post): boolean {
        if (!this.authenticationService.IsLoggedIn())
            return false;

        for (let i = 0; i < this.authenticationService.getUser().downvotedPosts.length; i++) {
            if (this.authenticationService.getUser().downvotedPosts[i] == post.postId)
                return true;
        }

        return false;
    }

    public Upvote(post: Post): void {
        if (!this.authenticationService.IsLoggedIn()) {
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

    public Downvote(post: Post): void {
        if (!this.authenticationService.IsLoggedIn()) {
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

    public TimePassed(date: number): string {
        return "<1min";
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params =>
            this.postService.getPost(params['postId']).subscribe(post =>
                this.post = post));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
