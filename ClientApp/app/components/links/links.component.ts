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
}
