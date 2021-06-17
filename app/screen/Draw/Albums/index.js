import React from 'react';
import {View,Text,Image} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../../components/header';
const Albums =({navigation})=>{
    return(
<View>
    <Header navigation={navigation}/>
    <ScrollView>
    <View style={{margin:wp('5%'),width:wp('50%'),justifyContent:'space-evenly',flexDirection:'row'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('drawer')}>
    <MaterialCommunityIcons name="keyboard-backspace" size={35} color={'#b9424d'}
                   />
                   </TouchableOpacity>
    <Text style={{fontSize:20,fontWeight:'bold'}}>My Albums</Text>
    </View>
    <View style={{alignSelf:'center',margin:wp('5%')}}>
        <Image source={require('../../../images/png/albums.png')} style={{height:100,width:100,alignSelf:'center'}}></Image>
        < Text style={{fontSize:17,fontWeight:'900'}}>You haven't created any albums yet</Text>
    </View>
    <TouchableOpacity>
    <View style={{alignSelf:'center',backgroundColor:'#b9424d',padding:10,borderRadius:10,margin:wp('5%')}}>
        <Text style={{color:'white'}}>Create album</Text>
    </View>
    </TouchableOpacity>
    </ScrollView>
</View>
    )
}
export default Albums;