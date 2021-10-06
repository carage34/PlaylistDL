import { TestBed } from '@angular/core/testing';

import { MusicDownloadService } from './music-download.service';

describe('MusicDownloadService', () => {
  let service: MusicDownloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicDownloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
