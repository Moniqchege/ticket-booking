import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { BusRoute } from '../../interfaces/bus-route.interface';
import { NgFor, DatePipe, CommonModule } from '@angular/common';
import { NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, DatePipe, NgbDatepickerModule, NgbTimepickerModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  private dataService = inject(DataService);
  private router = inject(Router);

  origin = '';
  destination = '';
  date = '';
  routes: BusRoute[] = [];
  filteredRoutes: BusRoute[] = [];
  isLoading = false;

  constructor() {
    this.routes = this.dataService.getRoutes();
    this.filteredRoutes = [...this.routes];
  }

  search(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.filteredRoutes = this.routes.filter(route => {
        const matchesOrigin = this.origin ? route.origin.toLowerCase().includes(this.origin.toLowerCase()) : true;
        const matchesDestination = this.destination ? route.destination.toLowerCase().includes(this.destination.toLowerCase()) : true;
        const matchesDate = this.date ? route.date === this.date : true;
        return matchesOrigin && matchesDestination && matchesDate;
      });
      this.isLoading = false;
    }, 500);
  }

  viewRouteDetails(routeId: string): void {
    this.router.navigate(['/book', routeId]);
  }

  clearFilters(): void {
    this.origin = '';
    this.destination = '';
    this.date = '';
    this.filteredRoutes = [...this.routes];
  }
}