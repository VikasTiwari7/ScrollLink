import React from 'react';
import { View,Text, ScrollView ,Image} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
const Profile_Pokes=()=>{
    return(
        <View>
            <ScrollView>
            <Text style={{fontWeight:'bold',fontSize:22,margin:wp('5%')}}>Pokes</Text>
            <View style={{margin:wp('5%'),backgroundColor:"white",padding:10,borderRadius:10,height:hp('25%')}}>
                <View style={{alignSelf:'center'}}>
                <Image>

                </Image>
                <Text style={{fontSize:18}}>No Pokes to show</Text>
            </View>
            </View>
            </ScrollView>
        </View>
    )
}
export default Profile_Pokes;