import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskSheetComponent } from './create-task-sheet.component';

describe('CreateTaskSheetComponent', () => {
  let component: CreateTaskSheetComponent;
  let fixture: ComponentFixture<CreateTaskSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTaskSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTaskSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
