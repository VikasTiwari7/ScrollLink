import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Utility from '../../../../utility/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../../utility/index';
import DocumentPicker from 'react-native-document-picker';
import { TextInput } from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';

const Pagepost = ({ navigation }) => {
  const [filePath, setFilepath] = useState();
  const [caption, setCaption] = useState();
  const [pagename, setPagename] = useState();
  const [pageurl, setDescription] = useState();
  const [pageProfile, setProfileImage] = useState();
  useEffect(() => {
    getpageinfo()
  }, [])
  const getpageinfo = async () => {
    var userId = await Utility.getFromLocalStorge('userId');
    var token = await Utility.getFromLocalStorge('JWT');
    let pageId = await Utility.getFromLocalStorge('getpageid');
    try {
      let response = await fetch(
        `http://79.133.41.198:81/users/${userId}/getpageid/${pageId}`, // getCoverPic
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let json = await response.json();
      console.log(json);
      // setCoverImage(json.page_cover_pic_url)
      setProfileImage(json.page_profile_pic_url)
      setPagename(json.pagename)
    } catch (error) {
      console.log(error);
    }
  }
  const uploadPost = async () => {
    let userId = await Utility.getFromLocalStorge('userId');
    let token = await Utility.getFromLocalStorge('JWT');
    let name = await Utility.getFromLocalStorge('fullName');
    let pageId = await Utility.getFromLocalStorge('pageId');
    console.log("page post id cccc",pageId);
    let pagepostId = await Utility.getFromLocalStorge('pagepostId');

    console.log(
      `http://79.133.41.198:81/users/${userId}/${pageId}/uppdatepost/${pagepostId}/updatePostInfo`,
    );
    http://localhost:4000/users/60ca30e507b36fd953c418be/60eff4eaf994f420ca513ed5/updatepost/60f54fcde45d50e5f1d2cee0/updatePostInfo
    try {
      let response = await fetch(
        `http://79.133.41.198:81/users/${userId}/${pageId}/updatepost/${pagepostId}/updatePostInfo`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            username: 'Rohan',
            post_type: 'image',
            caption: 'something is better the oo',
            tag_people: 'vikas',
            location: 'delhi',
            description: 'blaah balhha so doing good',
          }),
        },
      );
      let json = await response;
      console.log(json);
      if (json.status == 200) {
        navigation.navigate('showpagedetails');
      }
      else {
        alert("Something wrong")
      }
    } catch (error) {
      console.log(error);
    }
    //
  };
  const chooseFile = async photo => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      setFilepath(res.uri);
      Imageupload(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };
  const Imageupload = async photo => {
    console.log('vikkkkkassss');
    const data = new FormData();

    data.append('postData', {
      name: photo.name,
      type: 'image/jpeg',
      uri: photo.uri,
    });
    var userId = await Utility.getFromLocalStorge('userId');
    var token = await Utility.getFromLocalStorge('JWT');
    let pageId = await Utility.getFromLocalStorge('pageId');
    let pagepostid = await Utility.getFromLocalStorge('pagepostId');


    console.log('token= in page ' + token);
    try {
      console.log(
        `http://79.133.41.198:81/users/${userId}/pageid/${pageId}/updatePostMedia`,
      );
      console.log(data);
      let response = await fetch(
        `http://79.133.41.198:81/users/${userId}/${pageId}/updatepost/${pagepostid}/updatePostMedia`, // getCoverPic
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: data,
        },
      );
      let json = await response;
      console.log('resone after page profile uploaded,,,', json);
    } catch (error) {
      console.log('nhi howa ');
      console.log(error);
    }
  };

  return (
    <View>
      <View style={{backgroundColor:'#b9424d'}}>
      <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center', margin: 10,color:'white' }}>Page post </Text>
      </View>
      <TouchableOpacity onPress={() => chooseFile('photo')}>
          <MaterialCommunityIcons
            name="camera"
            size={25}
            color={'green'}
            style={{ margin: hp('2%'),alignSelf:'flex-end' }}
          />
        </TouchableOpacity>
      <View
       >
        {filePath ? (
          <Image
            source={{ uri: filePath }}
            style={{
              height: 200,
              width: 200,
              alignSelf:'center',
              borderRadius:5
            }} onError={() => setFilepath('https://picsum.photos/seed/picsum/200/300')}></Image>
        ) : null}
       
      </View>

      <View
        style={{
          margin: wp('5%'),
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 10,
        }}>



        <View style={{ margin: wp('5%') }}>
          <TextInput
            label="Caption"
            value={caption}
            onChangeText={text => setCaption(text)}
          />
        </View>

        <View style={{ margin: wp('5%') }}>
          <TextInput
            label="Description"
            value={pageurl}
            onChangeText={text => setDescription(text)}
          />
        </View>

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            margin: wp('5%'),
            backgroundColor: '#b9424d',
            padding: 15,
            borderRadius: 10,
          }}
          onPress={() => uploadPost()}>
          <View>
            <Text style={{ color: 'white', fontSize: 18 }}>Upload Post</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};
export default Pagepost;
