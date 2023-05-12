import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore, TermCountry } from '../interfaces/cache-store';
import { KeysStore, SearchType } from '../interfaces/search.type';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private cacheStore:CacheStore={
    byCapital:{term:'',countries:[]},
    byCountry:{term:'',countries:[]},
    byRegion: {term:'',countries:[]}
  };

  private url:string ='https://restcountries.com/v3.1';

  constructor(private http:HttpClient) {
    this.loadFromLocalStorage();
  }

  searchBy(term:string,type:SearchType,key:KeysStore):Observable<Country[]>
  {
    return this.http.get<Country[]>(`${this.url}/${type}/${term}`)
      .pipe(
        catchError(error => of([])),
        tap(countries => {
          this.cacheStore[key] ={
            term,
            countries
          }
        }),
        tap(() => this.saveToLocalStorage())
      );
  }

  getCountriesByKey(key:KeysStore):TermCountry
  {
    return this.cacheStore[key];
  }

  searchCountryByCode(term:string):Observable<Country|null>
  {
    return this.http.get<Country[]>(`${this.url}/alpha/${term}`)
      .pipe(
        map(countries => countries.length > 0? countries[0]:null),
        catchError(error => of(null)),
        tap(()=>this.saveToLocalStorage())
      );
  }

  private saveToLocalStorage()
  {
    localStorage.setItem('cache-store',JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(){
    const store = localStorage.getItem('cache-store');

    if(!store) return;

    this.cacheStore = JSON.parse(store!);
  }
}
