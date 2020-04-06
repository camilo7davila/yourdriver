import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingDriverComponent } from './pending-driver.component';

describe('PendingDriverComponent', () => {
  let component: PendingDriverComponent;
  let fixture: ComponentFixture<PendingDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
