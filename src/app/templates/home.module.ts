import { PanicComponent } from 'src/app/core/shared_component/panic/panic.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AuthService } from '../core/services/auth/auth.service';
import { NotificationsService } from '../core/services/notifications/notifications.service';
import { SharedModule } from '../core/shared_modules/shared.module';
import { FooterComponent } from '../core/shared_component/footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AccountComponent } from './account/account/account.component';
import { QueriesService } from '../core/services/queries/queries.service';
import { PopupEditUsersComponent } from './account/popup-edit-users/popup-edit-users.component';
import { StateUsersPipe } from '../core/pipes/state-users.pipe';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { StatisticsComponent } from './statistics/statistics.component';
import { ScheduleComponent } from './clients/schedule/schedule.component';







@NgModule({
  declarations: [HomeComponent, PanicComponent,FooterComponent,LandingPageComponent, AccountComponent, PopupEditUsersComponent, StateUsersPipe, StatisticsComponent,ScheduleComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CdkScrollableModule, // for scroll within Material list components
    ScrollingModule,     // for scroll within Material list components
    
  ],
  entryComponents:[PopupEditUsersComponent, PanicComponent],
  providers: [AuthService, NotificationsService, QueriesService],
})
export class HomeModule { }
