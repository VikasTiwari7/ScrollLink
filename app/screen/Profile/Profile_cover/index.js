import React from 'react';
import { useState,useEffect } from 'react';
import { Image, ScrollView, Text,View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
  import * as Utility from '../../../utility/index';
  import ImagePicker from 'react-native-image-crop-picker';
  import TabViewExample from './tab';
  import * as api from '../../../api/url';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
  var RNFS = require('react-native-fs');
const ProfileCover=({navigation})=>{
    const [userName,setUserName]=useState();
    const [email,setEMail]=useState();
    const [filePath, setFilePath] = useState();
    const [coverFilepath,setCoverfilepath] =useState();
    const [coverurl,setCoverUrl]=useState();
    const [profileurl,setProfileUrl]=useState();


    useEffect(() => {
 
        retrieveData();
    
    },[]);
    const retrieveData = async () => {
      let userId = await Utility.getFromLocalStorge("userId");
      let token=await Utility.getFromLocalStorge("JWT");
      // console.log(userId);
      console.log("token=" +token)
      try {
          let response = await fetch(
            `http://192.168.43.39:4000/users/${userId}/getProfilePic`, // getCoverPic
            {
              method: "GET",
             headers: { 
              Authorization: 'Bearer '+token,
              // 'Accept': 'application/json',
              // 'Content-Type':'application/json'
            } 
      }
      )
      // var imageStr = this.arrayBufferToBase64(data.img.data.data);
          let json = await response;
          console.log(json)
          console.log(json._bodyBlob._data.__collector)


        //   await Utility.setInLocalStorge('songs', json.item)
      
        } catch (error) {
          console.error(error);
        }
    };
    const openGenralSettingPage=()=>{
        navigation.navigate('ProfileGeneralSetting')
    }
    const showActivity=()=>{
        navigation.navigate('ProfileActivity')
    }
    const chooseFile1 = (type) => {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        setCoverfilepath(image.path);
        console.log(image.path);
      })
      
      };
      const chooseFile = (type) => {
        ImagePicker.openPicker({
          width: 300,
          height: 400,
          cropping: true
        }).then(image => {
          setFilePath(image.path);
          console.log(image.path);
        })
      
      };
      const backarrow=()=>{
        navigation.navigate('Bottom')
      }
    return(
    <View>
      <ScrollView>
     
       <View>
       <View style={{flexDirection:'row',width:wp('100%'),justifyContent:'space-evenly',backgroundColor:'#a19495'}}>
                    <TouchableOpacity onPress={()=>backarrow()}>
                  <MaterialCommunityIcons name="keyboard-backspace" size={35} color={'white'}
                   />
                   </TouchableOpacity>
            <Text style={{fontSize:22,fontWeight:'bold'}}>Profile Cover Screen</Text>
            </View>
           {coverFilepath?
           <Image source={{uri:coverFilepath}} style={{width:wp('100%'),height:hp('20%')}} ></Image>:
           <Image source={require('../../../images/d-cover.jpg')} style={{width:wp('100%'),height:hp('20%')}}  ></Image>}
       </View>
      
     
       <View style={{alignSelf:'flex-end',backgroundColor:'gray',padding:8,marginRight:wp('5%'),width:wp('20%'),borderRadius:10,marginTop:hp('-10%')}}>
           <TouchableOpacity onPress={() => chooseFile1('photo')}>
               <Text style={{color:'white',alignSelf:'center'}}>Cover</Text>
               </TouchableOpacity>
           </View>

       <View style={{marginLeft:wp('4%'),flexDirection:'row',width:wp('35%'),alignItems:'center',borderColor:'white',borderWidth:5,borderRadius:50}}>
           {filePath ?
           <Image source={{uri:filePath}} style={{height:100,width:100,borderRadius:50}}></Image>:
           <Image source={require('../../../images/splashlogo.png')} style={{height:100,width:100}}></Image>}
         <TouchableOpacity onPress={() => chooseFile('photo')}>
                    <MaterialCommunityIcons name="camera" size={25} color={'green'} style={{marginTop:hp('8%')}}/>
                    </TouchableOpacity>
                  

       </View>
       <View style={{margin:wp('4%')}}>
       <View>
           <Text style={{fontSize:20,fontWeight:'bold'}}>{userName}</Text>
       </View>
       <View>
           <Text style={{fontSize:15,fontWeight:'bold'}}>{email}</Text>

       </View>
       </View>
       <View style={{margin:wp('5%'),flexDirection:'row',width:wp('70%'),justifyContent:'space-evenly'}}>
           <TouchableOpacity onPress={()=>openGenralSettingPage()}>
           <View style={{padding:10,backgroundColor:'gray',width:wp('30%'),borderRadius:10}}>
           <Text style={{alignSelf:'center',color:'white'}}>Edit</Text>
           </View>
           </TouchableOpacity>
           <TouchableOpacity onPress={()=>showActivity()}>
           <View style={{padding:10,backgroundColor:'gray',width:wp('30%'),borderRadius:10}}>
           <Text style={{alignSelf:'center',color:'white'}}>Activity</Text>
           </View>
           </TouchableOpacity>
       </View>
       <View style={{height:hp('50%')}}>
        
       <TabViewExample/>
       </View>
       </ScrollView>
     
    </View>
    )

}
export default ProfileCover;