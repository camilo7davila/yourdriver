import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDriverComponent } from './table-driver.component';

describe('TableDriverComponent', () => {
  let component: TableDriverComponent;
  let fixture: ComponentFixture<TableDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
