import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LatestCommentService } from './latestComment.service';
import { environment } from 'src/environments/environment';
import { ArticleComment } from '../../models/comment.model';

@Component({
  selector: 'app-latest-comments',
  templateUrl: './latestComment.component.html',
  styleUrls: ['./latestComment.component.css']
})
export class LatestCommentComponent implements OnInit, OnDestroy {
  baseUrl = `${environment.apiUrl}/`;

  latestComments: ArticleComment[];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _latestCommentService: LatestCommentService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initLatestComments();
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  getCommentText(comment: ArticleComment) {
    return `<strong>${comment.fullName}</strong>: ${comment.text}`;
  }

  private initLatestComments() {
    this._latestCommentService.onCommentChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(comments => {
        this.latestComments = comments;
      });
  }
}
