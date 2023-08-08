import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ROUTES } from './src/constants';
import { Home, Login } from './src/screens';

const Stack = createNativeStackNavigator();

export default function App() {

 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name={ROUTES.LOGIN} component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


