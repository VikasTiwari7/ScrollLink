import React,{useState,useEffect} from 'react';

import { View,Text ,TextInput, Alert,Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';

import ImagePicker from 'react-native-image-crop-picker';
  import * as Utility from '../../../utility/index';
import * as api from '../../../api/url';

const publishPost=({navigation})=>{
    const [Status,setStatus]=useState();
    const [filePath, setFilePath] = useState();
    const [imageName,setImageName]=useState();
    const backHome=()=>{
        navigation.navigate('drawer');
    }
    useEffect(() => {
      // retriveData();
        const timeoutHandle = setTimeout(() => {
          if(!filePath){
            chooseFile('photo');
          }

        }, 1000);
      });
    const retriveData= async()=>{
     
    }
      const chooseFile = (type) => {
     
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        setFilePath(image.path)
        console.log(image.path);
      })
    }
      const publishPost= async()=>{
        let userId = await Utility.getFromLocalStorge("userId");
        let  token=await Utility.getFromLocalStorge("JWT");
        let name =await Utility .getFromLocalStorge("fullName");
         console.log(userId);
         console.log("token=" +token)
        // Alert.alert("its working");
        console.log(userId);
        if(Utility.isFieldEmpty(filePath)){
        Alert.alert("Please Choose any post ")
        }
        else{
        let response = await fetch(
          `http://192.168.43.39:4000/users/${userId}/createpost`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer '+token
            },
            body: JSON.stringify({
              user_id:userId,
              username:name,
              post_type:"image",
              file_name:"abc4.png",
              post_upload_url:"C:\\Users\\RD\\AppData\\Local\\Temp",
              caption:Status,
              tag_people:"abc",
              location:"delhi"
            }),
          },
        );
        // console.log(response.status)
        if(response.status==200){
          Alert.alert("Success Fully Uploaded ");
          navigation.navigate('drawer');
        }
        else{
          Alert.alert("failed");
        }
        

      }
    }
    return(
        <View>
            <ScrollView>
                <View style={{flexDirection:'row',justifyContent:'space-between',margin:wp('5%')}}>
                    <TouchableOpacity onPress={()=>backHome()}>
                    <View>
                    <MaterialCommunityIcons name="bolnisi-cross" size={25} color={'#b9424d'} />
                    </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>publishPost()}>
                    <View style={{backgroundColor:'#b9424d',padding:10,borderRadius:5}}>
                        <Text style={{color:'white',}}>Publish</Text>
                    </View>
                    </TouchableOpacity>

                </View>
                <View style={{margin:wp('5%')}}>
                <TextInput
            style={ {
                width:wp('90%'),
                borderBottomColor:'#b9424d',
                borderBottomWidth:1,
            }}
            value={Status}
            placeholder="What's happening ?"
            onChangeText={text=>setStatus(text)}
            multiline={true}
            underlineColorAndroid='transparent'
    />
                </View>
                <View style={{height:hp('60%'),backgroundColor:'white',borderRadius:10,padding:10,margin:wp('5%')}}>
                  <View>
                  <Image source={{uri:filePath}} style={{height:100,width:100,borderRadius:10}}></Image>
                  
                  </View>
                </View>

                <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                    <View>
                    <MaterialCommunityIcons name="disc" size={35} color={'pink'} />
                    </View>
                    <View>
                    <MaterialCommunityIcons name="earth" size={25} color={'#b9424d'} />
                    </View>
                    <View>
                    <MaterialCommunityIcons name="emoticon-happy" size={25} color={'#b9424d'} />
                    </View>
                    <View>
                    <MaterialCommunityIcons name="emoticon-happy" size={25} color={'#b9424d'} />
                    </View>
                    <View>
                    <MaterialCommunityIcons name="emoticon-happy" size={25} color={'#b9424d'} />
                        </View>
                </View>
                
            </ScrollView>
        </View>
    )
}
export default publishPost;
