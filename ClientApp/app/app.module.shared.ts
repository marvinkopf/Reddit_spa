import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title }  from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { LinksComponent } from './components/links/links.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginModalComponent } from './components/loginModal/loginModal.component';
import { NotFoundComponent } from './components/NotFound/notfound.component';
import { SubredditComponent } from './components/subreddit/subreddit.component';
import { UserPageComponent } from './components/userpage/userpage.component';
import { SubmitComponent } from './components/submit/submit.component';
import { PostComponent } from './components/post/post.component';
import { CreateSubComponent } from './components/createsub/createsub.component';
import { CommentComponent } from './components/comment/comment.component';
import { LoginComponent } from './components/login/login.component';
import { PrivacyPolicyComponent } from './components/privacypolicy/privacypolicy.component';

import { AuthenticationService } from './core/services/authenticationService';
import { UserService } from './core/services/userService';
import { PostService } from './core/services/postService';
import { CommentService } from './core/services/commentService';
import { SubredditService } from './core/services/subredditService';

import { Overlay, OverlayRenderer, DOMOverlayRenderer } from "angular2-modal";
import { overlayConfigFactory } from "angular2-modal";
import { ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import {
    VEXBuiltInThemes,
    Modal,
    DialogPreset,
    DialogFormModal,
    DialogPresetBuilder,
    VEXModalContext,
    VexModalModule,
    providers
} from 'angular2-modal/plugins/vex';

import { CookieLawModule } from 'angular2-cookie-law';

export const sharedConfig: NgModule = {
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        LinksComponent,
        HomeComponent,
        LoginModalComponent,
        NotFoundComponent,
        SubredditComponent,
        SidebarComponent,
        CommentComponent,
        UserPageComponent,
        SubmitComponent,
        PostComponent,
        CreateSubComponent,
        LoginComponent,
        PrivacyPolicyComponent
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'r/:name', component: SubredditComponent },
            { path: 'r/:name/comments/:postId', component: PostComponent},
            { path: 'u/:name', redirectTo: 'user/:name'},
            { path: 'user/:name', component: UserPageComponent },
            { path:'submit', component: SubmitComponent },
            { path:'subreddits/create', component: CreateSubComponent },
            { path: 'login', component: LoginComponent },
            { path: 'privacypolicy', component: PrivacyPolicyComponent },
            { path: '**', component: NotFoundComponent }
        ]),
        CookieLawModule
    ],
    providers: [
        AuthenticationService,
        UserService,
        PostService,
        CommentService,
        SubredditService,
        Title,
        Modal,
        Overlay,
        { provide: OverlayRenderer, useClass: DOMOverlayRenderer }]
};
