import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleItemComponent } from './toggle-item.component';

describe('ToggleItemComponent', () => {
  let component: ToggleItemComponent;
  let fixture: ComponentFixture<ToggleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
