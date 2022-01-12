import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    CoreModule,
  ],
  providers: [
    BaseHttpService,
    MessageHandlingService,
    OpenApiService,
    AuthService,
    StorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
