import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBus, faTicketAlt, faUser, faHome, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgbCollapseModule, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isMenuCollapsed = true;
  title = 'Bus Ticket Booking';
  currentYear: number = new Date().getFullYear(); // Add this line


  // Icons
  faBus = faBus;
  faTicketAlt = faTicketAlt;
  faUser = faUser;
  faHome = faHome;
  faSearch = faSearch;
}