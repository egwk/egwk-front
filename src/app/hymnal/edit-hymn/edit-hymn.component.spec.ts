import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHymnComponent } from './edit-hymn.component';

describe('EditHymnComponent', () => {
  let component: EditHymnComponent;
  let fixture: ComponentFixture<EditHymnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHymnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHymnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
