import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { BookingComponent } from './components/booking/booking.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home - Bus Ticket Booking' },
  { path: 'search', component: SearchComponent, title: 'Search Buses' },
  { path: 'book/:id', component: BookingComponent, title: 'Book Ticket' },
  { path: 'my-bookings', component: MyBookingsComponent, title: 'My Bookings' },
  { path: '**', redirectTo: '' }
];