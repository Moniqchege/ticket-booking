import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  NgbCarouselModule,
  NgbSlideEvent,
  NgbSlideEventSource,
} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule, NgbCarouselModule, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  images = [
    'assets/images/bus1.jpg',
    'assets/images/bus2.jpg',
    'assets/images/bus3.jpg',
  ];

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  onSlide(slideEvent: NgbSlideEvent) {
    if (
      this.unpauseOnArrow &&
      slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT ||
        slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)
    ) {
      this.togglePaused();
    }
    if (
      this.pauseOnIndicator &&
      !slideEvent.paused &&
      slideEvent.source === NgbSlideEventSource.INDICATOR
    ) {
      this.togglePaused();
    }
  }

  togglePaused() {
    if (this.paused) {
    } else {
    }
    this.paused = !this.paused;
  }
}
