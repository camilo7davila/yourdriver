import { TestBed } from '@angular/core/testing';

import { StatusDriverService } from './status-driver.service';

describe('StatusDriverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatusDriverService = TestBed.get(StatusDriverService);
    expect(service).toBeTruthy();
  });
});
