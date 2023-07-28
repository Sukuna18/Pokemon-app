import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
})
export class DetailPokemonComponent implements OnInit {
  pokemonList: Pokemon[];
  pokemon: Pokemon | undefined;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pokemonService: PokemonService
  ) {}
  ngOnInit(): void {
    const pokemonId: string | null = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      const id: number = +pokemonId;
      this.pokemonService.getPokemonById(id).subscribe(pokemon => this.pokemon = pokemon);
    }
  }
  goToPokemonList(): void {
    this.router.navigate(['/pokemons']);
  }
  goToEditPokemon(pokemon: Pokemon): void {
    const link = ['/edit/pokemon', pokemon.id];
    this.router.navigate(link);
  }
  deletePokemon(pokemon: Pokemon): void {
    this.pokemonService.deletePokemonById(pokemon.id).subscribe(() => this.goToPokemonList());
  }
}
