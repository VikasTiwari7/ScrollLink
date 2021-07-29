import React from 'react';
import { View,Text,Image } from 'react-native';
const Pagepost =({navigation})=>{
    return(
        <View>
            <Text>Page post </Text>
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                <View>
                <Image source={require('../../../../images/png/albums.png')} style={{height:50,width:50}}></Image>
                </View>
                <View style={{alignSelf:'center'}}>
                    <Text>Vikas Tiwari</Text>
                </View>
            </View>
        </View>
    )
}
export default Pagepost;