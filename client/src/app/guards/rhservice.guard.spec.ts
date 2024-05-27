import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { rhserviceGuard } from './rhservice.guard';

describe('rhserviceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => rhserviceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
