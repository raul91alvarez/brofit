import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { QueriesService } from 'src/app/core/services/queries/queries.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnDestroy {

  private $suscrip: Subscription[] = [];
  chart = [];
  chart2: [];
  public clientActive: any = [];
  public clientInactive: any = [];
  public statesActive: any[] = [];
  public statesPending: any[] = [];
  public statesInactive: any[] = [];


  constructor(private router: Router, private qs: QueriesService) { }
  ngOnDestroy(): void {
    this.$suscrip.forEach((res) => { res.unsubscribe() })
  }

  //routing
  routerClients() {
    this.router.navigateByUrl("home/clients");
  }

  routerStatistics() {
    this.router.navigateByUrl("home/statistics");
  }

  routerNotifications() {
    this.router.navigateByUrl("home/notifications");
  }

  //routing
  accountManage() {
    this.router.navigateByUrl("home/account");
  }



  // get data client active and inactive 
  getDataClient() {
    // get active
    this.$suscrip.push(this.qs.col$('clients', ref => ref.where('active', '==', true))
      .subscribe((res) => {
        console.log(res);
        this.clientActive = Object.values(res);
      }));

    // get inactive
    this.$suscrip.push(this.qs.col$('clients', ref => ref.where('active', '==', false))
      .subscribe((res) => {
        this.clientInactive = Object.values(res);
      }));
    console.log(this.clientInactive);

    // get state payment 
    // get active
    this.$suscrip.push(this.qs.col$('clients', ref => ref.where('state', '==', 0))
      .subscribe(async (res) => {
        this.statesActive = await Object.values(res);
      }));

    // get inactive
    this.$suscrip.push(this.qs.col$('clients', ref => ref.where('state', '==', 1))
      .subscribe(async (res) => {
        this.statesPending = await Object.values(res);
      }));

    // get inactive
    this.$suscrip.push(this.qs.col$('clients', ref => ref.where('state', '==', 2))
      .subscribe(async (res) => {
        this.statesInactive = await Object.values(res);
      }));

    setTimeout(() => {
      this.graphClient();
    this.graphStates();
    }, 1000);
  }

  // creating class graph for showing data clients 
  graphClient() {
    this.chart = new Chart('canvas', {
      type: 'pie',
      data: {
        datasets: [{
            data: [`${this.clientActive.length}`, `${this.clientInactive.length}` ],
            backgroundColor:[
              '#098B4B',
              '#A11C22',
            ]
        }],
        labels: [
            'Activos',
            'Inactivos'
        ]
    },
      options: {
        title: {
          display: true,
          fontColor: '#36464B',
          fontSize: 16,
          text: "Estado de Socios"
        }
      }
  });
  }

  // creating class graph for showing data clients 
  graphStates() {
    this.chart2 = new Chart('canvas2', {
      type: 'bar',
      data: {
        labels: ['En regla', 'Pendientes'],
        datasets: [
          {
            data: [`${this.statesActive.length}`, `${this.statesPending.length}`],
            backgroundColor: [
              '#098B4B',
              '#A11C22',

            ],
            borderColor: [
              '#098B4B',
              '#A11C22',

            ],
            borderWidth: 1,
            Category: 1,
            Bar: 1
          },

        ]
      },

      options: {
        title: {
          display: true,
          fontColor: '#36464B',
          fontSize: 16,
          text: "Estado de Pagos"
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }




  ngOnInit(): void {
    this.getDataClient();

  }

}
