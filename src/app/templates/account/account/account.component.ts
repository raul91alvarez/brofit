import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/core/interfaces/interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { QueriesService } from 'src/app/core/services/queries/queries.service';
import { SweeterAlert2 } from 'src/app/core/shared_modules/sweeteralert2';
import { PopupEditUsersComponent } from '../popup-edit-users/popup-edit-users.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit,AfterViewInit {

  public userForm: FormGroup;
  public userName:string;
  public checkUserDuple:boolean=false;
  public panelOpenState = false;
  checked: boolean = false;

  public verificPassword: FormControl;
  public checkPass:boolean = false;

  public data: UserInterface;
  public dataUsers: UserInterface[];
  public sizeDataUsers:number;

  displayedColumns: string[] = ['name', 'mail', 'dateCreate', 'state', 'actions'];
  public sweetalert = new SweeterAlert2();

  // suscriptions observables 
  public suscription: Subscription[] = [];


  constructor(
    private qs: QueriesService,
    public dialog: MatDialog,
    private ns: NotificationsService, 
    private formBuilder: FormBuilder, 
    private as: AuthService) 
    {
    this.userForm = formBuilder.group({
      uid:[this.as.generateid(10)],
      displayName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['',  Validators.minLength(6)],
      disabled: [false],
      date: [Date.now()]
    })
     // verific credencial 
     this.verificPassword= new FormControl( '',[
      Validators.minLength(6),
      ]);
  }

  ngAfterViewInit(): void {
    this.qs.getIndex("Gestionar Usuario");
  }


  get f() { return this.userForm.controls; }
  get p() { return this.verificPassword; }
  get userData() { return this.userForm.value}

  onresetForm() {
    this.userForm.reset();
    this.verificPassword.reset();
    this.checkPass = false;
  }

  async onSubmit() {
    await this.as.addUsers(this.userData);
    this.onresetForm();
  }

  //actions in table 
  onEdit(element: UserInterface) {
    this.onPopup(element);
  }

  onDelete(uid: string) {
    this.sweetalert.delete()
      .then(result => {
        if (result.value) {
          this.as.deleteUsers(uid);
        }
      })
  }

  // show popup for edit user 
  onPopup(element: UserInterface): void {
    const dialogRef = this.dialog.open(PopupEditUsersComponent,
      {
        
        width:'43%',
        data: {
          uid: element.uid,
          displayName: element.displayName,
          email: element.email,
          password: element.password,
          disabled: element.disabled,
        }
      });
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.as.updateUser(result);
      } else {
        this.ns.showInfo("Actualización no realizada", "Información");
      }
    })
  }

  // verific data user twist 
  verificUser(){
    this.qs.col$('users', ref => ref.where("email", "==", this.userName))
    .subscribe(async (res) => {
      if (res.length!=0) {
        this.checkUserDuple=true;
      }else{this.checkUserDuple=false}

    })
  }

  // verific data user twist 
  verificCredential(){
    let pass = this.userForm.controls.password.value;
    let confirm = this.verificPassword.value;
    if (pass === confirm) {
      this.checkPass=true;
    }else{
      this.checkPass=false;
    }
  }

  async ngOnInit() {


    // list in real time
    this.suscription.push( this.as.getListUsers()
      .subscribe(async actionArray => {
        this.dataUsers = await actionArray.map(item => {
          return {
            ...item.payload.doc.data()
          } as UserInterface;
        });
        this.sizeDataUsers = this.dataUsers.length;
        
      })
      )

  }

    // destroy suscriptions observables 
  ngOnDestroy(): void {
    this.suscription.forEach((s)=>{s.unsubscribe();});
    this.qs.getIndex("");
  }

}
