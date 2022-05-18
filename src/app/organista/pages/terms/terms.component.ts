import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Article } from '../../shared/models/article.model';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  article: Article;

  baseUrl = `${environment.apiUrl}/`;
  
  constructor(
    private _titleService: Title
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle(`Licenta | Felhasználási feltételek`);
  }

}
