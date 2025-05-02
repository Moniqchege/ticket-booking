import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  from: string = '';
  to: string = '';
  travelDate: string = '';
  tripType: string = 'one-way';
  openStay: boolean = true;

  cities: string[] = [
    'Nairobi',
    'Mombasa',
    'Kisumu',
    'Nakuru',
    'Eldoret',
    'Thika',
    'Malindi',
    'Kitale',
    'Kakamega',
    'Meru',
    'Nyeri',
    'Kericho',
    'Machakos',
    'Embu',
    'Naivasha',
    'Narok',
    'Voi',
    'Bungoma',
    'Garissa',
    'Isiolo',
    'Lodwar',
    'Migori',
    'Homabay',
    'Busia',
    'Siaya',
  ];
  filteredFromCities: string[] = [];
  filteredToCities: string[] = [];
  availableBuses: { name: string, fare: number, reason?: string }[] = [];

  constructor(private router: Router) {}



  filterCities(query: string, type: 'from' | 'to') {
    const trimmedQuery = query.trim().toLowerCase();
    const filtered = trimmedQuery ? 
      this.cities.filter(city => city.toLowerCase().startsWith(trimmedQuery)) : 
      [];
    
    type === 'from' ? this.filteredFromCities = filtered : this.filteredToCities = filtered;
  }

  selectCity(city: string, type: 'from' | 'to') {
    if (type === 'from') {
      this.from = city;
      this.filteredFromCities = [];
    } else {
      this.to = city;
      this.filteredToCities = [];
    }
  }

  searchTickets() {
    if (!this.from || !this.to || !this.travelDate) {
      alert('Please fill in all required fields.');
      return;
    }
  
    console.log({
      from: this.from,
      to: this.to,
      date: this.travelDate,
      tripType: this.tripType,
      openStay: this.openStay
    });
  
    this.availableBuses = [
      { name: 'Easy Coach', fare: 1200 },
      { name: 'Modern Coast', fare: 1500 },
      {
        name: 'Dreamline',
        fare: 1800,
        reason: 'Luxury coach with WiFi and refreshments included'
      }
    ];
  
    const selectedBus = {
      id: 'route-1', // Add a unique ID (in a real app this comes from backend)
      origin: this.from,
      destination: this.to,
      date: this.travelDate,
      busOperator: this.availableBuses[0].name,
      price: this.availableBuses[0].fare,
      departureTime: '08:00 AM',
      arrivalTime: '02:00 PM',
      availableSeats: 40 // Add availableSeats
    };
  
    this.router.navigate(['/booking'], { state: { busRoute: selectedBus } });
  }
  
}

