import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { BusRoute } from '../../interfaces/bus-route.interface';
import { CommonModule, NgIf } from '@angular/common';
import { Booking } from '../../interfaces/booking.interface';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {
  private route = inject(ActivatedRoute);
 router = inject(Router);
  private dataService = inject(DataService);

  busRoute?: BusRoute;
  bookingData = {
    passengerName: '',
    passengerEmail: '',
    passengerPhone: '',
    seatsBooked: 1
  };
  isSubmitting = false;
  bookingSuccess = false;
  bookingId = '';

  constructor() {
    const routeId = this.route.snapshot.paramMap.get('id');
    if (routeId) {
      const route = this.dataService.getRouteById(routeId);
      if (route) {
        this.busRoute = route;
      } else {
        this.router.navigate(['/search']);
      }
    } else {
      this.router.navigate(['/search']);
    }
  }

  onSubmit(): void {
    if (!this.busRoute) return;

    this.isSubmitting = true;
    
    const booking: Omit<Booking, 'id' | 'bookingDate' | 'status'> = {
      routeId: this.busRoute.id,
      passengerName: this.bookingData.passengerName,
      passengerEmail: this.bookingData.passengerEmail,
      passengerPhone: this.bookingData.passengerPhone,
      seatsBooked: this.bookingData.seatsBooked,
      totalPrice: this.bookingData.seatsBooked * this.busRoute.price
    };

    const result = this.dataService.createBooking(booking);
    this.bookingId = result.id;
    this.isSubmitting = false;
    this.bookingSuccess = true;
  }

  get maxSeats(): number {
    return this.busRoute?.availableSeats || 0;
  }

  calculateTotal(): number {
    return this.busRoute ? this.bookingData.seatsBooked * this.busRoute.price : 0;
  }
}