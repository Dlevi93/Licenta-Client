import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionFiveOtherComponent } from './section-five-other.component';

describe('SectionFiveOtherComponent', () => {
  let component: SectionFiveOtherComponent;
  let fixture: ComponentFixture<SectionFiveOtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionFiveOtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionFiveOtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
