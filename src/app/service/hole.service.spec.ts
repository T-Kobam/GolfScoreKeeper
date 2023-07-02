import { TestBed } from '@angular/core/testing';

import { HoleService } from './hole.service';

describe('HoleService', () => {
  let service: HoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
