
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { PanicComponent } from 'src/app/core/shared_component/panic/panic.component';
import { SharedModule } from 'src/app/core/shared_modules/shared.module';
import { DetailsClientsComponent } from './details-clients/details-clients.component';
import { ClientService } from 'src/app/core/services/client/client.service';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { PopupCreateClientComponent } from './popup-create-client/popup-create-client/popup-create-client.component';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { PopupEditClientComponent } from './popup-edit-client/popup-edit-client/popup-edit-client.component';
import { PaymentsService } from 'src/app/core/services/payments/payments.service';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { StateClientPipe } from 'src/app/core/pipes/state-client.pipe';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [ClientsComponent, DetailsClientsComponent,PopupCreateClientComponent, PopupEditClientComponent, StateClientPipe],
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,
    CdkScrollableModule,
    ScrollingModule,
    MatMomentDateModule,   // calendar
    MatDatepickerModule,    // calendar
    DragDropModule
  ],
  entryComponents: [
    PopupCreateClientComponent,
    PopupEditClientComponent

  ],
  providers: [ClientService, NotificationsService, PaymentsService,
  //se calendar in spanish 
  {
    provide: MAT_DATE_LOCALE, useValue: 'es-ES'
  },
  {
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },
  {
    provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS
  }
  ],
})
export class ClientsModule { }
