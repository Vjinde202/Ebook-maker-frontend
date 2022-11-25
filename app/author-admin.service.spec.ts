import { TestBed } from '@angular/core/testing';

import { AuthorAdminService } from './author-admin.service';

describe('AuthorAdminService', () => {
  let service: AuthorAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
