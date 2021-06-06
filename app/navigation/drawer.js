import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTab from './Bottomtab';
// import Drawrerbg from './drawerbg';
import Drawerbg from './drawerbg';
const Drawer = createDrawerNavigator();
export default DrawerNavigator=({navigation})=>{
    return(
        <Drawer.Navigator drawerContent={Drawerbg} >
            <Drawer.Screen name='BottomTab' component={BottomTab} options={{drawerLabel:'Home'}}/>
            {/* <Drawer.Screen name component={}/>
            <Drawer.Screen name component={}/>
            <Drawer.Screen name component={}/>
            <Drawer.Screen name component={}/> */}
            
        </Drawer.Navigator>
    )
}