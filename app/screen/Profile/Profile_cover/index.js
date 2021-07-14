import React from 'react';
import { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../utility/index';
import * as Utility from '../../../utility/index';
import ImagePicker from 'react-native-image-crop-picker';
import TabViewExample from './tab';
import * as api from '../../../api/url';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
var RNFS = require('react-native-fs');

const ProfileCover = ({ navigation }) => {
  const [userName, setUserName] = useState();
  const [email, setEMail] = useState();
  const [filePath, setFilePath] = useState();
  const [coverFilepath, setCoverfilepath] = useState();
  const [coverurl, setCoverUrl] = useState();
  const [profileurl, setProfileUrl] = useState();

  useEffect(() => {
    retrieveProfile();
    retrieveCover();
  }, []);
  const retrieveProfile = async () => {
    var userId = await Utility.getFromLocalStorge("userId");
    userId=userId;
    var token = await Utility.getFromLocalStorge("JWT");
    token=token;
    var username = await Utility.getFromLocalStorge("fullName");
    setUserName(username);
    var email = await Utility.getFromLocalStorge("email");
    setEMail(email);
    console.log("token=" + token)
    try {
      let response = await fetch(
        `http://79.133.41.198:4000/users/${userId}/getProfilePicUrl`, // getCoverPic
        {
          method: "GET",
          headers: {
            Authorization: 'Bearer ' + token,
          }
        }
      )
      let json = await response.text();
      let abc = json;

      let def = api.BaseUrl + abc;
      setFilePath(def);
    } catch (error) {
      console.error(error);
    }
  }
  const retrieveCover = async () => {
    var userId = await Utility.getFromLocalStorge("userId");
    var token = await Utility.getFromLocalStorge("JWT");
    try {
      let response = await fetch(
        `http://79.133.41.198:4000/users/${userId}/getCoverPicUrl`, // getCoverPic
        {
          method: "GET",
          headers: {
            Authorization: 'Bearer ' + token,
          }
        }
      )
      let json = await response.text();
      let abc = json;

      let def = api.BaseUrl + abc;
      setCoverfilepath(def);



      //   await Utility.setInLocalStorge('songs', json.item)

    } catch (error) {
      console.error(error);
    }

  }

  const openGenralSettingPage = () => {
    navigation.navigate('ProfileGeneralSetting')
  }
  const showActivity = () => {
    navigation.navigate('ProfileActivity')
  }
 
  const Imageupload= async(photo)=>{
    console.log("vikkkkkassss");
    const data = new FormData();

    data.append("coverImage", {
      name: photo.fileName,
      type: "image/jpeg",
      uri:coverFilepath
    });
    var userId = await Utility.getFromLocalStorge("userId");
    var token = await Utility.getFromLocalStorge("JWT");
   
    console.log("token=" + token)
    try { 
      let response = await fetch(
        `http://79.133.41.198:4000/users/${userId}/uploadCoverPic`, // getCoverPic
        {
          method: "POST",
          headers: {
            Authorization: 'Bearer ' + token,
      
          },
          body:data
        }
      )
      let json = await response;
      console.log(json);

      }catch(error){
        console.log(error);
      }
    }

    const launchImageLibrarys = () => {
      let options = {
          storageOptions: {
              skipBackup: true,
              path: 'images',
          },
      };
      launchImageLibrary(options,async (response) => {
          console.log('Response = ', response);

          if (response.didCancel) {
              console.log('User cancelled image picker');
          } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
          } else {
            await  console.log("check response uri", response)
              setCoverfilepath(response.uri)
              // setSelectedImage(response.uri)
              // setIsVisible(false)
              Imageupload(response)
          }
      });

  }

  const chooseFile = async(type) => {
  
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
      setFilePath(response.uri);
      Imageuploadfile(response)
    });


  }

  const Imageuploadfile= async(photo)=>{
    console.log("vikkkkkassss");
    const data = new FormData();

    data.append("profileImage", {
      name: photo.fileName,
      type: "image/jpeg",
      uri:coverFilepath
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
        `http://79.133.41.198:4000/users/${userId}/uploadProfilePic`, // getCoverPic
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

      }catch(error){
        console.log(error);
      }
    }

  const backarrow = () => {
    navigation.navigate('Bottom')
  }
  return (
    <View>
      <ScrollView>

        <View>
          <View style={{ flexDirection: 'row', width: wp('100%'), justifyContent: 'space-evenly', backgroundColor: '#a19495' }}>
            <TouchableOpacity onPress={() => backarrow()}>
              <MaterialCommunityIcons name="keyboard-backspace" size={35} color={'white'}
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Profile Cover Screen</Text>
          </View>
          {coverFilepath ?
            <Image source={{ uri: coverFilepath }} style={{ width: wp('100%'), height: hp('20%') }} ></Image> :
            <Image source={require('../../../images/d-cover.jpg')} style={{ width: wp('100%'), height: hp('20%') }}  ></Image>}
        </View>


        <View style={{ alignSelf: 'flex-end', backgroundColor: 'gray', padding: 8, marginRight: wp('5%'), width: wp('20%'), borderRadius: 10, marginTop: hp('-10%') }}>
          <TouchableOpacity onPress={() => launchImageLibrarys('')}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Cover</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginLeft: wp('4%'), flexDirection: 'row', width: wp('35%'), alignItems: 'center', borderColor: 'white', borderWidth: 5, borderRadius: 50 }}>
          {filePath ?
            <Image source={{ uri: filePath }} style={{ height: 100, width: 100, borderRadius: 50 }}></Image> :
            <Image source={require('../../../images/splashlogo.png')} style={{ height: 100, width: 100 }}></Image>}
          <TouchableOpacity onPress={() => chooseFile('photo')}>
            <MaterialCommunityIcons name="camera" size={25} color={'green'} style={{ marginTop: hp('8%') }} />
          </TouchableOpacity>


        </View>
        <View style={{ margin: wp('4%') }}>
          <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userName}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{email}</Text>

          </View>
        </View>
        <View style={{ margin: wp('5%'), flexDirection: 'row', width: wp('70%'), justifyContent: 'space-evenly' }}>
          <TouchableOpacity onPress={() => openGenralSettingPage()}>
            <View style={{ padding: 10, backgroundColor: 'gray', width: wp('30%'), borderRadius: 10 }}>
              <Text style={{ alignSelf: 'center', color: 'white' }}>Edit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showActivity()}>
            <View style={{ padding: 10, backgroundColor: 'gray', width: wp('30%'), borderRadius: 10 }}>
              <Text style={{ alignSelf: 'center', color: 'white' }}>Activity</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: hp('50%') }}>

          <TabViewExample />
        </View>
      </ScrollView>

    </View>
  )

}
export default ProfileCover;