import { TestBed } from '@angular/core/testing';

import { ThreadDMsService } from './thread-dms.service';

describe('ThreadDMsService', () => {
  let service: ThreadDMsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadDMsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
