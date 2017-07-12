import {Component, Input, Output, EventEmitter} from "@angular/core";
import { Post } from '../../core/domain/post';

@Component({
    selector: 'links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.css']
})
export class LinksComponent {
    @Input()
    posts: Post[];

    public UserUpvoted(post: Post): boolean {
        return false;
    }

    public UserDownvoted(post: Post): boolean {
        return false;
    }

    public Upvote(post: Post): void {
        console.log("call upvote");
    }

    public Downvote(post: Post): void {
        console.log("call downvote");
    }

    public TimePassed(date: number): string {
        return "<1min ago";
    }
}
