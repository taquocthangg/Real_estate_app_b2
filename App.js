import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Add_Listing from './src/screens/Add_Listing';
import Filters from './src/screens/Filters';
import Map from './src/screens/Map';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Add_Listing" component={Add_Listing} options={{headerShown:false}} />
        <Stack.Screen name="Filters" component={Filters} options={{headerShown:false}} />
        <Stack.Screen name="Map" component={Map} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
