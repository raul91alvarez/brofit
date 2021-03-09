import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

 //foreing modules
import { SharedModule } from './core/shared_modules/shared.module';
import { AngularFireModule } from '@angular/fire';

import { AuthService } from './core/services/auth/auth.service';
import { NotFoundComponent } from './templates/not-found/not-found.component';
import { NotificationsService } from './core/services/notifications/notifications.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';






@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    
 
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    SharedModule,
    ToastrModule.forRoot(),
  ],
  providers: [AuthService, NotificationsService ,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
