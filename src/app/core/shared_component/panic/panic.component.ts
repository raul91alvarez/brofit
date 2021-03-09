import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-panic',
  templateUrl: './panic.component.html',
  styleUrls: ['./panic.component.scss']
})
export class PanicComponent implements OnInit {

  @Input() home: boolean = false ;
  @Input() clients: boolean = false ;
  @Input() statistics: boolean = false ;
  @Input() notification: boolean = false;
  @Input() users: boolean = false ;

  constructor(private router: Router) { }

  // router of navigations for menu 
  navigateHome(){
    this.router.navigateByUrl("/home")
  }
  navigateClients(){
    this.router.navigateByUrl("/home/clients")
  }
  navigateStatistics(){
    this.router.navigateByUrl("/home/statistics")
  }
  navigateNotifications(){
    this.router.navigateByUrl("/home/notifications")
  }
  navigateUsers(){
    this.router.navigateByUrl("/home/account")
  }

  ngOnInit(): void {
  }

}
