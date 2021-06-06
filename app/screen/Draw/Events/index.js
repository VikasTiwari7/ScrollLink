import React from 'react';
import {View,Text} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Events =({navigation})=>{
    return(
<View>
    <View style={{margin:wp('5%'),width:wp('50%'),justifyContent:'space-evenly'}}>
    <MaterialCommunityIcons name="keyboard-backspace" size={35} color={'white'}
                   />
        
    <Text style={{fontSize:20,fontWeight:'bold'}}>Events</Text>
    </View>
    <View style={{alignSelf:'center',margin:wp('5%')}}>
        < Text style={{fontSize:17,fontWeight:'900'}}>You haven't created any Events yet</Text>
    </View>
    <View style={{alignSelf:'center',backgroundColor:'#b9424d',padding:10,borderRadius:10,margin:wp('5%')}}>
        <Text style={{color:'white'}}>Create album</Text>
    </View>
</View>
    )
}
export default Events;