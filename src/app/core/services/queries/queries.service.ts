import { NotificationsInterface } from './../../interfaces/interface';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';



type CollentionPredicate<T> = string | AngularFirestoreCollection;
type DocumentPredicate<T> = string | AngularFirestoreDocument;

@Injectable({
  providedIn: 'root'
})
export class QueriesService {

  // notifications pending
  public subjetPending = new Subject();
  public subjetBirthday = new Subject();

  public sendIndex = new BehaviorSubject<string>("");
  public sendIndexObservable$ = this.sendIndex.asObservable();

  // to notifications
  private notificationsRef: AngularFirestoreCollection<NotificationsInterface> = null;
  private notifications = 'notifications';

  constructor(private db: AngularFirestore) {
    this.notificationsRef = db.collection(this.notifications);
  }

  private col<T>(ref: CollentionPredicate<T>, queryFn?): AngularFirestoreCollection {
    return typeof ref === "string" ? this.db.collection(ref, queryFn) : ref;
  }

  private doc<T>(ref: DocumentPredicate<T>): AngularFirestoreDocument {
    return typeof ref === "string" ? this.db.doc(ref) : ref;
  }

  // observable to index of navigations
  getIndex(url: string) {
    this.sendIndex.next(url);


  }


  // query by collections
  col$<T>(ref: CollentionPredicate<T>, queryFn?): Observable<any[]> {
    return this.col(ref, queryFn).snapshotChanges().pipe(
      map(docs => {
        return docs.map(d => {
          const data = d.payload.doc.data();
          return { ...data }
        })
      })
    )
  }

  // get messange of notifications from DB
  getMessange() {
    return this.notificationsRef.doc('1').get();
  }

  // verific birthday pending
  checkbirthday() {
    let todayOn = new Date(Date.now());
    let todayOff = new Date(Date.now());
    todayOn.setHours(0, 0, 0, 0);
    todayOff.setHours(24, 0, 0, 0);
    let date = todayOn.valueOf();
    return this.col$('clients', ref => ref
    .where("birthday",">=",todayOn).where("birthday","<=",todayOff)
    )
  }

}
