import { CountriesService } from "../services/countries.service";
import { TermCountry } from "./cache-store";
import { Country } from "./country";
import { KeysStore, SearchType } from "./search.type";

export abstract class CountryPage{

  public data?:TermCountry;
  public isLoading:boolean=false;
  protected type?:SearchType;
  protected key?:KeysStore;

  constructor(protected service:CountriesService){}

  get countries(): Country[] {

    this.data = this.service.getCountriesByKey(this.key!);

    return this.data.countries;
  }

  get term(): string {

    this.data = this.service.getCountriesByKey(this.key!);

    return this.data.term;
  }

  onValue(term:string):void
  {
    this.isLoading = true;
    this.service.searchBy(term,this.type!,this.key!)
      .subscribe(resp => {
        this.isLoading = false;
      })
  }
}
