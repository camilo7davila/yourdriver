import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapOnlineComponent } from './map-online.component';

describe('MapOnlineComponent', () => {
  let component: MapOnlineComponent;
  let fixture: ComponentFixture<MapOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
