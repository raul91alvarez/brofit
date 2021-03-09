import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuardGuard } from './core/guards/auth-guard.guard';
import { HomeComponent } from './templates/home.component';
import { NotFoundComponent } from './templates/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: AppComponent , pathMatch: "full"}, 

  {path:'home', loadChildren: ()=> import('./templates/home.module').then(m=>m.HomeModule)},
   

  { path: 'not-found', component: NotFoundComponent},
  { path: '**', redirectTo: 'not-found'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    enableTracing: false
  }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
