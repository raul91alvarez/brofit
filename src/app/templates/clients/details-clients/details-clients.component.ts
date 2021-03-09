import { MatTableDataSource } from '@angular/material/table';
import { PaymentInterface } from './../../../core/interfaces/interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { ClientInterface } from 'src/app/core/interfaces/interface';
import { QueriesService } from 'src/app/core/services/queries/queries.service';

@Component({
  selector: 'app-details-clients',
  templateUrl: './details-clients.component.html',
  styleUrls: ['./details-clients.component.scss']
})
export class DetailsClientsComponent implements OnInit, OnDestroy {

  private id: string;
  private sub$: Subscription[] = [];
  public parameter: string = "";
  public dataClient: Array<ClientInterface>;

  //table data payments
  public dataPayments: MatTableDataSource<PaymentInterface>;
  public displayedColumns: string[] = ['number', 'date', 'payForm', 'state'];

  //use of payments
  public panelOpenStateOrders = false;
  public panelOpenStateClaims = false;

  constructor(private activateRouter: ActivatedRoute, private qs: QueriesService, private _location: Location) {
    // get parameter from rout
    this.sub$.push(this.activateRouter.paramMap.subscribe(param => {
      if (param.has("data")) {
        let data = param.get("data");
        this.parameter = data;
      }
    }))
    this.id = this.parameter.toLowerCase();
  }

  // get all data client
  getDataClient() {
    this.sub$.push(this.qs.col$('clients', ref => ref.where('cid', '==', `${this.id}`))
      .subscribe(async (res) => {
        this.dataClient = await Object.values(res);
        console.log(this.dataClient);
      }))
      
  }
  // get all data client
  getDataPayments() {
    this.sub$.push(this.qs.col$('payments', ref => ref.where('cid', '==', `${this.id}`).orderBy("date","asc"))
      .subscribe(async (res) => {
        let temp = await Object.values(res);
        this.dataPayments = new MatTableDataSource(temp);
      }))
  }

  deletePay(){
    console.log('fromo delete payment');
  }

  onBack() {
    this._location.back();
  }

  ngOnInit(): void {
    this.getDataClient();
    this.getDataPayments();
    console.log(this.dataPayments);



  }

  ngOnDestroy(): void {
    this.sub$.forEach(res => { res.unsubscribe(); })
  }

}
