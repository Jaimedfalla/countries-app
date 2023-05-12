import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryPage } from '../../interfaces/abstract-pages';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html'
})
export class ByCapitalPageComponent extends CountryPage{

  constructor(service:CountriesService){
    super(service);
    this.type ='capital';
    this.key = 'byCapital';
  }
}

