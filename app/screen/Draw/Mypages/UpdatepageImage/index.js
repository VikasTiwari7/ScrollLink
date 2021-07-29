import React,{useState} from 'react';
import { View ,Text, TouchableOpacity,Image} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../../utility/index';
import DocumentPicker from 'react-native-document-picker';
// import { useState } from 'react/cjs/react.development';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Utility from '../../../../utility/index';
const UpdatepageImage=({navigation})=>{
  const [filePath,setFilePath]=useState();
  const [coverFilepath,setCoverFilepath]=useState();
    const chooseFile=async(photo)=>{
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            });
            console.log(res
            );
            setFilePath(res.uri);
            Imageupload(res)
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }
    const chooseFile1=async()=>{
        try {
            const res = await DocumentPicker.pick({
              type: [DocumentPicker.types.images],
            });
            console.log(res
            );
            setCoverFilepath(res.uri) 
            uploadcoverImage(res)
          } catch (err) {
            if (DocumentPicker.isCancel(err)) {
              // User cancelled the picker, exit any dialogs or menus and move on
            } else {
              throw err;
            }
          }
    }
    const openpageInfo=()=>{
      if(filePath && coverFilepath){
      navigation.navigate('createPage');
      }
    } 
    const uploadcoverImage=async(photo)=>{
      console.log("vikkkkkassss");
      const data = new FormData();
  
      data.append("pageCoverImg", {
        name: photo.name,
        type: "image/jpeg",
        uri:photo.uri
      });
      var userId = await Utility.getFromLocalStorge("userId");
      var token = await Utility.getFromLocalStorge("JWT");
      let pageId=await Utility.getFromLocalStorge('pageId');
     
      console.log("token= in page " + token)
      try {
        console.log(`http://79.133.41.198:4000/users/${userId}/pageid/${pageId}/updatePageCoverPic`,);
        console.log(data); 
        let response = await fetch(
          `http://79.133.41.198:4000/users/${userId}/pageid/${pageId}/updatePageCoverPic`, // getCoverPic
          {
            method: "POST",
            headers: {
              Authorization: 'Bearer ' + token,
            },
            body:data
          }
        )
        let json = await response;
        console.log("resone after page cover uploaded,,,",json);
  
        }catch(error){
          console.log("nhi howa ")
          console.log(error);
        }
    }
    const Imageupload= async(photo)=>{
      console.log("vikkkkkassss");
      const data = new FormData();
  
      data.append("pageProfileImg", {
        name: photo.name,
        type: "image/jpeg",
        uri:photo.uri
      });
      var userId = await Utility.getFromLocalStorge("userId");
      var token = await Utility.getFromLocalStorge("JWT");
      let pageId=await Utility.getFromLocalStorge('pageId');
     
      console.log("token= in page " + token)
      try {
        console.log(`http://79.133.41.198:4000/users/${userId}/pageid/${pageId}/updatePageProfilePic`,);
        console.log(data); 
        let response = await fetch(
          `http://79.133.41.198:4000/users/${userId}/pageid/${pageId}/updatePageProfilePic`, // getCoverPic
          {
            method: "POST",
            headers: {
              Authorization: 'Bearer ' + token,
            },
            body:data
          }
        )
        let json = await response;
        console.log("resone after page profile uploaded,,,",json);
  
        }catch(error){
          console.log("nhi howa ")
          console.log(error);
        }
      }
    return(
        <View>
            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',margin:wp('5%')}}>Add Media  to this Page</Text>
            <View>
                <Text style={{margin:wp('3%')}}>Use images that represent what this page is about, such as logo. These will appear in search results.</Text>
            </View>

            <View style={{margin:wp('5%')}}>
              {coverFilepath?
              <Image source={{uri:coverFilepath}} style={{height:hp('25%'),width:wp('95%'),alignSelf:'center'}}></Image>:
              <Image source={require('../../../../images/splashlogo.png')} resizeMode='contain' style={{height:hp('25%'),width:wp('95%'),alignSelf:'center'}}></Image>}
            <View style={{alignSelf:'flex-end',backgroundColor:'gray',padding:8,marginRight:wp('5%'),width:wp('20%'),borderRadius:10}}>
           <TouchableOpacity onPress={() => chooseFile1('photo')}>
               <Text style={{color:'white',alignSelf:'center'}}>Cover</Text>
               </TouchableOpacity>
           </View>

       <View style={{flexDirection:'row',width:wp('30%'),alignSelf:'center',borderColor:'white',borderWidth:5,borderRadius:50}}>
           {filePath ?
           <Image source={{uri:filePath}} style={{height:100,width:100,borderRadius:50,alignSelf:'center'}}></Image>:
           <Image source={require('../../../../images/splashlogo.png')} style={{height:100,width:100}}></Image>}
         <TouchableOpacity onPress={() => chooseFile('photo')}>
                    <MaterialCommunityIcons name="camera" size={25} color={'green'} style={{marginTop:hp('8%')}}/>
                    </TouchableOpacity>
       </View>

            </View>
            <TouchableOpacity onPress={()=>openpageInfo()}>
            <View style={{margin:wp('5%'),backgroundColor:'blue',padding:10,alignSelf:'center',width:wp('25%'),borderRadius:10}}>
                <Text style={{color:'white',fontSize:18,fontWeight:'bold',alignSelf:'center'}}>Done</Text>
            </View>
            </TouchableOpacity>
        </View>

    )
}
export default UpdatepageImage;