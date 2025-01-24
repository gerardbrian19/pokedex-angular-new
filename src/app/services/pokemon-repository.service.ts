import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import { IPokemonDetails, IPokemonRaw } from '../interface/IPokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonRepositoryService {
  constructor(private readonly http: HttpClient) {}

  private readonly baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';
  private readonly limit: number = 100;
  private readonly offset: number = 0;
  private readonly getPokemonUrl: string = `${this.baseUrl}?limit=${this.limit}&offset=${this.offset}`;
  private readonly getPokemonDetailUrl = (pokemonName: string): string =>
    `${this.baseUrl}/${pokemonName}`;

  public getPokemon(): Observable<IPokemonRaw> {
    return this.http.get<IPokemonRaw>(this.getPokemonUrl);
  }

  public getPokemonDetails(pokemonName: string): Observable<IPokemonDetails> {
    return this.http.get<IPokemonDetails>(
      this.getPokemonDetailUrl(pokemonName)
    );
  }

  public getAllPokemonDetails(): Observable<IPokemonDetails[]> {
    return this.getPokemon().pipe(
      map((response: IPokemonRaw) =>
        response.results.map((result) => result.name)
      ),
      mergeMap((names: string[]) =>
        forkJoin(names.map((name) => this.getPokemonDetails(name)))
      ),
      map((pokemonDetails: IPokemonDetails[]) =>
        [...pokemonDetails].sort((a, b) => a.id - b.id)
      )
    );
  }
}
