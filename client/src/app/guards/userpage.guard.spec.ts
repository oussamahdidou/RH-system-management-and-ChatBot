import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userpageGuard } from './userpage.guard';

describe('userpageGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userpageGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
