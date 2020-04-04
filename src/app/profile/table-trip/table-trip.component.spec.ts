import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableTripComponent } from './table-trip.component';

describe('TableTripComponent', () => {
  let component: TableTripComponent;
  let fixture: ComponentFixture<TableTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
