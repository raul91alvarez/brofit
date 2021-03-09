import { Subscription } from 'rxjs';
import { element } from 'protractor';
import { NotificationsInterface, StateInterface } from './../../../core/interfaces/interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { QueriesService } from 'src/app/core/services/queries/queries.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {

  public dataPending: Array<StateInterface>=[];
  public dataPendingBirthDay: Array<ClientData> =[];
  private Suscrip: Subscription[]=[];

  public data: Array<any>=[{description:"solid"},{description:"solid2"},{description:"solid3"}];
  messange: NotificationsInterface;


  constructor(private qs: QueriesService) { }
  ngOnDestroy(): void {
    this.Suscrip.forEach((res)=>{res.unsubscribe()})
  }

  // deletePending(data: StateInterface){
    
  // }


    // redirect to whatsApp web
    send(url:string,messange: NotificationsInterface){
      let temp = `*${messange.wellcome}:*%20%0A%0A*Informacion*:%20${messange.body}%20%0A%0A*Horarios*:%20${messange.time}%0A.` 
      let body = temp.trim();
      let send = url.concat(body);
      window.open(send);
    }
  
    sendMessange(data: StateInterface) {
      let phone = data.phone;
      let url = `https://api.whatsapp.com/send?phone=+598${phone}&text=`;
    
        this.send(url, this.messange);
      
    }

  drop(event: CdkDragDrop<any>) {
    moveItemInArray(this.data, event.previousIndex, event.currentIndex);
  }


  ngOnInit(): void {
    // recieve observer for badge notification clients
    this.Suscrip.push(this.qs.col$('states', ref => ref.where('state', '==', 0 ))
      .subscribe(async (res) => {
        this.dataPending  = await Object.values(res);
        
    }));

    // recieve observer to notifications birthday   
    this.Suscrip.push(this.qs.checkbirthday().subscribe((res)=>{
      this.dataPendingBirthDay  = Object.values(res);
    }));
    
    


}
  
  

}
