import { Component, OnInit } from '@angular/core';
import {IImage} from '../../image';
import {ImageService} from '../../image.service';

@Component({
  selector: 'app-media-library',
  templateUrl: './media-library.component.html',
  styleUrls: ['./media-library.component.scss']
})
export class MediaLibraryComponent implements OnInit {
  images: IImage[] = [];
  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.imageService.getImages().subscribe(data => (this.images = data));
  }
}
