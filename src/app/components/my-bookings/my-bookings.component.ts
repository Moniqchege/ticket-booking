import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Booking } from '../../interfaces/booking.interface';
import { NgFor, DatePipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [NgFor, CommonModule, DatePipe, RouterLink],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent {
  bookings: Booking[] = [];

  constructor(private dataService: DataService) {
    this.bookings = this.dataService.getBookings();
  }

  cancelBooking(id: string): void {
    if (confirm('Are you sure you want to cancel this booking?')) {
      this.dataService.cancelBooking(id);
      this.bookings = this.dataService.getBookings();
    }
  }
}