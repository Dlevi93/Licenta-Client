import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsletterService } from './newsletter.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit, OnDestroy {
  title = "Adresa invalida";
  newsLetterForm: FormGroup;

  @ViewChild('inputElem', { static: false }) inputElem: ElementRef;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _formBuilder: FormBuilder,
    private _newsletterService: NewsletterService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    this.newsLetterForm = this.initNewsletterForm();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  initNewsletterForm(): FormGroup {
    return this._formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  subscribe() {
    let data = this.newsLetterForm.getRawValue();
    this._newsletterService.subscribeToNewsletter(data).finally(() => {
      this.newsLetterForm.controls.email.setValue('');
    });
  }

  checkIfDisabled() {
    if (this.newsLetterForm.invalid || this.newsLetterForm.pristine) {
      this.title = "Adresa invalida!";
      return true;
    }
    this.title = "Inscriere";
    return false;
  }

  handleSuccess(event) {
    setTimeout(() => {
      this.inputElem.nativeElement.focus();
    }, 0);
  }
}
