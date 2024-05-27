import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { recruteurGuard } from './recruteur.guard';

describe('recruteurGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => recruteurGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
