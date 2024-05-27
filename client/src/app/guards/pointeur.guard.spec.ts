import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pointeurGuard } from './pointeur.guard';

describe('pointeurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pointeurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
