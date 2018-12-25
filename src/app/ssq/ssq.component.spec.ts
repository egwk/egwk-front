import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsqComponent } from './ssq.component';

describe('SsqComponent', () => {
  let component: SsqComponent;
  let fixture: ComponentFixture<SsqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
