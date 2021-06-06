import React from 'react';
import { View,Text, ScrollView } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
const Profile_Wallet=()=>{
    return(
        <View>
            <ScrollView>
            <Text style={{fontWeight:'bold',fontSize:22,margin:wp('5%')}}>Wallet</Text>
            <View style={{margin:wp('5%'),backgroundColor:'white',padding:10,borderRadius:10}}>
                <View style={{alignSelf:'center'}}>
                    <Text style={{fontSize:18}}>Current  balance</Text>
                </View>
                <View style={{flexDirection:'row',alignSelf:'center'}}>
                    <View>
                        <Text>$</Text>
                    </View>
                    <View>
                        <Text style={{fontSize:22,fontWeight:'bold'}}>0.01</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                   <View>
                       <Text>Add Funds</Text>
                   </View>
                   <View>
                       <Text>Send money</Text>
                   </View>
                </View>
            </View>
            <View style={{margin:wp('5%'),backgroundColor:'white',padding:10,borderRadius:10}}>
                <Text>Transactions</Text>
                <View style={{alignSelf:'center',marginTop:hp('5%')}}>
                    <Text>Looks like you don't have any</Text>
                    <Text style={{alignSelf:'center'}}>transction yet!</Text>
                </View>
            </View>
            </ScrollView>
        </View>
    )
}
export default Profile_Wallet;