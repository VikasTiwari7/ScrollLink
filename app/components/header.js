import React from 'react';
import {View,Text,TextInput, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../utility/index';
const Header=({navigation})=>{
    return(
    <View style={{ flexDirection: 'row', alignItems: 'center',height:'10%' }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()
                }>
                    <View>
                        <MaterialCommunityIcons name="menu" size={25} color={'#b9424d'} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('searchscreen')} activeOpacity={.8}>
                <View  style={{marginLeft:'10%'}} >
                    <Text style={{color:'#b9424d'}}>Search your post friend and many more...</Text>
                </View>
                </TouchableOpacity>
            </View>
    );

}
export default Header;
