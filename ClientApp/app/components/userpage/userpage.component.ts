import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { ModalService } from "../../core/services/modalService";
import { AuthenticationService } from "../../core/services/authenticationService";
import { UserService } from "../../core/services/userService";
import { PostService } from "../../core/services/postService";
import { Post } from "../../core/domain/post";
import { Comment } from "../../core/domain/comment";
import { CommentService } from "../../core/services/commentService";
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationUser } from "../../core/domain/applicationUser";

@Component({
    selector: 'userpage',
    templateUrl: './userpage.component.html',
    styleUrls: ['./userpage.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
    // Cache the params observable to unsubscribe on destroy
    sub: any;
    userExists: boolean = false;
    user: ApplicationUser;
    posts: Post[];
    comments: Comment[];

    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private postService: PostService,
        private commentService: CommentService) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            let name = (params['name']);
            this.user = this.userService.GetUser(name);
            if (this.user == null)
                this.router.navigateByUrl('./NotFound', { skipLocationChange: true });

            this.postService.getPostsFromUser(0).subscribe(posts => this.posts = posts);
            this.commentService.GetCommentsFromUser(0).subscribe(comments => this.comments = comments);
        });
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

    public TimePassed(date: number): string {
        return "<1min";
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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
