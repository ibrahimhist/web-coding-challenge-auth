import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  NgxUiLoaderHttpModule,
} from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { MaterialModule } from '@shared/modules/material/material.module';
import { CoreModule } from './core/core.module';
import { VoteCatComponent } from './pages/vote-cat/vote-cat.component';
import { MessageHandlingService } from './shared/services/message-handling.service';
import { BaseHttpService } from './shared/services/base-http.service';
import { OpenApiService } from './shared/services/open-api.service';
import { AuthService } from './shared/services/auth.service';
import { StorageService } from './shared/services/storage.service';
import { LoginGuard } from './shared/guards/login.guard';
import { UserService } from './shared/services/user.service';
import { LoadingService } from './shared/services/loading.service';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  hasProgressBar: false,
  overlayColor: 'rgba(40,40,40,.1)',
};

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    VoteCatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    CoreModule,
  ],
  providers: [
    BaseHttpService,
    MessageHandlingService,
    OpenApiService,
    AuthService,
    StorageService,
    LoginGuard,
    UserService,
    LoadingService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
