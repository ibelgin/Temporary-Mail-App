import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react"
import LoginScreen from "./components/LoginPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login"
          component={LoginScreen} 
            options={{
              headerShown:false
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

