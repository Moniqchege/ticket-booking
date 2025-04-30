import { BusRoute } from './bus-route.interface';

export interface Booking {
  id: string;
  routeId: string;
  passengerName: string;
  passengerEmail: string;
  passengerPhone: string;
  seatsBooked: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'cancelled';
  routeDetails?: BusRoute;
}