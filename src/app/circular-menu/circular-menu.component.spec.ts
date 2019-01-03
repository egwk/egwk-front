import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularMenuComponent } from './circular-menu.component';

describe('CircularMenuComponent', () => {
  let component: CircularMenuComponent;
  let fixture: ComponentFixture<CircularMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircularMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircularMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
