import React from 'react';
import {View,Text,TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../utility/index';
const Header=({navigation})=>{
    return(
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()
                }>
                    <View>
                        <MaterialCommunityIcons name="menu" size={25} color={'#b9424d'} />
                    </View>
                </TouchableOpacity>
                <View>
                    <TextInput placeholder="Search any posts " placeholderTextColor="#b9424d"
                        style={{ marginLeft: wp('5%') }}
                    ></TextInput>
                </View>
            </View>
    );

}
export default Header;
