import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-podcasts',
  templateUrl: './podcasts.component.html',
  styleUrls: ['./podcasts.component.scss']
})
export class PodcastsComponent implements OnInit {
  @Input() toggle1: Boolean;
  constructor() { }

  ngOnInit() {
  }

}
