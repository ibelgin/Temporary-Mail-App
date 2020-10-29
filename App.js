import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react"
import LoginScreen from "./components/LoginPage";
import EmailScreen from "./components/EmailPage";
import EmailMain from "./components/MainEmails";

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
        

      <Stack.Screen 
          name="Email"
          component={EmailScreen} 
            options={{
              headerShown:false
            }}
          />

    
      <Stack.Screen 
          name="EmailNow"
          component={EmailMain} 
             options={{
                title: 'Inbox',
                headerStyle: {
                  backgroundColor: '#1A1A1F',
                  shadowColor: 'transparent'
                },
                headerTintColor: '#FFF'
              }}
          />
      
      
          
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

