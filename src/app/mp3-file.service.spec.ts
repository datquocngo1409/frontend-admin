import { TestBed } from '@angular/core/testing';

import { Mp3FileService } from './mp3-file.service';

describe('Mp3FileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Mp3FileService = TestBed.get(Mp3FileService);
    expect(service).toBeTruthy();
  });
});
