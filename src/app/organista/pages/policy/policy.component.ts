import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Article } from '../../shared/models/article.model';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {
  article: Article;

  baseUrl = `${environment.apiUrl}/`;
  
  constructor(
    private _titleService: Title
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle(`Licenta | Adatvédelmi politika`);
  }

}
