import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon';
import {ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  template: `
    <h2 class="header center">Editer {{ pokemon?.name }}</h2>
    <p *ngIf="pokemon" class="center">
      <img [src]="pokemon.picture">
    </p>
    <app-pokemon-form *ngIf="pokemon" [pokemon]="pokemon"></app-pokemon-form>
    <p *ngIf="!pokemon">Pokemon non trouver</p>`

})
export class EditPokemonComponent implements OnInit{
  pokemon: Pokemon|undefined;
  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    const pokemonId: string|null = this.route.snapshot.paramMap.get('id');
    pokemonId ? 
    this.pokemonService.getPokemonById(+pokemonId).subscribe(pokemon => this.pokemon = pokemon) : undefined;

  }
}
