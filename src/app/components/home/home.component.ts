import { Component, OnInit } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PokemonRepositoryService } from '../../services/pokemon-repository.service';
import { IPokemonDetails } from '../../interface/IPokemon';
import { CommonModule } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzLayoutModule,
    NzImageModule,
    NzFlexModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public pokemonDetails: IPokemonDetails[] = [];

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
}
