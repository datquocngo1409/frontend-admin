import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {
  visible: boolean;
  constructor() {
  }

  show(event: boolean) {
    this.visible = event;
  }

  hide(event: boolean) {
    this.visible = event;
  }
  ngOnInit() {
  }

}
