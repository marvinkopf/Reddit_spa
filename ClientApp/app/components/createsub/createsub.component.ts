import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from "@angular/core";
import { AuthenticationService } from "../../core/services/authenticationService";
import { SubredditService } from "../../core/services/subredditService";
import { Post } from "../../core/domain/post";
import { Subreddit } from "../../core/domain/subreddit";
import { Router } from '@angular/router';

@Component({
    selector: 'createsub',
    templateUrl: './createsub.component.html',
    styleUrls: ['./createsub.component.css']
})
export class CreateSubComponent implements OnInit {
    name: string;

    constructor(private authenticationService: AuthenticationService,
        private subredditService: SubredditService,
        private router: Router) { }

    ngOnInit() {
        if (!this.authenticationService.isLoggedIn)
            this.router.navigate(['/login'], { queryParams: { dest: 'subreddit/create' } });
    }

    submit(): void {
        if (this.name == null || this.name == "")
            return;

        let subreddit = new Subreddit();
        subreddit.name = this.name;

        this.subredditService.addSubreddit(subreddit).subscribe(() => null, () => null,
            () => this.router.navigateByUrl('/r/' + subreddit.name));
    }
}
