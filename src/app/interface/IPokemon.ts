export interface IPokemonRaw {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[];
}

export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: ISprites;
  stats: IStats[];
  types: ITypes[];
}

export interface ISprites {
  other: {
    [key: string]: {
      front_default: string;
    };
  };
}

export interface IStats {
  base_stat: number;
  stat: {
    name: string;
  };
}

export interface ITypes {
  slot: number;
  type: {
    name: string;
  };
}
