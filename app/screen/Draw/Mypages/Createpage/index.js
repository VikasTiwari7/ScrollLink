import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../../utility/index';
import {TextInput} from 'react-native-paper';
import {ScrollView} from 'react-native-gesture-handler';
import * as Utility from '../../../../utility/index';
// import { useState } from 'react/cjs/react.development';
const CreatePage = ({navigation,route}) => {
  const { pageId } = route.params.page_id;
  console.log("pageId ",pageId)
  const [category, setCategory] = useState();
  const [pagename, setPagename] = useState();
  const [pageurl, setPageurl] = useState();
  const [pagebio, setBio] = useState();
  const [description, setDescription] = useState();
  const CreaterealPage = async () => {
    let userId = await Utility.getFromLocalStorge('userId');
    let token = await Utility.getFromLocalStorge('JWT');
    let name = await Utility.getFromLocalStorge('fullName');
    // let pageId = await Utility.getFromLocalStorge('pageId');
    console.log(
      `http://79.133.41.198:81/users/${userId}/updatepage/${pageId}/updatePageInfo`,
    );
    try {
      let response = await fetch(
        `http://79.133.41.198:81/users/${userId}/updatepage/${pageId}/updatePageInfo`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            "Content-Type" : 'application/json',
          },
          body: JSON.stringify({
                value :pagename,
                username: "a",
            pagename:pagename ,
            page_url: 'rohan vikas page link',
            info: {
              bio: pagebio,
              category: category,
              privacy_status: 'public',
              description: description,
            },
          }),
        },
      );
      let json = await response;
      console.log(json);
      if (json.status == 200) {
        navigation.navigate('Mypages');
      } else {
        Alert.alert('Something wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <View>
      <Text style={{fontSize: 20, fontWeight: 'bold', margin: wp('5%')}}>
        Page
      </Text>
      </View>
      {/* <View> */}
        <ScrollView>
          <View
            style={{
              margin: wp('5%'),
              backgroundColor: 'white',
              padding: 20,
              borderRadius: 10,
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../../../images/img/icon.png')}
                style={{height: 20, width: 20}}></Image>
              <Text
                style={{
                  marginLeft: wp('5%'),
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Create New Page
              </Text>
            </View>
            <View style={{margin: wp('5%')}}>
              <TextInput
                label="Page Name"
                value={pagename}
                onChangeText={text => setPagename(text)}
              />
               <Text style={{color: 'gray'}}>
                https://scrolllink.com/page_url
              </Text>
            </View>
            <View style={{margin: wp('5%')}}>
              <TextInput
                label="Bio"
                value={pagebio}
                onChangeText={text => setBio(text)}
               
              />
             
            </View>
            <View style={{margin: wp('5%')}}>
              <TextInput
                label="Page Desciption"
                value={description}
                onChangeText={text => setDescription(text)}
              />
              <Text style={{color: 'gray'}}>
                Your page description, Between 10 and 200 characters max.
              </Text>
            </View>

            <View style={{margin: wp('5%')}}>
              <TextInput
                label="Page Category"
                value={category}
                onChangeText={text => setCategory(text)}
              />
            </View>

            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => navigation.navigate('Mypages')}>
              <View>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Go back</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                margin: wp('5%'),
                backgroundColor: '#b9424d',
                padding: 15,
                borderRadius: 10,
              }}
              onPress={() => CreaterealPage()}>
              <View>
                <Text style={{color: 'white', fontSize: 18}}>Create</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    // </View>
  );
};
export default CreatePage;
