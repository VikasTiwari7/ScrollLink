import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {heightPercentageToDP} from '../../../../utility';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../../utility/index';
import * as Utility from '../../../../utility/index';
const showPage = ({navigation}) => {
  // const [postid,setPostid]=useState();

  const [pagepostfile, setPagepostfile] = useState();
  const [coverimage,setCoverImage]=useState();
  const [profileImage,setProfileImage]=useState();
  const [name,setName]=useState();
  useEffect(()=>{
    getpageinfo();
    getPostinfo();
  },[])
  const getpageinfo=async()=>{
    var userId = await Utility.getFromLocalStorge('userId');
    var token = await Utility.getFromLocalStorge('JWT');
    let pageId = await Utility.getFromLocalStorge('getpageid');
    try {
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
    } catch (error) {
      console.log(error);
    }
  }
  const getPostinfo=async()=>{
    var userId = await Utility.getFromLocalStorge('userId');
    var token = await Utility.getFromLocalStorge('JWT');
    let pageId = await Utility.getFromLocalStorge('getpageid');
    try {
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

  return (
    <View style={{height:'80%'}}>
      <Text style={{fontSize:25,fontWeight:'bold'}}> {name}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <View style={{backgroundColor: 'white'}}>
          <Text>Overvieww</Text>
        </View>

        <View style={{backgroundColor: 'white'}}>
          <Text>Overview</Text>
        </View>

        <View style={{backgroundColor: 'white'}}>
          <Text>Overview</Text>
        </View>
      </View>
      {/* <ScrollView> */}
        <View>
          <View>
            <Image
              source={{uri:coverimage}}
              style={{
                height: hp('25%'),
                width: wp('90%'),
                alignSelf: 'center',
                margin: wp('5%'),
                borderRadius:20
              }} onError={()=>setCoverImage('https://picsum.photos/seed/picsum/200/300')}></Image>
          </View>
        </View>
        <View style={{flexDirection: 'row',justifyContent:'space-evenly'}}>
          <View>
            <Image
              source={{uri:profileImage}}
              style={{borderRadius: 50, height: 50, width: 50}} onError={()=>setProfileImage('https://picsum.photos/seed/picsum/200/300')}></Image>
          </View>
          <View>
            <Text style={{fontWeight:'bold',fontSize:18}}>{name}</Text>
            <Text>Create page @ {name}</Text>
          </View>
        </View>
      {/* </ScrollView> */}
      <TouchableOpacity onPress={() => openpagepost()}>
        <View
          style={{
            padding: 10,
            backgroundColor: 'blue',
            margin: wp('4%'),
            alignSelf: 'center',
            borderRadius:10
          }}>
          <Text style={{color: 'white', alignSelf: 'center'}}>Create Post</Text>
        </View>
      </TouchableOpacity>

      <View style={{alignSelf:'center'}}>
        <Text style={{fontWeight:'bold',fontSize:20}}> Show Page Post</Text>
       <ScrollView>
         
       </ScrollView>
      </View>
    </View>
  );
};
export default showPage;
