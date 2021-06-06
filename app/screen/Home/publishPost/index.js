import React,{useState,useEffect} from 'react';

import { View,Text ,TextInput, Alert} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
import {
    launchCamera,
    launchImageLibrary
  } from 'react-native-image-picker';
  import * as Utility from '../../../utility/index';
  // import RNImageFilter from "react-native-image-filter";

// import { TextInput} from 'react-native-paper';
// const userId =0;
// const token=0;
const publishPost=({navigation})=>{
    const [Status,setStatus]=useState();
    const [filePath, setFilePath] = useState();
    const [imageName,setImageName]=useState();
    const backHome=()=>{
        navigation.navigate('Bottom');
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
        let options = {
          mediaType: type,
          maxWidth: 300,
          maxHeight: 550,
          quality: 1,
        };
        launchImageLibrary(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setFilePath(response);
          setImageName(response.fileName);

        });
      };
      // RNImageFilter.getSourceImage(
      //   {
      //     imageSource: {imageName},
      //     dataType: "Path",
      //     filterType: 1,
      //   },
      //   (source) => {
      //     setNewImage((source.base64));
      //     console.log("SOURCE", source);
      //     // source returns the height, width and the Base64 string of the image.
      //   }
      // );
      const publishPost= async()=>{
        let userId = await Utility.getFromLocalStorge("userId");
        let  token=await Utility.getFromLocalStorge("JWT");
         console.log(userId);
         console.log("token=" +token)
        Alert.alert("its working");
        console.log(userId);
        let response = await fetch(
          `https://f1c963a86254.ngrok.io/users/${userId}/createpost`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Authorization: 'Bearer '+token
            },
            body: JSON.stringify({
              user_id:"60b51caebcd8083b2474ac0a",
              username:"vikas123",
              post_type:"image",
              file_name:"abc4.png",
              post_upload_url:"/temp",
              caption:"Something better",
              tag_people:"abc",
              location:"delhi"
            }),
          },
        );
        console.log(response.json())

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

                <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:hp('62%')}}>
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

// import React, { useState } from 'react';
// import { Text,View } from 'react-native';
// import RNImageFilter from "react-native-image-filter";
// const publishPost=()=>{
//   const [newImage,setNewImage]=useState();

//   RNImageFilter.getSourceImage(
//     {
//       imageSource: "C:\\Users\\RD\\Desktop\\scroll_link\\app\\images\\d-cover.jpg",
//       dataType: "Path",
//       filterType: 1,
//     },
//     (source) => {
//       setNewImage((source.base64));
//       console.log("SOURCE", source);
//       // source returns the height, width and the Base64 string of the image.
//     }
//   );
//   return(
//     <View>
//       <Text>Image</Text>
//       </View>
//   )
// }
// export default publishPost;