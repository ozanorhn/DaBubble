import { TestBed } from '@angular/core/testing';

import { ThreadMessagesService } from './thread-messages.service';

describe('ThreadMessagesService', () => {
  let service: ThreadMessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThreadMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
