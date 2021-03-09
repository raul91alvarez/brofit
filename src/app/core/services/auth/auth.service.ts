import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../interfaces/interface';
import { NotificationsService } from '../notifications/notifications.service';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersRef: AngularFirestoreCollection<UserInterface> = null;
  // private tempCollection: AngularFirestoreCollection<UserInterface> = null;
  private authRef= "users";

  constructor(
    private ns:NotificationsService,
    private router: Router,
    public afsAuth: AngularFireAuth,
    private dbUsers: AngularFirestore
  ) { 
    this.usersRef = dbUsers.collection(this.authRef);
  }

    //******generate cripto random value*******
    dec2hex(dec) {
      return ('0' + dec.toString(16)).substr(-2)
    }
  
    // generateId :: Integer -> String
    generateid(len) {
      var arr = new Uint8Array((len || 40) / 2)
      window.crypto.getRandomValues(arr)
      return Array.from(arr, this.dec2hex).join('')
    }


// login user
  loginEmailUser(mail: string, pass: string) {
    return this.afsAuth.setPersistence('session')
        .then(() => {
          return this.afsAuth.signInWithEmailAndPassword(mail, pass)
            .then(() => {
              this.ns.showSuccess("Sesión iniciada", "Exito")
              this.router.navigateByUrl('home')
            })
            .catch(() => { this.ns.showError("Verifique sus credenciales", "Error") })
        })
    
  }

   //logout
   logoutUser() {
    this.afsAuth.signOut()
      .then(() => { this.ns.showSuccess("Sesion terminada", "Exito"), this.router.navigateByUrl('/') })
      .catch(() => { alert('No se pudo ejecutar el logout') });

  }

   //check if is auth and redirect at app.component, then this component redirect at login
   isAuth():Observable<object> {
    return this.afsAuth.authState;
  }

    // get profile user 
  getUser() {
    return this.afsAuth.user;
  }

  
  //create user from firestore to authentication firebase
  addUsers(data: UserInterface) {
    this.usersRef.doc(data.uid).set({
      uid: data.uid,
      email: data.email,
      displayName: data.displayName,
      password: data.password,
      disabled: data.disabled,
      date: data.date
    })
      .then(() => {
        this.ns.showSuccess("Usuario creado", "Exito");
      })
      .catch((err) =>
        console.log(err));
    return false;
  }

      // clean data of users from DB
      deleteUsers(cid: string){
        this.usersRef.doc(cid).delete()
        .then( ()=>{ 
          this.ns.showSuccess("Usuario eliminado satisfactoriamente","Exito")
        })
        .catch((err)=>{console.log(err)})
      }

    //update user 
    updateUser(user: UserInterface) {
      this.usersRef.doc(user.uid).update({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        password: user.password,
        disabled: user.disabled,
      })
        .then(() => {
          this.ns.showSuccess("Usuario actualizado", "Exito");
        })
        .catch((err) =>
          console.log(err));
    }

     //list user in table
  getListUsers() {
    return this.usersRef.snapshotChanges();
  }


}
