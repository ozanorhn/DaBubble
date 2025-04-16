import { TestBed } from '@angular/core/testing';

import { ChannelPageNavService } from './channel-page-nav.service';

describe('ChannelPageNavService', () => {
  let service: ChannelPageNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelPageNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
