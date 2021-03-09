import { ClientInterface } from 'src/app/core/interfaces/interface';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-popup-edit-client',
  templateUrl: './popup-edit-client.component.html',
  styleUrls: ['./popup-edit-client.component.scss']
})
export class PopupEditClientComponent implements OnInit {

    public dataFromList: Array<ClientInterface>;

    // data form
    dataForm;
    check = false;
    checkPhone: boolean;
    public firstFormGroup: FormGroup;
    public secondFormGroup: FormGroup;
    date = new Date();
    currentDate: any;
  
      // date picker schedule
      public schedule: number = null;
      public birthday: boolean = false;
      

  constructor(public dialogRef: MatDialogRef<PopupEditClientComponent>, @Inject(MAT_DIALOG_DATA) public data, private _formBuilder: FormBuilder) { 
    this.firstFormGroup = this._formBuilder.group({
      cid: [data.cid],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      numberID: ['', Validators.required],
      birthday:[this.schedule],
      time: [''],      
      date: [data.date],
      active: [true],
      schedule: [this.birthday],
      pay:[data.pay],
      state:[data.state]
    })

    this.secondFormGroup = this._formBuilder.group({
      hospital: [''],
      sick: [''],
      observations: [''],
    })
  }

  get firstObj(): object { return this.firstFormGroup.value }
  get secondObj(): object { return this.secondFormGroup.value }
  get clientData() {

    return Object.assign({}, this.firstObj,this.secondObj);

  }

  onSubmit() {
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

  ngOnInit(): void {
  }

}
