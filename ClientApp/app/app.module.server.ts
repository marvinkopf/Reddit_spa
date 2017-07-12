import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { sharedConfig } from './app.module.shared';
import { FormsModule } from '@angular/forms';
import { VexModalModule } from 'angular2-modal/plugins/vex';

@NgModule({
    bootstrap: sharedConfig.bootstrap,
    declarations: sharedConfig.declarations,
    imports: [
        ServerModule,
        FormsModule,
        VexModalModule,
        ...sharedConfig.imports
    ],
    providers: [sharedConfig.providers]
})
export class AppModule {
}
