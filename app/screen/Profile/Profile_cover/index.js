import React from 'react';
import { useState, useEffect } from 'react';
import { Image, ScrollView, Text, View, StyleSheet,ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../utility/index';
import * as Utility from '../../../utility/index';
import TabViewExample from './tab';
import * as api from '../../../api/url';
import DocumentPicker from 'react-native-document-picker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
var RNFS = require('react-native-fs');

const ProfileCover = ({ route, navigation }) => {
  const { userId } = route.params.user_id;
  console.log("vikas khan ",userId)

  const [userName, setUserName] = useState();
  const [email, setEMail] = useState();
  const [filePath, setFilePath] = useState();
  const [coverFilepath, setCoverfilepath] = useState();
  const [userpost, setUserpost] = useState([]);
  const [loader,setLoader]=useState(false)
  useEffect(() => {
    retrieveProfile();
    retrieveCover();
  }, []);
  const retrieveProfile = async () => {
    // var userId = await Utility.getFromLocalStorge("userId");
    // userId = userId;
    var token = await Utility.getFromLocalStorge("JWT");
    token = token;
    console.log("token=" + token)
    try {
      setLoader(true);
      let response = await fetch(
        `http://79.133.41.198:81/users/${userId}/getProfileData`, // getCoverPic
        {
          method: "GET",
          headers: {
            Authorization: 'Bearer ' + token,
          }
        }
      )
      let json = await response.json();
      console.log("new profile data", json)
      setFilePath(json.user_profile.profile_photo_url);
      setUserName(json.user_info.fullname)
      setEMail(json.user_info.email)
      setCoverfilepath(json.user_profile.cover_pic_upload_url)
      setLoader(false);

    } catch (error) {
      console.error(error);
    }
  }
  const retrieveCover = async () => {
    // var userId = await Utility.getFromLocalStorge("userId");
    var token = await Utility.getFromLocalStorge("JWT");
    try {
      let response = await fetch(
        `http://79.133.41.198:81/users/${userId}/getallpost`, // getCoverPic
        {
          method: "GET",
          headers: {
            Authorization: 'Bearer ' + token,
          }
        }
      )
      let json = await response.json();
      console.log("ppost data", json);
      setUserpost(json);
      // setCoverfilepath(json);

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

  const Imageupload = async (photo) => {
    console.log("vikkkkkassss");
    const data = new FormData();

    data.append("coverImage", {
      name: photo.name,
      type: "image/jpeg",
      uri: photo.uri
    });
    var userId = await Utility.getFromLocalStorge("userId");
    var token = await Utility.getFromLocalStorge("JWT");

    console.log("token=" + token)
    try {
      let response = await fetch(
        `http://79.133.41.198:81/users/${userId}/uploadCoverPic`, // getCoverPic
        {
          method: "POST",
          headers: {
            Authorization: 'Bearer ' + token,

          },
          body: data
        }
      )
      let json = await response;
      console.log(json);
      if (json.status == 200) {
        alert("Cover Image successfully uploaded")
      }
      else {
        alert("Something Wrong happen ")
      }

    } catch (error) {
      console.log(error);
    }
  }

  const launchImageLibrarys = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res
      );
      setCoverfilepath(res.uri);
      Imageupload(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  const chooseFile = async (type) => {

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res
      );
      setFilePath(res.uri);
      Imageuploadfile(res)
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }


  }

  const Imageuploadfile = async (photo) => {
    console.log("vikkkkkassss");
    const data = new FormData();

    data.append("profileImage", {
      name: photo.name,
      type: "image/jpeg",
      uri: photo.uri
    });
    console.log("api structire data is ", data);
    // return data;
    var userId = await Utility.getFromLocalStorge("userId");
    // userId=userId;
    var token = await Utility.getFromLocalStorge("JWT");

    console.log("token=" + token)
    try {
      let response = await fetch(
        `http://79.133.41.198:81/users/${userId}/uploadProfilePic`, // getCoverPic
        {
          method: "POST",
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: data
        }
      )
      let json = await response;
      console.log(json);
      if (json.status == 200) {
        alert("Profile successfully uploaded");
      }
      else {
        alert("Something wrong happen");
      }

    } catch (error) {
      console.log(error);
    }
  }

  const backarrow = () => {
    navigation.navigate('drawer')
  }
  return (
    <View style={{flex:1}}>
     
      <View style={{ flexDirection: 'row', width: wp('100%'), justifyContent: 'space-evenly', backgroundColor: '#a19495' }}>
        <TouchableOpacity onPress={() => backarrow()}>
          <MaterialCommunityIcons name="keyboard-backspace" size={35} color={'white'}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Profile Cover Screen</Text>
      </View>
      {loader == true ? (
          <ActivityIndicator style={{marginTop: 10}} size="large" color="red" />
        ) : null}
      <ScrollView>
        {coverFilepath ?
          <Image source={{ uri: coverFilepath }} style={{ width: wp('100%'), height: hp('20%') }} onError={() => setCoverfilepath('https://picsum.photos/seed/picsum/200/300')}></Image> : null}
        <View style={{ alignSelf: 'flex-end', backgroundColor: 'gray', padding: 8, marginRight: wp('5%'), width: wp('20%'), borderRadius: 10, marginTop: hp('-10%') }}>
          <TouchableOpacity onPress={() => launchImageLibrarys('photo')}>
            <Text style={{ color: 'white', alignSelf: 'center' }}>Cover</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginLeft: wp('4%'), flexDirection: 'row', width: wp('35%'), alignItems: 'center', borderColor: 'white', borderWidth: 5, borderRadius: 50 }}>
          {filePath ?
            <Image source={{ uri: filePath }} style={{ height: 100, width: 100, borderRadius: 50 }} onError={() => setFilePath('https://picsum.photos/seed/picsum/200/300')}></Image> :
            null}
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
        <View style={{ margin: wp('2%'), flexDirection: 'row', width: wp('70%'), justifyContent: 'space-evenly' }}>
          <TouchableOpacity onPress={() => openGenralSettingPage()}>
            <View style={{ padding: 10, backgroundColor: '#f7f7f2', width: wp('30%'), borderRadius: 10, borderWidth: .5 }}>
              <Text style={{ alignSelf: 'center', color: 'black' }}>Edit</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => showActivity()}>
            <View style={{ padding: 10, backgroundColor: '#f7f7f2', width: wp('30%'), borderRadius: 10, borderWidth: .5 }}>
              <Text style={{ alignSelf: 'center', color: 'black' }}>Activity</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom:hp('10%')}}>
        <View style={styles.gallaryView}>
          <Text>Gallary</Text>
          </View>
          {userpost.length > 0 ?
          userpost.map(()=>(

          
            <View>
              <View style={styles.showImage}>
                <View style={styles.imageCover}>
                  <Image source={{uri:filePath}} style={styles.image}></Image>
                </View>
                <View style={styles.imageCover}>
                  <Image source={{uri:filePath}} style={styles.image}></Image>
                </View>
                <View style={styles.imageCover}>
                  <Image source={{uri:filePath}} style={styles.image}></Image>
                </View>
              </View>
            </View>
            )) : null}
      </View>
      </ScrollView>


    </View>
  )

}

const styles = StyleSheet.create({
  gallaryView: {
    alignItems: 'center',
    margin: '3%',
    borderWidth: .5,
    borderColor: '#b9424d',
    width: wp('95%'),
    padding: 10,
    alignSelf: 'center',
    borderRadius: 10
  },
  showImage:{
    justifyContent:'space-evenly',
    flexDirection:'row'
  },
  image:{
    height:80,
    width:80
  },
  imageCover:{
    borderWidth:.5,
    borderColor:'#b9424d',
    padding:10,
    borderRadius:5
  }
})
export default ProfileCover;