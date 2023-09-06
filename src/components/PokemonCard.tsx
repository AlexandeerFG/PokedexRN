import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {useState, useEffect} from 'react';
import ImageColors from 'react-native-image-colors';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

export const PokemonCard = ({pokemon}: Props) => {
  const [bgColor, setbgColor] = useState('grey');

  useEffect(() => {
    ImageColors.getColors(pokemon.picture, {
      fallback: 'grey',
      cache: true,
      key: pokemon.picture,
    }).then((colors: any) => {
      colors.platform === 'ios';
      switch (colors.platform) {
        case 'android':
          setbgColor(colors.dominant || bgColor);
          break;
        case 'ios':
          setbgColor(colors.background || bgColor);
          break;
        case 'web':
          setbgColor(colors.dominant || bgColor);
          break;
        default:
          setbgColor(bgColor);
          break;
      }
    });
  }, []);
  return (
    <TouchableOpacity activeOpacity={0.2}>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        {/* Nombre pokemon */}
        <View>
          <Text style={{...styles.name}}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        {/* Pokebola */}
        <View style={{...styles.pokebolaContainer}}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={{...styles.pokebola}}
          />
        </View>
        {/* Imagen pokemon */}
        <FadeInImage uri={pokemon.picture} style={{...styles.pokemonImage}} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    height: 120,
    width: 160,
    marginBottom: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    // elevation: 5,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
    fontStyle: 'italic',
  },
  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -25,
    bottom: -20,
  },
  pokemonImage: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -8,
    bottom: -7,
    opacity: 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    // elevation: 24,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    opacity: 0.6,
  },
});
