import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Post } from '../../core/domain/post';
import { AuthenticationService } from '../../core/services/authenticationService';
import { ModalService } from '../../core/services/modalService';
import { PostService } from '../../core/services/postService';

@Component({
    selector: 'links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.css']
})
export class LinksComponent {
    @Input()
    posts: Post[];

    postsByDate(): Post[] {
        return this.posts.sort((p1, p2) => {
            if (p1.created > p2.created)
                return -1;

            return 1;
        });
    }

    constructor(private authenticationService: AuthenticationService,
        private modalService: ModalService,
        private postService: PostService) { }

    isEmptyOrSpaces(str: string): boolean {
        return str === null || str.match(/^ *$/) !== null;
    }

    public login(): void {
        this.modalService.ShowLoginModal();
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

    public GetNumberOfComments(post: Post): number {
        return this.postService.GetNumberOfComments(post);
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
}
