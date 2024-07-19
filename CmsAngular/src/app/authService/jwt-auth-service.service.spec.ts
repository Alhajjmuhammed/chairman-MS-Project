import { TestBed } from '@angular/core/testing';

import { JwtAuthServiceService } from './jwt-auth-service.service';

describe('JwtAuthServiceService', () => {
  let service: JwtAuthServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtAuthServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
