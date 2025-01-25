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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pokemonDetails: IPokemonDetails[] = [];
  public selectedPokemon: IPokemonDetails | null = null;

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
    if (event.key !== 'Enter' && event.key !== ' ') return;
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
}
