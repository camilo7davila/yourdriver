import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsCancelTableComponent } from './trips-cancel-table.component';

describe('TripsCancelTableComponent', () => {
  let component: TripsCancelTableComponent;
  let fixture: ComponentFixture<TripsCancelTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsCancelTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsCancelTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
