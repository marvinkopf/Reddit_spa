import * as ng from "@angular/core";
import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Post } from '../../core/domain/post';
import { PostService } from '../../core/services/postService';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements ng.OnInit {
    posts: Post[] = new Array<Post>();

    constructor(private postService: PostService) { }

    ngOnInit() {
        this.postService.getPosts().subscribe(posts => this.posts = posts);
    }
}
