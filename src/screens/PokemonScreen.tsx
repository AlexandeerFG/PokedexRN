import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../navigator/navigator";
import Icon from "react-native-vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FadeInImage } from "../components/FadeInImage";
interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'>{};

export const PokemonScreen = ( { navigation, route }: Props) => {
  const { simplePokemon, color } = route.params;  
  const { name, id, picture } = simplePokemon;
  const { top } = useSafeAreaInsets();

  return (
    <View>
      {/* Cabecero */}
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: color,
        }}>
          {/* BackButton */}
        <TouchableOpacity
          onPress={ () => navigation.pop()}
          activeOpacity={0.8}
          style={{
            ...styles.backButton,
            top: top + 5,
          }}>
          <Icon name="arrow-back-outline" color='#FFFFFF' size={35} />
        </TouchableOpacity>
        {/* Nombre Pokemon */}
        <Text
          style={{ 
            ...styles.pokemonName,
            top: top + 40
           }}
        >
          { name  + '\n'} # { id }
        </Text>

        {/* Pokebola blanca */}
        <Image 
          style={ styles.pokeball }
          source={ require('../assets/pokebola-blanca.png')}
        />

        <FadeInImage
          uri={ picture }
          style={ styles.pokemonImage }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer:{
      height: 370, 
      zIndex: 999 ,
      alignItems: 'center',
      borderBottomRightRadius:1000,
      borderBottomLeftRadius:1000
  },
  backButton:{
    left: 15,
    position: 'absolute'
  },
  pokemonName:{
    color: '#FFFFFF',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball:{
    width: 250,
    height:250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImage:{
    width: 250,
    height: 250,
    position: 'absolute',
    bottom:-15
  }
})
