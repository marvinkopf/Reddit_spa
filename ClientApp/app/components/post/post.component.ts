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

    ngOnInit() {
        this.sub = this.route.params.subscribe(params =>
            this.postService.getPost(params['postId']).subscribe(post =>
                this.post = post));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
