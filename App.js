import React from "react"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from "./components/LoginPage";
import EmailScreen from "./components/EmailPage";
import EmailMain from "./components/MainEmails";
import ContentPage from "./components/ContentPage"

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
	      initialRouteName={'Login'}
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: 'vertical',
          animationEnabled: false,
        }}
        mode={'card'}>

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
          name="Content"
          component={ContentPage} 
            options={{
                title: 'Email',
                headerStyle: {
                  backgroundColor: '#1A1A1F',
                  shadowColor: 'transparent'
                },
                headerTintColor: '#FFF'
              }}
          />   
       
          
        
      <Stack.Screen 
          name="EmailNow"
          component={EmailMain} 
            options={{
              headerShown:false
            }}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

