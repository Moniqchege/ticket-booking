import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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


  filterCities(query: string, type: 'from' | 'to') {
    const filtered = this.cities.filter(city =>
      city.toLowerCase().startsWith(query.toLowerCase())
    );
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
    ];  }
  }

