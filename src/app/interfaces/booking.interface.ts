import { BusRoute } from './bus-route.interface';

export interface Booking {
  id: string;
  routeId: string;
  passengerName: string;
  passengerPhone: string;
  seatsBooked: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
  routeDetails?: BusRoute;
}

export interface Seat {
  seatLabel: string;
  status: 'available' | 'booked' | 'selected';
}

export interface SeatRow {
  seatRowLabel: string;
  seats: Seat[];
}
