import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphPropertiesComponent } from './paragraph-properties.component';

describe('ParagraphPropertiesComponent', () => {
  let component: ParagraphPropertiesComponent;
  let fixture: ComponentFixture<ParagraphPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraphPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
