import { ClientInterface } from 'src/app/core/interfaces/interface';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { QueriesService } from 'src/app/core/services/queries/queries.service';
import { MatDialog } from '@angular/material/dialog';
import { PopupCreateClientComponent } from './popup-create-client/popup-create-client/popup-create-client.component';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { ClientService } from 'src/app/core/services/client/client.service';
import { SweeterAlert2 } from 'src/app/core/shared_modules/sweeteralert2';
import { PopupEditClientComponent } from './popup-edit-client/popup-edit-client/popup-edit-client.component';
import { PaymentsService } from 'src/app/core/services/payments/payments.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy, AfterViewInit {

  // table
  public statusTable: string = "";
  public active$;
  public inactive$;
  private subscriptions: Subscription[] = [];
  public listClient: MatTableDataSource<ClientInterface>;
  public displayedColumns: string[] = ['detail', 'name', 'phone', 'numberID', 'date', 'state', 'actions'];

  // paginator
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  // seeker
  public searchKey: string;

  // alert
  public sweetalert = new SweeterAlert2();

  constructor(
    private ps: PaymentsService,
    private ns: NotificationsService,
    private cs: ClientService,
    private dialog: MatDialog,
    private qs: QueriesService,
    private router: Router,
    private paginatorLabel: MatPaginatorIntl,
  ) {
    // change value of text from  paginator 
    this.paginatorLabel.itemsPerPageLabel = "Clientes por páginas";
    this.paginatorLabel.nextPageLabel = "Pag. siguiente";
    this.paginatorLabel.previousPageLabel = "Pag. anterior";


    // this.listClient = new MatTableDataSource();
  }
  ngAfterViewInit(): void {
    this.qs.getIndex("Gestionar Cliente");
  }

  //clear search
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  // apply filter
  applyFilter() {
    if (this.searchKey.length > 2) {
      this.listClient.filter = this.searchKey.trim().toLowerCase();
    } else if (this.searchKey === "") {
      this.listClient.filter = this.searchKey.trim().toLowerCase();
    }
    if (this.listClient.paginator) {
      this.listClient.paginator.firstPage();
    }
  }

  // data of active client for table, also is if default data 
  listActive() {
    // get list client active order by date desc
    //*** falta el orderby por fecha   .orderBy("date", "desc")*/
    this.active$ = this.qs.col$('clients', ref => ref.where("active", "==", true).orderBy("date","desc"))
      .subscribe(async (res) => {
        let temp = await Object.values(res);
        this.listClient = new MatTableDataSource(temp);
        // paginator and sort
        this.listClient.paginator = this.paginator;
        this.listClient.sort = this.sort; // i should import MatSortModule in app.module
        this.statusTable = "Activos";
        if (this.inactive$) {
          this.inactive$.unsubscribe();
        }
      })
  }

  // data of inactive client for table
  listInactive() {
    this.inactive$ = this.qs.col$('clients', ref => ref.where("active", "==", false))
      .subscribe(async (res) => {
        let temp = await Object.values(res);
        this.listClient = new MatTableDataSource(temp);
        // paginator and sort while list data client is loading
        this.listClient.paginator = this.paginator;
        this.listClient.sort = this.sort;
        this.statusTable = "Inactivos";
        if (this.active$) {
          this.active$.unsubscribe();
        }
      });
  }

  // show all information of client
  detailClient(id: String) {
    this.router.navigate(['/home/clients/details', id]);
  }

  // function of action button
  pay(elmt: ClientInterface) {
    let account;
    this.sweetalert.payWay()
      .then(result => {
        account = result.value;
        
      if (!result.isDismissed && result.value) {
        this.sweetalert.confirmPay().then((res)=>{console.log(typeof res.value);
        if (res.value ==="efectivo") {
          this.ps.addPayment(elmt, 'Efectivo',account); 
        }else if (res.value ==='tarjeta') {
        this.ps.addPayment(elmt, 'Tarjeta',account);
      }
        
        });

            
      }
    }).catch((erro)=>{console.log(erro);})
  }

  onEdit(elmt: ClientInterface) {
    console.log('from edit')
  }

  onDelete(elmt: ClientInterface) {
    this.sweetalert.delete()
      .then(result => {
        if (result.value) {
          if (elmt.active) {
            this.cs.InactiveClient(elmt.cid);
          } else {
            this.cs.deleteClient(elmt.cid);
          }
        }
      })
  }

  // Popup from create clients
  onPopupCreate(): void {
    const dialogRef = this.dialog.open(PopupCreateClientComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cs.addClient(result);
      } else {
        this.ns.showInfo("No se creó el cliente", "Información");
      }
    })
  }

  // Popup from edit clients
  onPopupEdit(elmt: ClientInterface): void {
    const dialogRef = this.dialog.open(PopupEditClientComponent,{
      data: elmt
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cs.editClient(result);
      } else {
        this.ns.showInfo("No se editó el cliente", "Información");
      }
    })
  }

  ngOnInit(): void {

    //default list table clients active
    this.listActive();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(res => { res.unsubscribe(); })
    // initializing the index to show index of Home Page.
    this.qs.getIndex("");
  }

}
