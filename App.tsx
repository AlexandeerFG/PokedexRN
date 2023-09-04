import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/navigator/navigator';

const App = () => {
  return (
    <NavigationContainer>
      <Navigator/>
    </NavigationContainer>
  );
};

export default App;
