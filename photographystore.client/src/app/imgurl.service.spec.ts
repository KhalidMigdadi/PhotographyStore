import { TestBed } from '@angular/core/testing';

import { ImgurlService } from './imgurl.service';

describe('ImgurlService', () => {
  let service: ImgurlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImgurlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
