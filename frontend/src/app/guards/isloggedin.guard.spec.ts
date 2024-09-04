import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { isloggedinGuard } from './isloggedin.guard';

describe('isloggedinGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => isloggedinGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
