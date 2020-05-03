import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCancelTripComponent } from './profile-cancel-trip.component';

describe('ProfileCancelTripComponent', () => {
  let component: ProfileCancelTripComponent;
  let fixture: ComponentFixture<ProfileCancelTripComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCancelTripComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCancelTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
