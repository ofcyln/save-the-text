import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from './core/core.module';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { TextAreaComponent } from './components/text-area/text-area.component';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { SaveTheTextState } from './store/state/save-the-text.state';
import { AutoSaveComponent } from './components/auto-save/auto-save.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { HistoryListComponent } from './components/right-panel/history-list/history-list.component';
import { ShareComponent } from './components/right-panel/share/share.component';
import { DarkModeConfiguratorComponent } from './components/right-panel/dark-mode-configurator/dark-mode-configurator.component';
import { RightPanelOpenerComponent } from './components/right-panel-opener/right-panel-opener.component';
import { HistoryComponent } from './components/right-panel/history-list/history/history.component';

@NgModule({
  declarations: [
    AppComponent,
    TextAreaComponent,
    AutoSaveComponent,
    RightPanelOpenerComponent,
    RightPanelComponent,
    HistoryListComponent,
    ShareComponent,
    DarkModeConfiguratorComponent,
    RightPanelOpenerComponent,
    HistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    NgxsModule.forRoot([SaveTheTextState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      // Do not collapse log groups
      collapsed: false,
      // Do not log in production mode
      disabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
