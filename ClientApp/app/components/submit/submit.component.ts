import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { AuthenticationService } from "../../core/services/authenticationService";
import { Post } from "../../core/domain/post";
import { Subreddit } from "../../core/domain/subreddit";
import { PostService } from "../../core/services/postService";
import { Router } from '@angular/router';

@Component({
    selector: 'submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
    url: string;
    urlToImage: string;
    title: string;
    subreddit: string;

    constructor(private authenticationService: AuthenticationService,
        private postService: PostService,
        private router: Router) { }

    ngOnInit() {
        if (!this.authenticationService.IsLoggedIn())
            this.router.navigate(['/login'], { queryParams: { dest: 'submit' } });
    }

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
