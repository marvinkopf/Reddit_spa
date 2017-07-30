import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { PostService } from '../../core/services/postService';
import { Post } from '../../core/domain/post';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subreddit } from '../../core/domain/subreddit';
import { SubredditService } from '../../core/services/subredditService';

@Component({
    selector: 'subreddit',
    templateUrl: './subreddit.component.html',
    styleUrls: ['./subreddit.component.css']
})
export class SubredditComponent implements OnInit, OnDestroy {
    posts: Post[] = new Array<Post>();
    subreddit: Subreddit;

    // Cache the params observable to unsubscribe on destroy
    sub: any;

    constructor(private postService: PostService, private route: ActivatedRoute,
        private titleService: Title, private subredditService: SubredditService) { }

    ngOnInit() {
        this.postService.getPosts().subscribe(posts => this.posts = posts);

        this.sub = this.route.params.subscribe(params => {
            this.titleService.setTitle('reddit: ' + params['name']);
            this.subredditService.getSubreddit(params['name']).subscribe(subreddit =>
                this.subreddit = subreddit);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
