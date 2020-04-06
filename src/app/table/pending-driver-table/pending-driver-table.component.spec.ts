import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDriverTableComponent } from './pending-driver-table.component';

describe('PendingDriverTableComponent', () => {
  let component: PendingDriverTableComponent;
  let fixture: ComponentFixture<PendingDriverTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDriverTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDriverTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
