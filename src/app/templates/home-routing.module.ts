import { StatisticsComponent } from './statistics/statistics.component';
import { AccountComponent } from './account/account/account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ScheduleComponent } from './clients/schedule/schedule.component';

const routes: Routes = [
  {path: '' , component: HomeComponent,
  children: [
    {path:'', component: LandingPageComponent},
    {path:'clients', loadChildren: ()=>import('./clients/clients.module').then(m=>m.ClientsModule)},
    {path:'statistics', component: StatisticsComponent},
    {path:'account', component: AccountComponent },
    {path:'notifications', component: ScheduleComponent }
    
    
    
  ]  
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
