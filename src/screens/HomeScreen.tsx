import { Image, FlatList, ActivityIndicator, View } from 'react-native'
import { Text } from 'react-native'
import { styles } from '../theme/appTheme'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { usePokemonPaginate } from '../hooks/usePokemonPaginate';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets();
  const { simplePokemonLst, loadPokemons } = usePokemonPaginate();
  
  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokeBolaBG}
      />
      {/* ESTE COMPONENTE SE ENCARGA DE HACERLE UN LAZYLOAD A LAS PETICIONES */}
      <View style={{ alignItems:'center' }}>
        <FlatList
          ListHeaderComponent={
            <Text
              style={{
                ...styles.title,
                ...styles.globalMargin,
                top: top + 5,
                marginBottom: top + 20,
                paddingBottom: 5
              }}>
              Pokédex
            </Text>
          }
          numColumns={2}
          showsVerticalScrollIndicator={false}
          data={simplePokemonLst}
          keyExtractor={pokemon => pokemon.id}
          renderItem={({item}) => <PokemonCard pokemon={item} />}
          //infinite scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={20} color="#474CB0" />
          }
        />
      </View>
    </>
  );
}
