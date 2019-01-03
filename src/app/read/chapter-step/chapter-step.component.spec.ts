import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterStepComponent } from './chapter-step.component';

describe('ChapterStepComponent', () => {
  let component: ChapterStepComponent;
  let fixture: ComponentFixture<ChapterStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapterStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
