import { ClientInterface, StateInterface } from './../../interfaces/interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { NotificationsService } from '../notifications/notifications.service';




@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private statesRef: AngularFirestoreCollection<StateInterface> = null;
  private clientsRef: AngularFirestoreCollection<ClientInterface> = null;
  private tempCollection: AngularFirestoreCollection<ClientInterface> = null;
  private dbPath = 'clients';
  private states = 'states';

  constructor(private ns: NotificationsService, private dbClient: AngularFirestore) {
    this.clientsRef = dbClient.collection(this.dbPath);
    this.statesRef = dbClient.collection(this.states);
    // this.tempCollection = this.db.collection('clients');
    this.tempCollection = this.dbClient.collection('clients', ref => ref
      .where("active", "==", true)
    );
  }

  //****** manage date to change states *******/
  setDateState(date: Date): Array<Date>{
    let currentDay = date.getDate();
    let day1 = currentDay + 30;
    let day2 = currentDay + 10;
    let pendingPay= new Date(date.setDate(day1));
    let inactivePay= new Date(date.setDate(day2));
    let statesArray: Array<Date> = [pendingPay,inactivePay];
    return statesArray; 
  }

  //******generate cripto random value*******
  dec2hex(dec) {
    return ('0' + dec.toString(16)).substr(-2)
  }

  // generateId :: Integer -> String
  generateDid(len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, this.dec2hex).join('')
  }

  // return in real time the query actually
  getListClient() {
    return this.tempCollection.snapshotChanges();
  }

  // create client to firestore
  addClient(data: ClientInterface) {
    let cid = this.generateDid(10);
    let currentDay = new Date();
    this.clientsRef.doc(cid).set({
      cid: cid,
      name:data.name,
      phone: data.phone,
      birthday: data.birthday,
      numberID: data.numberID,
      time: data.time,
      date: data.date,
      active: data.active,
      schedule:data.schedule,
      hospital: data.hospital,
      sick: data.sick,
      observations: data.observations,
      pay: data.pay,
      state: data.state
    }).then(()=>{  // create doc within states for manage client's states  
    let array: Array<Date>=this.setDateState(currentDay);
    console.log(array);
    this.statesRef.doc(cid).set({
        cid: cid,
        phone: data.phone,
        name: data.name,
        state: 0,
        paymentDay: currentDay,
        pendingPay: array[0],
        inactivePay: array[1]
      })
      this.ns.showSuccess("Cliente registrado","Exito");
    })
    .catch((err)=>{console.log(err)})
  }

    // create client to firestore
    editClient(data: ClientInterface) {
      let cid = data.cid
      this.clientsRef.doc(cid).set({
        cid: cid,
        name:data.name,
        phone: data.phone,
        birthday: data.birthday,
        numberID: data.numberID,
        time: data.time,
        date: data.date,
        active: data.active,
        state: data.state,
        schedule:data.schedule,
        hospital: data.hospital,
        sick: data.sick,
        observations: data.observations,
        pay: data.pay
      }).then(()=>{this.ns.showSuccess("Cliente editado","Exito")})
      .catch((err)=>{console.log(err)})
    }

   // update data active from client, showing in inactive table
   InactiveClient(cid:string){
      this.clientsRef.doc(cid).update({
      active: false
    })
    .then(()=>{
      this.ns.showInfo("Cliente inactivo","Exito")
    })
    .catch((err)=>
    console.log(err));
    
  }

    // clean data of client from DB
  deleteClient(cid: string){
    this.clientsRef.doc(cid).delete()
    .then( ()=>{ 
      this.ns.showSuccess("Cliente eliminado satisfactoriamente","Exito")
    })
    .catch((err)=>{console.log(err)})
  }

  payment(cid:string){
    this.clientsRef.doc(cid).update({
      pay:true,
      state: 0
    });
  }
}
