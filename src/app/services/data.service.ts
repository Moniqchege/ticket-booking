import { Injectable, inject } from '@angular/core';
import { BusRoute } from '../interfaces/bus-route.interface';
import { Booking } from '../interfaces/booking.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly localStorageKey = 'busTicketBookingData';

  private defaultRoutes: BusRoute[] = [
    {
      id: uuidv4(),
      origin: 'Nairobi',
      destination: 'Mombasa',
      departureTime: '08:00',
      arrivalTime: '14:00',
      price: 1200,
      seats: 50,
      availableSeats: 50,
      date: new Date().toISOString().split('T')[0],
      busOperator: 'Modern Coast',
      amenities: ['AC', 'WiFi', 'TV'],
    },
  ];

  constructor() {
    this.initializeData();
  }

  private initializeData(): void {
    if (!localStorage.getItem(this.localStorageKey)) {
      const initialData = {
        routes: this.defaultRoutes,
        bookings: [],
      };
      localStorage.setItem(this.localStorageKey, JSON.stringify(initialData));
    }
  }

  private getData(): { routes: BusRoute[]; bookings: Booking[] } {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : { routes: [], bookings: [] };
  }

  private saveData(data: { routes: BusRoute[]; bookings: Booking[] }): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(data));
  }

  getRoutes(): BusRoute[] {
    return this.getData().routes;
  }

  getRouteById(id: string): BusRoute | undefined {
    return this.getData().routes.find((route) => route.id === id);
  }

  createBooking(
    booking: Omit<Booking, 'id' | 'bookingDate' | 'status'>
  ): Booking {
    const data = this.getData();
    const newBooking: Booking = {
      ...booking,
      id: uuidv4(),
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
    };
    data.bookings.push(newBooking);

    const route = data.routes.find((r) => r.id === booking.routeId);
    if (route) {
      route.availableSeats -= booking.seatsBooked;
    }

    this.saveData(data);
    return newBooking;
  }

  getBookings(): Booking[] {
    const data = this.getData();
    return data.bookings.map((booking) => ({
      ...booking,
      routeDetails: data.routes.find((r) => r.id === booking.routeId),
    }));
  }

  cancelBooking(id: string): void {
    const data = this.getData();
    const booking = data.bookings.find((b) => b.id === id);
    if (booking) {
      booking.status = 'cancelled';

      const route = data.routes.find((r) => r.id === booking.routeId);
      if (route) {
        route.availableSeats += booking.seatsBooked;
      }

      this.saveData(data);
    }
  }
}
