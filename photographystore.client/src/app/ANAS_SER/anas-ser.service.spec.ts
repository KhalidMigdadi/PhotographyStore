import { TestBed } from '@angular/core/testing';

import { AnasSerService } from './anas-ser.service';

describe('AnasSerService', () => {
  let service: AnasSerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnasSerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
