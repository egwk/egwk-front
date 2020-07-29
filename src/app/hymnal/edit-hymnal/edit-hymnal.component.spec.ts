import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHymnalComponent } from './edit-hymnal.component';

describe('EditHymnalComponent', () => {
  let component: EditHymnalComponent;
  let fixture: ComponentFixture<EditHymnalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHymnalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHymnalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
