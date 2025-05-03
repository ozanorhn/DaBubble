import { TestBed } from '@angular/core/testing';
import { MainNavService } from './main-nav.service';


describe('ChannelPageNavService', () => {
  let service: MainNavService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainNavService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
