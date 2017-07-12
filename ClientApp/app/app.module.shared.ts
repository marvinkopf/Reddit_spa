import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { LinksComponent } from './components/links/links.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginModalComponent } from './components/loginModal/loginModal.component';
import { NotFoundComponent } from './components/NotFound/notfound.component';
import { SubredditComponent } from './components/subreddit/subreddit.component';

import { AuthenticationService } from './core/services/authenticationService';

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
        SidebarComponent
    ],
    imports: [
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'r/:name', component: SubredditComponent },
            { path: '**', component: NotFoundComponent }
        ])
    ],
    providers: [AuthenticationService,
        Modal,
        Overlay,
        { provide: OverlayRenderer, useClass: DOMOverlayRenderer }]
};
