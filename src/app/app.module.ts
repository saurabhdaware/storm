import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from './/app-routing.module';
import { LaunchComponent } from './launch/launch.component';

import {LaunchService} from './services/launch.service';
import {MainService} from './services/main.service';

import { SmokeComponent } from './launch/smoke/smoke.component';
import { FireComponent } from './launch/fire/fire.component';
import { BackgroundComponent } from './launch/background/background.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent,
    LaunchComponent,
    SmokeComponent,
    FireComponent,
    BackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [LaunchService, MainService],
  bootstrap: [AppComponent]
})
export class AppModule { }
