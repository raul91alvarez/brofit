import { ClientInterface } from 'src/app/core/interfaces/interface';

import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StateInterface } from '../core/interfaces/interface';
import { AuthService } from '../core/services/auth/auth.service';
import { NotificationsService } from '../core/services/notifications/notifications.service';
import { QueriesService } from '../core/services/queries/queries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public indexPage:string = "";
  
  //data user
  public uid:string;
  public mail:string;
  public displayName:string;

  // notification bell
  public hideBadge = true;
  public accountBadge:number = 0;

  // data of pending notifications
  public dataPendingClient: Array<StateInterface>;
  public dataPendingBirthday: Array<ClientInterface>

  constructor(private qs: QueriesService,private as:AuthService, private ns:NotificationsService, private router: Router) { }

  // logout
  outSession(){
    this.as.logoutUser();
  }

    //subscribe observable for return user inside
    dataUser(){
      this.as.getUser().subscribe((s)=>{
        if (s != null) {
          this.uid = s.uid;
        this.mail = s.email;
        this.displayName=s.displayName;
        }
        
      })
    }

    // send messange to cliente pending pay 
    sendPending(data: StateInterface){
      
    }

    // details of pending
    onPopupDetailsPending(data: StateInterface){
      
    }

    // delete pending
    deletePending(data: StateInterface){
      
    }



  ngOnInit(): void {
    this.dataUser();

    // recieve observer for badge notification clients
    this.qs.col$('states', ref => ref.where('state', '==', 0 ))
      .subscribe(async (res) => {
        this.dataPendingClient  = await Object.values(res);
        this.accountBadge = this.dataPendingClient.length;
        this.qs.subjetPending.next(this.dataPendingClient);
    });

    // recieve observer to notifications birthday   
    this.qs.checkbirthday().subscribe((res)=>{
      this.dataPendingBirthday  = Object.values(res);
      this.accountBadge = this.accountBadge + this.dataPendingBirthday.length;
      this.qs.subjetBirthday.next(this.dataPendingBirthday);
    })




  }

  ngAfterViewInit() { 
    setTimeout(() => {
      this.qs.sendIndexObservable$.subscribe(url=>{
        this.indexPage= url; 
      });
    });
}

}
