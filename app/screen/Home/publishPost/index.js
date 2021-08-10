import React, {useState, useEffect} from 'react';
import DocumentPicker from 'react-native-document-picker';
import {View, Text, TextInput, Alert, Image} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../utility/index';

// import ImagePicker from 'react-native-image-crop-picker';
import * as Utility from '../../../utility/index';
import * as api from '../../../api/url';
var postId;

const publishPost = ({navigation}) => {
  const [Status, setStatus] = useState();
  const [filePath, setFilePath] = useState();
  // const [imageName,setImageName]=useState();
  const backHome = () => {
    navigation.navigate('drawer');
  };
  useEffect(() => {
    if (!postId) {
      retriveData();
    }
    const timeoutHandle = setTimeout(() => {
      if (!filePath) {
        chooseFile('photo');
      }
    }, 1000);
  });
  const retriveData = async () => {
    var userId = await Utility.getFromLocalStorge('userId');
    var token = await Utility.getFromLocalStorge('JWT');
    try {
      let response = await fetch(
        `http://79.133.41.198:4000/users/${userId}/createpost`, // getCoverPic
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let json = await response.json();
      console.log(json);
      postId = json.post_id;
      console.log('new post id', postId);
      await Utility.setInLocalStorge('postId', postId);
      // let abc = json;
    } catch (error) {
      console.log(error);
    }
  };
  const chooseFile = async type => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(res);
      setFilePath(res.uri);
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
    // navigation.navigate('Newpost');
    console.log('vikkkkkassss');
    const data = new FormData();

    data.append('postData', {
      name: photo.name,
      type: 'image/jpeg',
      uri: photo.uri,
    });
    let userId = await Utility.getFromLocalStorge('userId');
    let token = await Utility.getFromLocalStorge('JWT');
    let name = await Utility.getFromLocalStorge('fullName');
    console.log(userId);
    //  console.log("token=" +token)
    // Alert.alert("its working");
    console.log(userId);
    if (Utility.isFieldEmpty(filePath)) {
      Alert.alert('Please Choose any post ');
    } else {
      console.log(
        `http://79.133.41.198:4000/users/${userId}/updatepost/${postId}/updatePostMedia`,
      );
      console.log('fprm data result', data);

      try {
        let response = await fetch(
          // http://79.133.41.198:4000/users/60d97dd575d2e590a94188a5/createpost
          `http://79.133.41.198:4000/users/${userId}/updatepost/${postId}/updatePostMedia`,
          {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + token,
            },
            body: data,
          },
        );
        let json = await response.text();
        console.log(json);
        // const json=response.json();
        // console.log("Post id is ",json)
        if (json.status == 200) {
          navigation.navigate('Newpost');
          // Alert.alert("Success Fully Uploaded ");
        } else {
          Alert.alert('failed');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            margin: wp('5%'),
          }}>
          <TouchableOpacity onPress={() => backHome()}>
            <View>
              <MaterialCommunityIcons
                name="bolnisi-cross"
                size={25}
                color={'#b9424d'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Imageupload('photo')}>
            <View
              style={{
                backgroundColor: '#b9424d',
                padding: 10,
                borderRadius: 5,
              }}>
              <Text style={{color: 'white'}}>Publish</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{margin: wp('5%')}}>
          <TextInput
            style={{
              width: wp('90%'),
              borderBottomColor: '#b9424d',
              borderBottomWidth: 1,
            }}
            value={Status}
            placeholder="What's happening ?"
            onChangeText={text => setStatus(text)}
            multiline={true}
            underlineColorAndroid="transparent"
          />
        </View>
        <View
          style={{
            height: hp('60%'),
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            margin: wp('5%'),
          }}>
          <View>
            <Image
              source={{uri: filePath}}
              style={{height: 100, width: 100, borderRadius: 10}}></Image>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View>
            <MaterialCommunityIcons name="disc" size={35} color={'pink'} />
          </View>
          <View>
            <MaterialCommunityIcons name="earth" size={25} color={'#b9424d'} />
          </View>
          <View>
            <MaterialCommunityIcons
              name="emoticon-happy"
              size={25}
              color={'#b9424d'}
            />
          </View>
          <View>
            <MaterialCommunityIcons
              name="emoticon-happy"
              size={25}
              color={'#b9424d'}
            />
          </View>
          <View>
            <MaterialCommunityIcons
              name="emoticon-happy"
              size={25}
              color={'#b9424d'}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default publishPost;
