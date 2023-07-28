import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';

@Injectable()
// providedIn: 'root',
export class PokemonService {
  constructor(private http:HttpClient) {}
  getPokemonList(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>('api/pokemons').pipe(
      tap((response) => console.table(response)),
      catchError((error) => {
        console.log(error);
        return of([]);
      })  
    );
  }
  updatePokemon(pokemon: Pokemon): Observable<null> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    return this.http.put<null>(`api/pokemons/${pokemon.id}`, pokemon, httpOptions).pipe(
      tap((response) => console.log(response)),
      catchError((error) => {
        console.log(error);
        return of(null);
      }
      )
      );
  }
  deletePokemonById(pokemonId: number): Observable<null> {
    return this.http.delete<null>(`api/pokemons/${pokemonId}`).pipe(
      tap((response) => console.log(response)),
      catchError((error) => {
        console.log(error);
        return of(null);
      }
      )
    );
  }
  addPokemon(pokemon: Pokemon): Observable<Pokemon> {
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
    };
    return this.http.post<Pokemon>('api/pokemons', pokemon, httpOptions).pipe(
      tap((response) => console.log(response)),
      catchError((error) => {
        console.log(error);
        return of(pokemon);
      }
      )
    );
  }
   
  getPokemonById(id: number): Observable<Pokemon | undefined> {
    return this.http.get<Pokemon>(`api/pokemons/${id}`).pipe(
      tap((response) => console.log(response)),
      catchError((error) => {
        console.log(error);
        return of(undefined);
      }
      )
    );
  }
  getPokemonTypes(): string[] {
    return [
      'Plante',
      'Feu',
      'Eau',
      'Insecte',
      'Normal',
      'Electrik',
      'Poison',
      'Fée',
      'Vol',
      'Combat',
      'Psy',
    ];
  }
}
