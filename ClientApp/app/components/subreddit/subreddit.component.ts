import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { PostService } from '../../core/services/postService';
import { Post } from '../../core/domain/post';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'subreddit',
    templateUrl: './subreddit.component.html',
    styleUrls: ['./subreddit.component.css'],
    providers: [PostService]
})
export class SubredditComponent implements OnInit, OnDestroy {
    posts: Post[] = new Array<Post>();

    // Cache the params observable to unsubscribe on destroy
    sub: any;

    constructor(private postService: PostService, private route: ActivatedRoute,
        private titleService: Title) { }

    ngOnInit() {
        this.postService.getPosts().subscribe(posts => this.posts = posts);

        this.sub = this.route.params.subscribe(params =>
            this.titleService.setTitle('reddit: ' + params['name']));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
