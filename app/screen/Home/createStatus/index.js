import React,{useEffect, useState} from 'react';
import {View,Text, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
import * as Utility from '../../../utility/index';
import { TextInput} from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import {
//     launchCamera,
//     launchImageLibrary
//   } from 'react-native-image-picker'
  import DocumentPicker from 'react-native-document-picker';
const CreateStatus=({navigation})=>{
    const [Status,setStatus]=useState();
    const [filePath, setFilePath] = useState();

    // useEffect(()=>{
    //   getLocaldata()

    // },[])

    const Imageupload= async(photo)=>{
      console.log("vikkkkkassss");
      const data = new FormData();
  
      data.append("statusData", {
        name: photo.name,
        type: "image/jpeg",
        uri:photo.uri
      });
      console.log("api structire data is ",data);
      // return data;
      var userId = await Utility.getFromLocalStorge("userId");
      // userId=userId;
      var token = await Utility.getFromLocalStorge("JWT");
     
      console.log("token=" + token)
      try { 
        let response = await fetch(
          // 192.168.0.101:4000/users/60cb6255633ed91264de3cc3/getProfilePicUrl
          `http://79.133.41.198:4000/users/${userId}/createstatus`, // getCoverPic
          {
            method: "POST",
            headers: {
              Authorization: 'Bearer ' + token,
              // 'Accept': 'application/json',
              // 'Content-Type':'application/json'
            },
            body:data
          }
        )
        // var imageStr = this.arrayBufferToBase64(data.img.data.data);
        let json = await response;
        console.log(json);
        if(json.status==200){
          Alert.alert("Status Update");
        navigation.navigate('drawer');

        }
        else{
          Alert.alert("Something wrong happen!")
        }
  
        }catch(error){
          console.log(error);
        }
      }

    const chooseFile = async(type) => {
      try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res
      );
      setFilePath(res.uri) 
      Imageupload(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
      };
      const onCreate1=()=>{
          if(filePath){
          Alert.alert("Post published")
          }
          else{
              Alert.alert("Please choose the file")
          }
      }
    return(
        <View>
            <ScrollView>
            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',margin:wp('5%')}}>Create  New Status</Text>
            <View style={{margin:wp('5%')}}>
                    <TextInput
                label="What is going on"
                value={Status}
                onChangeText={text => setStatus(text)}
                style={{height:hp('15%')}}
                />
                </View>
                <View style={{margin:wp('4%')}}>
                    <Text>Media File</Text>
                </View>
                <TouchableOpacity onPress={()=>chooseFile('photo')}>
                <View style={{marginLeft:wp('7%'),flexDirection:'row'}}>
                    <View>
                    <MaterialCommunityIcons name="video" size={25} color={'#b9424d'} />
                    </View>
                    <View>
                        <Text style={{marginLeft:wp('2%')}}>Select Photos & Videos </Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onCreate1()}>
                <View style={{backgroundColor:'#b9424d',alignSelf:'center',padding:10,width:wp('25%'),marginTop:hp('5%'),borderRadius:5}}>
                    <Text style={{alignSelf:'center',color:'white'}}>Create</Text>
                </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default CreateStatus;