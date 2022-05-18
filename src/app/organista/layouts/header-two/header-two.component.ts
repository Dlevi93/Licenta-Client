import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header-two',
  templateUrl: './header-two.component.html',
  styleUrls: ['./header-two.component.css']
})
export class HeaderTwoComponent implements OnInit, OnDestroy {
  searchIputText: string;
  eurCurrency: number;
  usdCurrency: number;
  hufCurrency: number;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _router: Router,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  search(event) {
    this._router.navigate(['/articole/' + this.searchIputText]);
  }
}
