import { Component, OnInit, OnDestroy, SecurityContext, Optional } from '@angular/core';
import { Article } from '../../shared/models/article.model';
import { ArticleService } from '../../shared/services/article.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer, Title } from "@angular/platform-browser"
import { ToastrService } from 'ngx-toastr';
import { ArticleFile } from '../../shared/models/file.model';
import { ShareService } from '../../shared/models/meta/meta.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {
  baseUrl = `${environment.apiUrl}/`;
  article: Article;
  commentForm: FormGroup;

  textClass = 'fs-16';

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _sectionService: ArticleService,
    private _formBuilder: FormBuilder,
    private _sanitizer: DomSanitizer,
    private _toastr: ToastrService,
    private _titleService: Title,
    @Optional() private _shareService: ShareService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.initArticle();
    this.initAuth();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  private initArticle() {
    this._sectionService.onArticleChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(article => {
        this.article = article;
        this.initTitle();

        if (this._shareService) {
          this._shareService.setArticleAndFacebookTags(this.article);
        }
      });
  }

  private initTitle() {
    this._titleService.setTitle(`MDP | ${this.article.title}`);
  }

  private initAuth() {
    this.commentForm = this.initCommentForm();
  }

  private initCommentForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      fullName: ['', Validators.required],
      text: ['', Validators.compose([Validators.required, Validators.maxLength(512)])],
      imagePath: ['']
    });
  }

  isArticle() {
    if (this.article.files.length === 0) return true;

    if (this.article.files[0].contentType === ".pdf") {
      return false;
    }
    return true;
  }

  submitComment() {
    let sanitiezed = this._sanitizer.sanitize(SecurityContext.HTML, this.commentForm.controls.text.value);
    if (sanitiezed === '') {
      this._toastr.error("Cod html invalid", "Eroare!");
      return;
    }
    this.commentForm.controls.text.setValue(sanitiezed);

    let data = this.commentForm.getRawValue();
    this._sectionService.addComment(data).finally(() => {
      this.commentForm.controls.text.setValue('');
    });
  }

  setImageSize(file: ArticleFile, fileSize: string): string {
    let path = '';
    if (file.content.includes('.jpg') || file.content.includes('.png') || file.content.includes('.gif')) {
      let extension = file.content.substring(file.content.length - 4);
      path = file.content.substring(0, file.content.length - 4);
      path = path + '-' + fileSize + extension;
    }
    return path;
  }

  changeFontSize(type: string) {
    this.textClass = 'fs-' + type;
  }
}
