export interface BusRoute {
    id: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    seats: number;
    availableSeats: number;
    date: string;
    busOperator: string;
    amenities: string[];
  }