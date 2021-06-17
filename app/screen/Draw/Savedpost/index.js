import React from 'react';
import {View,Text,Image} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
const Savedpost=({navigation})=>{
return(
    <View>
        <View>
        <Text style={{fontSize:22,fontWeight:'bold',margin:wp('5%')}}>
            Saved Post
        </Text>
        </View>
        <View style={{borderRadius:10,margin:wp('5%'),backgroundColor:'white',padding:10}}>
            <View style={{alignSelf:'center'}}>
            <Image source={require('../../../images/png/albums.png')} style={{height:100,width:100,alignSelf:'center'}}></Image>

            </View>
            <View style={{alignSelf:'center'}}>
                <Text style={{fontSize:18}}>You don't have any post yet </Text>
            </View>
        </View>
    </View>
)
}
export default Savedpost;