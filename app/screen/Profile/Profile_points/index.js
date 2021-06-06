import React from 'react';
import { View,Text, ScrollView,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
const Profile_Points=({navigation})=>{
    const goToWallet=()=>{
        navigation.navigate('ProfileWallet')
    }
    return(
        <View>
            <ScrollView>
            <Text style={{fontSize:22,fontWeight:'bold',margin:wp('5%')}}>My Points</Text>
            <View style={{margin:wp('5%'),backgroundColor:'white',borderRadius:10,padding:10}}>
            <View style={{flexDirection:'row',margin:wp('5%')}}>
                <View>

                </View>
                <View>
                    <Text>Earn 10 points by commenting any post</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',margin:wp('5%')}}>
                <View>

                </View>
                <View>
                    <Text>Earn 15 points by creating a new  post</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',margin:wp('5%')}}>
                <View>

                </View>
                <View>
                    <Text>Earn 5 points by reacting any post</Text>
                </View>
            </View>
            <View style={{flexDirection:'row',margin:wp('5%')}}>
                <View>

                </View>
                <View>
                    <Text>Earn 15 points by creating  any blog</Text>
                </View>
                </View>
                <View style={{borderWidth:.5}}>
                    <View style={{flexDirection:'row',backgroundColor:'#D3D3D3',padding:10}}>
                    <View>
                        <Text>POINTS</Text>
                        <Text>15</Text>
                    </View>
                    <View>
                        <Image></Image>
                    </View>
                </View>
                <View style={{backgroundColor:'white'}}>
                    <View>
                        <Image></Image>
                    </View>
                    <View style={{margin:wp('4%')}}>
                        <Text>Your earned points will automaticallly go to </Text>
                        <TouchableOpacity onPress={()=>goToWallet()}>
                        <Text style={{alignSelf:'center',color:'blue',textDecorationLine:'underline'}}>Wallets</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                </View>
            </View>
          
            </ScrollView>
        </View>
    )
}
export default Profile_Points;