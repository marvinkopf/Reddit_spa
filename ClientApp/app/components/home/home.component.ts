import * as ng from "@angular/core";
import {Component, Input, Output, EventEmitter} from "@angular/core";
import { Post } from '../../core/domain/post';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements ng.OnInit {
    posts: Post[] = new Array<Post>();

    ngOnInit() {
        this.posts = new Array<Post>(new Post(), new Post());
        this.posts[0].title = "1";
        this.posts[0].score = 100;
        this.posts[1].score = 100;
        this.posts[1].title = "2";
    }
}
