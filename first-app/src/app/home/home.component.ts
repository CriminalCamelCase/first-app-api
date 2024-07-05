import { Component, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = []
  housingService: HousingService = inject(HousingService);
  filteredLocationList: HousingLocation[] = [];
  //housingLocationList$: Observable<HousingLocation[]> | undefined = this.housingService.get();

  constructor() {
    //interval(2000).subscribe((data) => console.log(data));
    this.housingService.get().subscribe((data)=>{this.housingLocationList = data; this.filteredLocationList = this.housingLocationList;});
    //this.housingLocationList$ = this.housingService.get();

   // this.housingService.get().subscribe((data)=>{this.housingLocationList = data; this.filteredLocationList = this.housingLocationList;});
    //this.filteredLocationList = this.housingLocationList;
  }
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
      return;
    }
    this.filteredLocationList = this.housingLocationList.filter((housingLocation) =>
      housingLocation?.city.toLowerCase().includes(text.toLowerCase()),
    );
  }
}
