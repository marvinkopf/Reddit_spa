import {Component, Input, Output, EventEmitter} from "@angular/core";
import { Post } from '../../core/domain/post';

@Component({
    selector: 'links',
    templateUrl: './links.component.html'
})
export class LinksComponent {
    @Input()
    posts: Post[];
}
