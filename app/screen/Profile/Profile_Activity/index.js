import React from 'react';
import { useState,useEffect } from 'react';
import { Image, ScrollView, Text,View ,ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
  import * as api from '../../../api/url';
  import * as Utility from '../../../utility/index';

  import TabViewExample from './tab';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ProfileActivity=({navigation})=>{
    const [userName,setUserName]=useState();
    const [email,setEMail]=useState();
    const [filePath, setFilePath] = useState();
    const [coverFilepath,setCoverfilepath] =useState();
    const [loader,setLoader]=useState(false)


    useEffect(() => {
 
      retrieveProfile();
      retrieveCover();

  
  },[]);
  const retrieveProfile = async () => {
    setLoader(true)
    var userId = await Utility.getFromLocalStorge("userId");
    var username=await Utility.getFromLocalStorge("fullName");
    setUserName(username);
    var email=await Utility.getFromLocalStorge("email");
    setEMail(email);

    var token=await Utility.getFromLocalStorge("JWT");
    // console.log(userId);
    console.log("token=" +token)
    try {
        let response = await fetch(
          // 192.168.0.101:4000/users/60cb6255633ed91264de3cc3/getProfilePicUrl
          `http://79.133.41.198:81/users/${userId}/getProfilePicUrl`, // getCoverPic
          {
            method: "GET",
           headers: { 
            Authorization: 'Bearer '+token,
            // 'Accept': 'application/json',
            // 'Content-Type':'application/json'
          } 
    }
    )
        let json = await response.text();
        let abc=json;
        
        setFilePath(abc);
        setLoader(false)
      //   await Utility.setInLocalStorge('songs', json.item)
    
      } catch (error) {
        console.error(error);
      }
  };

  const retrieveCover=async()=>{
    var userId = await Utility.getFromLocalStorge("userId");
    var token=await Utility.getFromLocalStorge("JWT");
    try {
      let response = await fetch(
        // 192.168.0.101:4000/users/60cb6255633ed91264de3cc3/getProfilePicUrl
        `http://79.133.41.198:81/users/${userId}/getCoverPicUrl`, // getCoverPic
        {
          method: "GET",
         headers: { 
          Authorization: 'Bearer '+token,
        
        } 
  }
  )
  // var imageStr = this.arrayBufferToBase64(data.img.data.data);
      let json = await response.text();
      // console.log(json);
      let abc=json;
     
      setCoverfilepath(abc);
     
     

    //   await Utility.setInLocalStorge('songs', json.item)
  
    } catch (error) {
      console.error(error);
    }

  }
    const openGenralSettingPage=()=>{
        navigation.navigate('ProfileGeneralSetting')
    }
    const showActivity=()=>{
        navigation.navigate('ProfileActivity')
    }

   
      const backarrow=()=>{
        navigation.navigate('Profile_cover')
      }
    return(
    <View>
       <View style={{flexDirection:'row',width:wp('100%'),justifyContent:'space-evenly',backgroundColor:'#a19495'}}>
                    <TouchableOpacity onPress={()=>backarrow()}>
                  <MaterialCommunityIcons name="keyboard-backspace" size={35} color={'white'}
                   />
                   </TouchableOpacity>
            <Text style={{fontSize:22,fontWeight:'bold'}}>Profile Activity Screen</Text>
            </View>
            <ScrollView>
            {loader == true ? (
          <ActivityIndicator style={{marginTop: 10}} size="large" color="red" />
        ) : null}
           {coverFilepath?
           <Image source={{uri:coverFilepath}} style={{width:wp('100%'),height:hp('20%')}}  onError={()=>setCoverfilepath('https://picsum.photos/seed/picsum/200/300')}></Image>:null}
     
      
     
       <View style={{alignSelf:'flex-end',backgroundColor:'gray',padding:8,marginRight:wp('5%'),width:wp('20%'),borderRadius:10,marginTop:hp('-10%')}}>
          
           </View>

       <View style={{marginLeft:wp('4%'),flexDirection:'row',width:wp('35%'),alignItems:'center',borderColor:'white',borderWidth:5,borderRadius:50}}>
           {filePath ?
           <Image source={{uri:filePath}} style={{height:100,width:100,borderRadius:50}} onError={()=>setFilePath('https://picsum.photos/seed/picsum/200/300')}></Image >:null}
         
                  

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
export default ProfileActivity;