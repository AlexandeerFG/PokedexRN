import { Image, FlatList, ActivityIndicator } from 'react-native'
import { Text } from 'react-native'
import { styles } from '../theme/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginate } from '../hooks/usePokemonPaginate';

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const { simplePokemonLst, loadPokemons } = usePokemonPaginate();

  console.log(simplePokemonLst);
  
  return (
    <>
        <Image 
          source={ require('../assets/pokebola.png') } 
          style={ styles.pokeBolaBG }
        />
        <Text style = {{ 
          ...styles.title,
          ...styles.globalMargin,
          top: top + 5
         }}>
          Pokédex
        </Text>

        <FlatList //-- ESTE COMPONENTE SE ENCARGA DE HACERLE UN LAZYLOAD A LAS PETICIONES
          data={ simplePokemonLst }
          keyExtractor={ ( pokemon ) => pokemon.id } 
          renderItem={({ item }) =>(
            <Image
              source={{  uri: item.picture }}
              style={{ 
                width: 100,
                height: 100
               }}
            />
          )}
          //infinite scroll
          onEndReached={ loadPokemons }
          onEndReachedThreshold={ 0.2 }

          ListFooterComponent={
            <ActivityIndicator 
              style={{ height: 100}}
              size={ 20 }
              color="#474CB0"
            />
          }
        />
    </>
  )
}
