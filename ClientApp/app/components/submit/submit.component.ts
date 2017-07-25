import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ModalService } from "../../core/services/modalService";
import { AuthenticationService } from "../../core/services/authenticationService";
import { Post } from "../../core/domain/post";
import { Subreddit } from "../../core/domain/subreddit";
import { PostService } from "../../core/services/postService";

@Component({
    selector: 'submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.css']
})
export class SubmitComponent {
    url: string;
    urlToImage: string;
    title: string;
    subreddit: string;

    constructor(private modalService: ModalService,
        private authenticationService: AuthenticationService,
        private postService: PostService) { }

    submit(): void {
        if (this.url == null ||
            this.urlToImage == null ||
            this.title == null ||
            this.subreddit == null)
            return;

        let post = new Post();
        post.creator = this.authenticationService.getUser();
        post.uri = this.url;
        post.uriToImage = this.urlToImage;
        post.title = this.title;

        let subreddit = new Subreddit();
        subreddit.name = this.subreddit;
        post.subreddit = subreddit;

        this.postService.addPost(post);
    }
}
