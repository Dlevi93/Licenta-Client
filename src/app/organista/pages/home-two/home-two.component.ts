import { Component, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home-two',
  templateUrl: './home-two.component.html',
  styleUrls: ['./home-two.component.css']
})
export class HomeTwoComponent implements OnInit, OnDestroy {
  baseUrl = `${environment.apiUrl}/`;

  private _unsubscribeAll: Subject<any>;
  constructor(
    private _titleService: Title
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(){
    this._titleService.setTitle(`Licenta | Acasă`);
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
