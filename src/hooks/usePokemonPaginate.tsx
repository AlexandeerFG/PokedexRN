import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import { PokemonPaginatedResponse, Result, SimplePokemon } from '../interfaces/pokemonInterfaces';

export const usePokemonPaginate = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [simplePokemonLst, setsimplePokemonLst] = useState<SimplePokemon[]>([])
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=10');

  const loadPokemons = async () => {
    setIsLoading(true);
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(nextPageUrl.current);
    nextPageUrl.current = resp.data.next;
    mapPokemonLst( resp.data.results );
  };

  const mapPokemonLst = ( pokemonLst: Result[] ) => {
    const newPokemonLst: SimplePokemon[] = pokemonLst.map(({ name, url }) => {
        const urlParts = url.split('/');
        const id = urlParts[ urlParts.length - 2 ];
        const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

        return{ id, picture, name }
    });
    // crea un arreglo con los nuevos pokemons que ya estan (newPokemonLst) y los que ya estan en la lista (simplePokemonLst)
    setsimplePokemonLst([ ...simplePokemonLst, ...newPokemonLst]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {
    //propiedades
    isLoading,
    simplePokemonLst,
    //metodos
    loadPokemons
  };
};
