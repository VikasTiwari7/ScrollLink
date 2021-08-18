import React,{useState,useEffect} from 'react';
import { View,Text, ScrollView } from 'react-native';
import { TextInput} from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
  import * as Utility from '../../../utility/index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as api from '../../../api/url';
const Profile_General_Setting=({navigation})=>{

    const [userName,setuserName]=useState();
    const [email,setEmail]=useState();
    const [dob,setDob]=useState();
    const [phone,setPhone]=useState();
    const [Gender,setGender]=useState("male");
    const [Country,setCountry]=useState();
    const [Weather,setWeather]=useState("7.c");
    useEffect(()=>{
        retrieveProfiledata()
    },[])
    const retrieveProfiledata=async()=>{
        let userId = await Utility.getFromLocalStorge("userId");
        let token=await Utility.getFromLocalStorge("JWT");
        console.log(userId);
        console.log("token=" +token)
        try {
            // console.log(`http://192.168.43.39:4000/users/${userId}/getprofiledata`);
            let response = await fetch(
              `${api.BaseUrl}/users/${userId}/getprofiledata`,
              {
                method: "GET",
               headers: { 
                Authorization: 'Bearer '+token} 
        } );
            
            let json = await response.json();
            console.log(json)
          //   await Utility.setInLocalStorge('songs', json.item);
          setuserName(json.user_info.username);
          setEmail(json.user_info.email);
          setPhone(json.user_info.mobile_no);
          setDob(json.user_profile.birthdata);
          setGender(json.user_profile.gender);
          setCountry(json.user_profile.location)
        
          
          } catch (error) {
            console.error(error);
          }
    }
    const backarrow=()=>{
        navigation.navigate('drawer')
    }
    return(
        <View>
            <ScrollView>
            <View style={{flexDirection:'row',width:wp('60%'),justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={()=>backarrow()}>
                  <MaterialCommunityIcons name="keyboard-backspace" size={35} color={'#b9424d'}
                   />
                   </TouchableOpacity>
            <Text style={{fontSize:22,fontWeight:'bold'}}>General Setting</Text>
            </View>
            <View style={{backgroundColor:'white',borderRadius:10,margin:wp('4%'),padding:10,elevation:10,opacity:10}}>
            <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Username"
                value={userName}
                onChangeText={text => setuserName(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="E-Mail"
                value={email}
                onChangeText={text => setEmail(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="BIrthday"
                value={dob}
                onChangeText={text => setDob(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Phone"
                value={phone}
                onChangeText={text => setPhone(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Gender"
                value={Gender}
                onChangeText={text => setGender(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Country"
                value={Country}
                onChangeText={text => setCountry(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Weather Unit"
                value={Weather}
                onChangeText={text => setWeather(text)}
                />
                </View>
            

             <View style={{padding:10,alignSelf:'center',backgroundColor:'#b9424d',width:wp('40%'),borderRadius:15}}>
                    <Text style={{alignSelf:'center',color:'white',fontWeight:'bold',fontSize:18}}>Save </Text>
                </View>
                </View>
            
                </ScrollView>
        </View>

    )
}
export default Profile_General_Setting;