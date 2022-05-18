import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionOneSelectedComponent } from './section-one-selected.component';

describe('SectionOneSelectedComponent', () => {
  let component: SectionOneSelectedComponent;
  let fixture: ComponentFixture<SectionOneSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionOneSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionOneSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
