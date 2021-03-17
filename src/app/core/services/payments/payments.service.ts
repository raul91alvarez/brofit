import { ClientInterface, StateInterface } from 'src/app/core/interfaces/interface';
import { PaymentInterface } from './../../interfaces/interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';




@Injectable({
  providedIn: 'root'
})
export class PaymentsService {
  private tempCollection: AngularFirestoreCollection<PaymentInterface> = null;
  private clientsRef: AngularFirestoreCollection<ClientInterface> = null;
  private paymentsRef: AngularFirestoreCollection<PaymentInterface> = null;
  private statesRef: AngularFirestoreCollection<StateInterface> = null;
  private pay = 'payments';
  private client = 'clients';
  private state = 'states';

  constructor(private dbPayments: AngularFirestore, private dbClients: AngularFirestore, private dbState: AngularFirestore) { 
    this.paymentsRef = this.dbPayments.collection(this.pay);
    this.clientsRef = this.dbClients.collection(this.client);
    this.statesRef = this.dbState.collection(this.state);
    this.tempCollection = this.dbPayments.collection('payments');
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

    // get payments
    getPayment(){
        return this.tempCollection.valueChanges();
      
    }

  // *** add pay and update within client and states collections of pay's states
  addPayment(data: ClientInterface,state: string,account){
    let date = new Date();
    let month = date.getMonth()+1
    let string = month.toString().concat(date.getFullYear().toString());
    let pid = this.generateDid(10);
    let accountInt = parseInt(account)
    this.paymentsRef.doc(pid).set({
      cid: data.cid,
      pid: pid,
      date: date.toUTCString(),
      state: data.state,
      payForm: state,
      account: accountInt,
      monthYear: string,

    })
    .then(()=>{
     let currentDay = new Date(date);
     let arrayDate = this.setDateState(currentDay);
      this.statesRef.doc(data.cid).update({
        paymentDay: currentDay,
        pendingPay: arrayDate[0],
        inactivePay: arrayDate[1]
      })
    })
    .catch((err)=>{console.log(err);})
  }

  //change state active by pending from state collection and clients collections
  pendingState(cid:string){
    this.clientsRef.doc(cid).update({
      pay: false,
      state: 1
    }).then(()=>{
      this.statesRef.doc(cid).update({
        state: 1
      })
    })
  }

}
