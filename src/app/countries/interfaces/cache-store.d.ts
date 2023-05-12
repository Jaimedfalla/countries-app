import { Country } from "./country";

export interface CacheStore
{
  byCapital:TermCountry,
  byCountry:TermCountry,
  byRegion:TermCountry
}

export interface TermCountry
{
  term:string,
  countries:Country[]
}
