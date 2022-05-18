import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Article } from '../../shared/models/article.model';

@Component({
  selector: 'app-legal',
  templateUrl: './legal.component.html',
  styleUrls: ['./legal.component.css']
})
export class LegalComponent implements OnInit {
  article: Article;

  baseUrl = `${environment.apiUrl}/`;
  bga = 'Uploads/Old/tamogat/BGA.png'
  com = 'Uploads/Old/tamogat/communitas_vizszintes.png'
  
  constructor(
    private _titleService: Title
  ) { }

  ngOnInit(): void {
    this._titleService.setTitle(`Licenta | legal`);
  }

}
