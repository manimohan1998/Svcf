import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {SocialSharing} from '@ionic-native/social-sharing/ngx'
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {Network} from '@ionic-native/network/ngx'
import {Dialogs} from '@ionic-native/dialogs/ngx'
import { WebIntent } from '@ionic-native/web-intent/ngx';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './core/interceptor';
import { MaterialModule } from  './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    MaterialModule,
     IonicModule.forRoot(), 
     AppRoutingModule,
     ReactiveFormsModule,
     FormsModule,
     HttpClientModule,
     BrowserAnimationsModule,
    
    ],
     
  providers: [
    Interceptor,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    StatusBar,
    SplashScreen,
    Network,
    Dialogs,WebIntent,
    SocialSharing,
    LocalNotifications,
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
