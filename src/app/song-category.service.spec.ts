import { TestBed } from '@angular/core/testing';

import { SongCategoryService } from './song-category.service';

describe('SongCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SongCategoryService = TestBed.get(SongCategoryService);
    expect(service).toBeTruthy();
  });
});
