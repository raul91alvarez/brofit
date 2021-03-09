import { Subscription, Observable } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef } from '@angular/material/dialog';
import { QueriesService } from 'src/app/core/services/queries/queries.service';
import { ClientInterface, NotificationsInterface } from 'src/app/core/interfaces/interface';

@Component({
  selector: 'app-popup-create-client',
  templateUrl: './popup-create-client.component.html',
  styleUrls: ['./popup-create-client.component.scss']
})
export class PopupCreateClientComponent implements OnInit, OnDestroy {
  // data form
  dataForm;
  check = false;
  checkPhone: boolean;
  public firstFormGroup: FormGroup;
  public secondFormGroup: FormGroup;
  public checkWhatsApp: FormControl;
  date = new Date();
  currentDate: any; 
  public checkCIDuple: Boolean = false;
  public CI: Number;

  private subscription: Subscription[]=[];
  private messange: NotificationsInterface;
  

    // date picker schedule
    public schedule: number = null;
    public birthday: boolean = false;


  constructor(
    public dialogRef: MatDialogRef<PopupCreateClientComponent>,
    private _formBuilder: FormBuilder, 
    private qs: QueriesService) {

    this.currentDate = this.date.toUTCString();
    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      numberID: ['', Validators.required],
      birthday:[null],
      time: [''],      
      date: [this.currentDate, Validators.required],
      active: [true, Validators.required],
      schedule: [false],
      pay:[false],
      state:[0]
    })

    this.secondFormGroup = this._formBuilder.group({
      hospital: [''],
      sick: [''],
      observations: [''],
    })
    
    this.checkWhatsApp = new FormControl(true);
  }


  get firstObj(): object { return this.firstFormGroup.value }
  get secondObj(): object { return this.secondFormGroup.value }
  get clientData() {

    return Object.assign({}, this.firstObj,this.secondObj);

  }

  // get notifications messange 
 async getMessangeNewCllients(){
    
    this.qs.getMessange().forEach(async(res)=>{
      this.messange = await res.data();
      console.log(this.messange);
    });
    
  }
  


  // redirect to whatsApp web
  send(url:string,messange: NotificationsInterface){
    let temp = `*${messange.wellcome}:*%20%0A%0A*Informacion*:%20${messange.body}%20%0A%0A*Horarios*:%20${messange.time}%0A.` 
    let body = temp.trim();
    let send = url.concat(body);
    window.open(send);
  }

  onSubmit() {
    let phone = this.firstFormGroup.controls.phone.value;
    let url = `https://api.whatsapp.com/send?phone=+598${phone}&text=`;
    if (this.checkWhatsApp.value) {
      this.send(url, this.messange);
    } 
    this.dialogRef.close(this.clientData);

     
  }

  cancel() {
    this.dialogRef.close();
  }

    // change focus of checkbok
    changeFocusSchedule(){
      this.firstFormGroup.controls.birthday.setValue(false);
    }

   // date picker
   dateSchedule(event: MatDatepickerInputEvent<Date>) {
    this.schedule = event.value.valueOf();
    this.firstFormGroup.controls.birthday.reset();
    this.firstFormGroup.controls.birthday.setValue(this.schedule);
  }

  // verific data user twist 
  verificCI(){
    // verific number iD > min length (8)
   if (this.CI > 9999999 ) {
    this.subscription.push(this.qs.col$('clients', ref => ref.where("numberID", "==", this.CI))
    .subscribe(async (res) => {
      if (res.length!=0) {
        this.checkCIDuple=true;
      }else{this.checkCIDuple=false}

    })) 
   }

  }


  ngOnInit(): void {
    this.getMessangeNewCllients();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((res)=>{res.unsubscribe()});
  }

}
