import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PokemonRepositoryService } from '../../services/pokemon-repository.service';
import { IPokemonDetails } from '../../interface/IPokemon';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzLayoutModule,
    NzImageModule,
    NzFlexModule,
    NzEmptyModule,
    NzBackTopModule,
    NzTabsModule,
    NzIconModule,
    NzProgressModule,
    FormsModule,
    NzInputModule,
    NzAutocompleteModule,
    NzDropDownModule,
    NzButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pokemonDetails: IPokemonDetails[] = [];
  public selectedPokemon: IPokemonDetails | null = null;
  public colours: Record<string, string> = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD',
  };

  constructor(private readonly pokemonRepo: PokemonRepositoryService) {}

  public ngOnInit(): void {
    this.fetchAllPokemon();
  }

  private fetchAllPokemon(): void {
    this.pokemonRepo.getAllPokemonDetails().subscribe((pokemonDetails) => {
      this.pokemonDetails = pokemonDetails;
      console.log('this.pokemonDetails ', this.pokemonDetails);
    });
  }

  public handleKeyPress(event: KeyboardEvent, pokemon: IPokemonDetails): void {
    if (event.key !== 'Enter' && event.key !== ' ') {
      return;
    }
    this.handleClick(pokemon);
  }

  public handleClick = (pokemon: IPokemonDetails) => {
    console.log('pokemon', pokemon);
    this.selectedPokemon = pokemon;
  };

  public formatStatName(statName: string): string {
    return statName
      .replace('-', ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  public get typeColor(): string {
    return this.selectedPokemon?.types[0]?.type.name
      ? this.colours[this.selectedPokemon.types[0].type.name] || '#fff'
      : '#fff';
  }
}
