import React from 'react';
import { Image, ScrollView, Text, View,Alert,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
  import * as Utility from '../../../utility/index';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState,useEffect } from 'react';
import { Checkbox } from 'react-native-paper';
import { EventRegister } from 'react-native-event-listeners';
const Profile_screen=({navigation})=>{
const [userName,setuserName]=useState();
const [dark,setDark]=useState(false);
const [imagefilePath,setImagefilepath]=useState();
const [loader,setLoader]=useState(false)
useEffect(() => {
      retrieveData();
  },[]);
  const retrieveData = async () => {
    setLoader(true);
    let username = await Utility.getFromLocalStorge("fullName");
    let imageUrl=await Utility.getFromLocalStorge("imageUrl");
    setImagefilepath(imageUrl);
    console.log(imagefilePath);
    setuserName(username);
    setLoader(false)
  };
    const openCoverProfile=()=>{
    navigation.navigate('Profile_cover')
    }
    const openWallet=()=>{
        navigation.navigate('ProfileWallet')
    }
    const openPoints=()=>{
        navigation.navigate('ProfilePoints')
    }
    const openPokes=()=>{
        navigation.navigate('ProfilePokes')
    }
    const openPrivacySetting=()=>{
        navigation.navigate('ProfilePrivacySetting')
    }
    const openGeneralSetting=()=>{
        navigation.navigate('ProfileGeneralSetting')
    }
    const deleteAccount= async()=>{
        
        await Utility.removeAuthKey('userId')
        await Utility.removeAuthKey('email')
        await Utility.removeAuthKey('fullName')
        navigation.navigate('Signin');
    }
    const  cancelbutto=()=>{
        navigation.naviagte('Profile_screen');
    }
    const logout=()=>{
        Alert.alert(
            "",
            "Are you want to logout",
            [
                
                {
                text:"cancel",onPress:()=>cancelbutto()
                },
                { text: "Ok", onPress: () => deleteAccount() },
            ],
            { cancelable: true },
        );
       
    }
  
    return(
        <View>
            <ScrollView>
            {loader == true ? (
          <ActivityIndicator style={{marginTop: 10}} size="large" color="red" />
        ) : null}
                <View style={{margin:wp('3%')}}>
                    <Text style={{fontSize:20,fontWeight:'bold'}}>{userName}</Text>
                </View>
                <View style={{flexDirection:'row',margin:wp('5%')}}>
                    <TouchableOpacity onPress={()=>openCoverProfile()}>
                    <View>
                        {imagefilePath?
                         <Image source={{uri:imagefilePath}} style={{height:40,width:40,borderRadius:50}}></Image>:
                    <Image source={require('../../../images/splashlogo.png')} style={{height:40,width:40,borderRadius:50}}>
                    </Image>}
                    </View>
                    </TouchableOpacity>
                    <View style={{marginLeft:wp('5%')}}>
                        <Text style={{fontSize:16,fontWeight:'bold'}}>My Profile</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row',width:wp('70%'),marginLeft:wp('15%'),justifyContent:"space-around"}}>
                    <TouchableOpacity onPress={()=>openWallet()}>
                    <View style={{backgroundColor:'gray',padding:7,borderRadius:10,width:wp('20%')}}>
                       
                        <Text>$0.01</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>openPoints()}>
                    <View style={{backgroundColor:'gray',padding:7,borderRadius:10,width:wp('20%')}}>
                        <Text>15</Text>
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>openPokes()}>
                    <View style={{backgroundColor:'gray',padding:7,borderRadius:10,width:wp('20%')}}>
                        <Text>Pokes</Text>
                    </View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>openPrivacySetting()}>
                <View style={{margin:wp('5%'),flexDirection:'row',alignContent:'center',justifyContent:'space-evenly',width:wp('50%')}}>
                    <View>
                    <Image source={require('../../../images/png/locked-6.png')} style={{height:wp('8%'),width:wp('8%')}}></Image>
                    </View>
                    <View>
                        <Text  style={{fontSize:18,fontWeight:'900'}}>Privacy Setting</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>openGeneralSetting()}>
                <View style={{margin:wp('5%'),flexDirection:'row',alignContent:'center',justifyContent:'space-evenly',width:wp('50%')}}>
                    <View>
                    <Image source={require('../../../images/png/settings-4.png')} style={{height:wp('7%'),width:wp('7%')}}></Image>
                    </View>
                    <View>
                        <Text style={{fontSize:18,fontWeight:'900'}}>General Setting</Text>
                    </View>
                </View>
                </TouchableOpacity>
                <View style={{margin:wp('5%'),flexDirection:'row',alignContent:'center',justifyContent:'space-evenly',width:wp('55%')}}>
                    <View>
                    <MaterialCommunityIcons name="email" size={25} />
                    </View>
                    <View>
                        <Text style={{fontSize:18,fontWeight:'900'}}>Invite Your friends</Text>
                    </View>
                </View>
                <View style={{margin:wp('5%'),flexDirection:'row',alignContent:'center',justifyContent:'space-between',width:wp('80%')}}>
                    <View style={{flexDirection:'row'}}>
                    <View style={{marginLeft:wp('3%')}}>
                    <MaterialCommunityIcons name="weather-night" size={25} />
                    </View>
                    <View style={{marginLeft:wp('5%')}}>
                        <Text style={{fontSize:18,fontWeight:'900'}}>Night mode</Text>
                    </View>
                    </View>
                    <View>
                        <Checkbox 
                         status={!dark}
                         color="#b9424d"
                        
                        onPress={(v1)=> EventRegister.emit('myCustomEvent', v1)}>

                        </Checkbox>
                    </View>
                </View>
                <TouchableOpacity onPress={()=>logout()}>
                <View style={{margin:wp('5%'),flexDirection:'row',alignContent:'center',justifyContent:'space-evenly',width:wp('30%')}}>
                    <View>
                    <MaterialCommunityIcons name=  "logout"
 size={25} />
                    </View>
                    <View>
                        <Text style={{fontSize:18,fontWeight:'900'}}>Log out</Text>
                    </View>
                </View>
                </TouchableOpacity>
    
            </ScrollView>
           
        </View>
    )

}
export default Profile_screen;