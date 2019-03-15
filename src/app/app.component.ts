import {AfterViewInit, Component, ElementRef, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  title = 'frontend-admin';
  constructor(private elementRef: ElementRef) {
  }
  ngAfterViewInit(): void {
  }
}
