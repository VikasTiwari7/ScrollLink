import React,{useEffect, useState} from 'react';
import { NavigationContainer,DefaultTheme,DarkTheme } from '@react-navigation/native';
import Mainstcak from './app/navigation/stack';
import { EventRegister } from 'react-native-event-listeners'

const App= ()=>{
  const [darkApp,setDarkApp]=useState(false)
  const apptheme=darkApp?DarkTheme:DefaultTheme
  useEffect(()=>{
    let eventListener = EventRegister.addEventListener('myCustomEvent',data=>{
      setDarkApp(data);
      console.log(darkApp);
    })
  
  },[])
  return(
    <NavigationContainer theme={apptheme}>
      <Mainstcak/>
    </NavigationContainer>
  )
}
export default App;