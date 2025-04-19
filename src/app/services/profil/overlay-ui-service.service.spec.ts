import { TestBed } from '@angular/core/testing';

import { OverlayUiService} from './overlay-ui-service.service';

describe('OverlayUiServiceService', () => {
  let service: OverlayUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
