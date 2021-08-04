import React,{useEffect} from 'react';
import { View, useWindowDimensions ,Text, TextInput,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../utility/index';
import * as Utility from '../../../utility/index';
import { useState } from 'react/cjs/react.development';

const FirstRoute = () => (

  <View style={{ flex: 1}} >
    <ScrollView>
      <View style={{margin:wp('4%'),backgroundColor:"white",padding:10,borderRadius:10,elevation:10,opacity:10,marginBottom:hp('5%')}}>
    <View >
      <Text style={{fontSize:20,fontWeight:'bold',marginLeft:wp('10%')}}>Activities</Text>
    </View>

    <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:wp('4%')}}>
     <View>
         <Image source={require('../../../images/splashlogo.png')} style={{height:50,width:50}}></Image>
     </View>
     <View style={{width:wp('50%')}}>
         <Text>Vikas Tiwari reacted to indian post</Text>
     </View>
     <View>
         <Image source={require('../../../images/reaction/reactions_love.png')} style={{height:20,width:20}}></Image>
     </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:wp('4%')}}>
     <View>
         <Image source={require('../../../images/splashlogo.png')} style={{height:50,width:50}}></Image>
     </View>
     <View style={{width:wp('50%')}}>
         <Text>Vikas Tiwari reacted to indian post</Text>
     </View>
     <View>
         <Image source={require('../../../images/reaction/reactions_love.png')} style={{height:20,width:20}}></Image>
     </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:wp('4%')}}>
     <View>
         <Image source={require('../../../images/splashlogo.png')} style={{height:50,width:50}}></Image>
     </View>
     <View style={{width:wp('50%')}}>
         <Text>Vikas Tiwari reacted to indian post</Text>
     </View>
     <View>
         <Image source={require('../../../images/reaction/reactions_love.png')} style={{height:20,width:20}}></Image>
     </View>
    </View>
    
    </View>
   
    </ScrollView>

  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1 }} >
    <ScrollView>
      <View>
        <View style={{flexDirection:'row',margin:wp('4%'),backgroundColor:'white',padding:10,borderRadius:10}}>
        <View>
        <Image source={require('../../../images/png/photos.png')} style={{height:20,width:20}}></Image>
    </View>
    <View style={{marginLeft:wp('5%')}}>
      <Text>Albums</Text>
    </View>
  
   
    </View>
    <View style={{backgroundColor:'white',padding:10,margin:wp('5%'),flexDirection
:'row'}}>
    <View>
        <Image source={require('../../../images/png/photos.png')} style={{height:20,width:20}}></Image>
    </View>
        <View  style={{marginLeft:wp('5%')}}>
        <Text>Photos</Text>
        </View>
    </View>
    </View>
    
    
    </ScrollView>
    </View>
);

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0); 
  const [activity,setActivity]=useState([]);

  const [routes] = React.useState([
    { key: 'first', title: 'Activities' },
    { key: 'second', title: 'Gallary' },
   
  ]);

  useEffect(()=>{
    getallpost();

  },[])
  const getallpost= async()=>{
    var userId = await Utility.getFromLocalStorge("userId");
    var token = await Utility.getFromLocalStorge("JWT");
    var username = await Utility.getFromLocalStorge("fullName");
    var email = await Utility.getFromLocalStorge("email");
    console.log("token=123" + token)
    try {
        let response = await fetch(
            `http://79.133.41.198:4000/users/${userId}/getallpost`, // getCoverPic
            {
                method: "GET",
                headers: {
                    Authorization: 'Bearer ' + token,

                }
            }
        )
        let json = await response.json();
        console.log("post details",json);
        setActivity(json);
    } catch (error) {
        console.error(error);
    }

  }

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
   
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}