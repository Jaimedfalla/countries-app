import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { switchMap } from 'rxjs';

@Component({
  selector: 'countries-coutry-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit {

  public country?:Country;

  constructor(private activatedRoute:ActivatedRoute,
    private service:CountriesService,
    private router:Router) {}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.service.searchCountryByCode(id)) // switchMap: Crea un nuevo observable basado en uno anterior
    )
    .subscribe((resp) => {
      if(!resp) return this.router.navigateByUrl('');

      this.country = resp;
      return;
    })
  }
}
