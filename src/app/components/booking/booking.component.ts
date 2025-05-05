import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { BusRoute } from '../../interfaces/bus-route.interface';
import { CommonModule, NgIf } from '@angular/common';
import { Booking, Seat, SeatRow } from '../../interfaces/booking.interface';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
 

  showSeatModal: boolean = false;

  busRoute?: BusRoute;
  bookingData = {
    passengerName: '',
    passengerPhone: '',
    seatsBooked: 0
  };
  isSubmitting = false;
  bookingSuccess = false;
  bookingId = '';

  seatmap: SeatRow[] = [];

  cart = {
    selectedSeats: [] as string[]
  };

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras.state && nav.extras.state['busRoute']) {
      this.busRoute = nav.extras.state['busRoute'];
    }
  }

  ngOnInit(): void {
    this.generateDummySeatmap();
  }
  
  generateDummySeatmap(): void {
    const rows: SeatRow[] = [];
    const totalRows = 8;
    const seatsPerRow = 4;
  
    let seatCounter = 1;
  
    for (let i = 0; i < totalRows; i++) {
      const seatRow: SeatRow = {
        seatRowLabel: (i + 1).toString().padStart(2, '0'),
        seats: []
      };
  
      for (let j = 0; j < seatsPerRow; j++) {
        seatRow.seats.push({
          seatLabel: seatCounter.toString(),
          status: 'available'
        });
        seatCounter++;
      }
  
      rows.push(seatRow);
    }
  
    this.seatmap = rows;
  }
  

  onSubmit(): void {
    if (!this.busRoute) return;

    this.isSubmitting = true;

    this.bookingData.seatsBooked = this.cart.selectedSeats.length;

    const booking: Omit<Booking, 'id' | 'bookingDate' | 'status'> = {
      routeId: this.busRoute.id,
      passengerName: this.bookingData.passengerName,
      passengerPhone: this.bookingData.passengerPhone,
      seatsBooked: this.bookingData.seatsBooked,
      totalPrice: this.calculateTotal()
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
    return this.busRoute
      ? this.cart.selectedSeats.length * this.busRoute.price
      : 0;
  }

  openSeatModal(): void {
    console.log('Modal should now open!');
    this.showSeatModal = true;
  }

  closeSeatModal(): void {
    this.showSeatModal = false;
  }

  selectSeat(seat: Seat): void {
    if (seat.status === 'booked') return;

    if (seat.status === 'selected') {
      seat.status = 'available';
      this.cart.selectedSeats = this.cart.selectedSeats.filter(label => label !== seat.seatLabel);
    } else {
      if (this.cart.selectedSeats.length < this.maxSeats) {
        seat.status = 'selected';
        this.cart.selectedSeats.push(seat.seatLabel);
      }
    }
  }

  confirmSeats(): void {
    this.bookingData.seatsBooked = this.cart.selectedSeats.length;
    this.closeSeatModal();
  }
}
