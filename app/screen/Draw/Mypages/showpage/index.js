import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP } from '../../../../utility';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../../utility/index';
import * as Utility from '../../../../utility/index';
import { Alert } from 'react-native';
const showPage = ({ navigation }) => {
  // const [postid,setPostid]=useState();

  const [pagepostfile, setPagepostfile] = useState([]);
  const [coverimage, setCoverImage] = useState();
  const [profileImage, setProfileImage] = useState();
  const [name, setName] = useState();
  const [loader,setLoader]=useState()
  useEffect(() => {
    getpageinfo();
    getPostinfo();
  }, [])
  const getpageinfo = async () => {
    var userId = await Utility.getFromLocalStorge('userId');
    var token = await Utility.getFromLocalStorge('JWT');
    let pageId = await Utility.getFromLocalStorge('getpageid');
    try {
      setLoader(true)
      let response = await fetch(
        `http://79.133.41.198:4000/users/${userId}/getpageid/${pageId}`, // getCoverPic
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let json = await response.json();
      console.log(json);
      setCoverImage(json.page_cover_pic_url)
      setProfileImage(json.page_profile_pic_url)
      setName(json.pagename)
      setLoader(false)
    } catch (error) {
      console.log(error);
    }
  }
  const getPostinfo = async () => {
    var userId = await Utility.getFromLocalStorge('userId');
    var token = await Utility.getFromLocalStorge('JWT');
    let pageId = await Utility.getFromLocalStorge('getpageid');
    try {
      let response = await fetch(
        `http://79.133.41.198:4000/users/${userId}/${pageId}/getallpagepost`, // getCoverPic
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let json = await response.json();
      console.log("particukar page post details", json);
      setPagepostfile(json);
      // setCoverImage(json.page_cover_pic_url)
      // setProfileImage(json.page_profile_pic_url)
      // setName(json.pagename)
    } catch (error) {
      console.log(error);
    }

  }
  const openpagepost = async () => {

    var userId = await Utility.getFromLocalStorge('userId');
    var token = await Utility.getFromLocalStorge('JWT');
    let pageId = await Utility.getFromLocalStorge('pageId');
    try {
      let response = await fetch(
        `http://79.133.41.198:4000/users/${userId}/${pageId}/createpost`, // getCoverPic
        {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + token,
          },
        },
      );
      let json = await response.json();
      console.log(json);
      var postId = json.post_id;
      console.log('new post id', postId);
      await Utility.setInLocalStorge('pagepostId', postId);
      if (postId) {
        navigation.navigate('pagepost');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost=async(item)=>{
    Alert.alert("Delete Page post Successfully")

    // console.log("item data gghjhgjhgjg====?",item);
    // var userId = await Utility.getFromLocalStorge('userId');
    // var token = await Utility.getFromLocalStorge('JWT');
    // let pageId = await Utility.getFromLocalStorge('getpageid');
    

    // try {
    //   let response = await fetch(
    //     `http://79.133.41.198:4000/users/${userId}/${pageId}/deletepost/${item.id}`, // getCoverPic
    //     {
    //       method: 'PUT',
    //       headers: {
    //         Authorization: 'Bearer ' + token,
    //       },
    //     },
    //   );
    //   let json = await response;
    //   console.log(json);
    
    // } catch (error) {
    //   console.log(error);
    // }

  }
  return (
    <View>
      <Text style={{ fontSize: 25, fontWeight: 'bold' }}> {name}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('createPage')}>
        <View style={{ alignSelf: 'flex-end' }}>
          <Image source={require('../../../../images/png/edit-1.png')} style={{ height: 30, width: 30, marginRight: 10 }}></Image>

        </View>
      </TouchableOpacity>
      {loader == true ? (
          <ActivityIndicator style={{marginTop: 10}} size="large" color="red" />
        ) : null}

      <View>
        <View>
          <Image
            source={{ uri: coverimage }}
            style={{
              height: hp('25%'),
              width: wp('90%'),
              alignSelf: 'center',
              margin: wp('5%'),
              borderRadius: 20
            }} onError={() => setCoverImage('https://picsum.photos/seed/picsum/200/300')}></Image>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <View>
          <Image
            source={{ uri: profileImage }}
            style={{ borderRadius: 50, height: 50, width: 50 }} onError={() => setProfileImage('https://picsum.photos/seed/picsum/200/300')}></Image>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{name}</Text>
          <Text>Create page @ {name}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={() => openpagepost()}>
        <View
          style={{
            padding: 10,
            backgroundColor: 'blue',
            margin: wp('4%'),
            alignSelf: 'center',
            borderRadius: 10
          }}>
          <Text style={{ color: 'white', alignSelf: 'center' }}>Create Post</Text>
        </View>
      </TouchableOpacity>
      <View style={{ height: hp('50%') }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center' }}> Show Page Post</Text>
        <ScrollView>

          <View style={{ marginBottom: hp('5%') }}>

            {pagepostfile.length > 0 ? pagepostfile.map((item, index) => (
                <TouchableOpacity onPress={()=>deletePost(item)}>
              <View key={index} style={{ padding: 5, margin: wp('5%'), backgroundColor: 'white', borderRadius: 10, elevation: 10, opacity: 10, padding: 10, marginBottom: hp('10%') }}>
                <Image source={{ uri: item.post_upload_url }} style={{ height: 100, width: 100, alignSelf: 'center' }}>

                </Image>
                <Text style={{ alignSelf: 'center', fontSize: 15, fontWeight: '900' }}> Post Upload by Kush </Text>
              </View>
              </TouchableOpacity>
            )) : null}

          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default showPage;
