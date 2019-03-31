import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteSongComponent } from './favorite-song.component';

describe('FavoriteSongComponent', () => {
  let component: FavoriteSongComponent;
  let fixture: ComponentFixture<FavoriteSongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteSongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
