import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFourInlandNewsComponent } from './section-four-inland-news.component';

describe('SectionFourInlandNewsComponent', () => {
  let component: SectionFourInlandNewsComponent;
  let fixture: ComponentFixture<SectionFourInlandNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionFourInlandNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFourInlandNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
