import React, { useEffect, useState,useRef } from 'react';
import { Text, View, Image, TouchableOpacity,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP } from '../../../../utility';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../../utility/index';
import * as Utility from '../../../../utility/index';
import { Alert } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useIsFocused } from "@react-navigation/native";
const showPage = ({ navigation }) => {
  // const [postid,setPostid]=useState();
  const isFocused = useIsFocused();

  const [pagepostfile, setPagepostfile] = useState([]);
  const [coverimage, setCoverImage] = useState();
  const [profileImage, setProfileImage] = useState();
  const [name, setName] = useState();
  const [loader,setLoader]=useState();
  const [countlike,setcountlike]=useState(1);
  useEffect(() => {
    getpageinfo();
    getPostinfo();
  }, [isFocused])
  const getpageinfo = async () => {
    var userId = await Utility.getFromLocalStorge('userId');
    var token = await Utility.getFromLocalStorge('JWT');
    let pageId = await Utility.getFromLocalStorge('getpageid');
    try {
      setLoader(true)
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
        `http://79.133.41.198:81/users/${userId}/${pageId}/getallpagepost`, // getCoverPic
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
        `http://79.133.41.198:81/users/${userId}/${pageId}/createpost`, // getCoverPic
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
    //     `http://79.133.41.198:81/users/${userId}/${pageId}/deletepost/${item.id}`, // getCoverPic
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
 const  likeapicall=async()=>{
   setcountlike(countlike+1);
 }
 const doublelikepost=()=>{
   setcountlike(countlike-1)
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

                            <View style={{ padding: 5, margin: wp('4%'), backgroundColor: 'white', borderRadius: 10, elevation: 10, opacity: 10, marginBottom: hp('10%') }} key={index}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', padding: 10 }}>
                                    <TouchableOpacity onPress={() => openProfileCover()}>
                                        <View>
                                            <Image source={require('../../../../images/splashlogo.png')} style={{ height: 40, width: 40, borderRadius: 50 }}></Image>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => openProfileCover()}>
                                        <View>
                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.location}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                               
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setCondition(true)}>
                                        <View>
                                            <MaterialCommunityIcons name="menu-down" size={35} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ margin: wp('4%') }}>
                                    <Text style>{item.caption} </Text>
                                    <TouchableOpacity activeOpacity={0.8}>
                                        <Image source={{ uri: item.post_upload_url }} style={{ width: wp('80%'), height: hp('40%'), borderRadius: 10 }}
                                        ></Image>
                                    </TouchableOpacity>

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: wp('3%') }}>
                                    <TouchableOpacity onPress={() => likeapicall(item)}>
                                        <View>
                                            <Image source={require('../../../../images/png/like.png')} style={{ height: 30, width: 30 }}></Image>
                                        </View>
                                        <View>
                                            <Text>Likes {countlike}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => doublelikepost(item)}>
                                        <View>
                                            <Image source={require('../../../../images/reaction/reactions_sad.png')} style={{ height: 50, width: 50 }}></Image>
                                        </View>

                                    </TouchableOpacity>
                                    <TouchableOpacity >
                                        <View>
                                            <MaterialCommunityIcons name="message" size={25} />

                                        </View>
                                        <View>
                                            <Text>{item.comments.comments_count}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity >
                                        <View>
                                            <MaterialCommunityIcons name="share" size={25} />

                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{padding:10}}>
                                    <Text>{item.description}...</Text>
                                </View>
                            </View>
                        )) : null}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};
export default showPage;
