import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';

import { ModalModule } from 'angular2-modal';

import { LoginModalComponent } from './components/loginModal/loginModal.component';
import { VexModalModule } from 'angular2-modal/plugins/vex';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieLawModule } from 'angular2-cookie-law';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        VexModalModule,
        BrowserAnimationsModule,
        CookieLawModule,
        ...sharedConfig.imports
    ],
    providers: [
        { provide: 'ORIGIN_URL', useValue: location.origin },
        sharedConfig.providers
    ],
    entryComponents: [LoginModalComponent]
})
export class AppModule {
}
