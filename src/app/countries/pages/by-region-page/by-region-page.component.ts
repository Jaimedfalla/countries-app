import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { CountryPage } from '../../interfaces/abstract-pages';
import { Region } from '../../interfaces/region.type';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'coutries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent extends CountryPage implements OnInit {
  public selected?:Region;

  constructor(service:CountriesService){
    super(service);
    this.type= 'region';
    this.key = 'byRegion';
  }

  ngOnInit(): void {
    this.selected = this.service.getCountriesByKey(this.key!).term as Region;
  }

  get regions():string[]
  {
    return Object.keys(Region);
  }

  override onValue(term: string): void {
    super.onValue(term);

    this.selected = term as Region;
  }
}
