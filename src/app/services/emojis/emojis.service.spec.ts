import { TestBed } from '@angular/core/testing';

import { EmojisService } from './emojis.service';

describe('EmojisService', () => {
  let service: EmojisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmojisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
