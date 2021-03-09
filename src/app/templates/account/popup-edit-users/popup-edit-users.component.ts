import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInterface } from 'src/app/core/interfaces/interface';

@Component({
  selector: 'app-popup-edit-users',
  templateUrl: './popup-edit-users.component.html',
  styleUrls: ['./popup-edit-users.component.scss']
})
export class PopupEditUsersComponent implements OnInit {

  
  public editForm: FormGroup;
  public verificPassword: FormControl;
  public checkPass:boolean;

  constructor(public dialogRef: MatDialogRef<PopupEditUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInterface, public formBuilder: FormBuilder) {

       // form edit user
       this.editForm= formBuilder.group({
        uid:[data.uid],
        displayName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        // position:['', Validators.required],
        disabled:[false, Validators.required],
        date:[Date.now()],
      }) 
      
      // verific credencial 
      this.verificPassword= new FormControl( [
        Validators.required,
        ]);
     }

     get f() { return this.editForm.controls; }
     get p() { return this.verificPassword; }
     get userData(){ return this.editForm.value}
 
     // confirm credentials 
   verificCredential(){
     let pass = this.editForm.controls.password.value;
     let confirm = this.verificPassword.value;
     if (pass === confirm) {
       this.checkPass=false;
     }else{
       this.checkPass=true;
     }
   }
 
   edit(): void {
     this.dialogRef.close(this.userData);
   }
 
   cancel(){
     this.dialogRef.close();
   }
 
   ngOnInit(): void {
    
      
   }
}
