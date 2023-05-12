import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryPage } from '../../interfaces/abstract-pages';

@Component({
  selector: 'coutries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent extends CountryPage{
  constructor(service:CountriesService){
    super(service);
    this.type = 'name';
    this.key = 'byCountry';
  }
}
