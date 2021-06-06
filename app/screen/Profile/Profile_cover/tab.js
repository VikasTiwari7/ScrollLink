import * as React from 'react';
import { View, useWindowDimensions ,Text, TextInput,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TabView, SceneMap } from 'react-native-tab-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../utility/index';
import * as Utility from '../../../utility/index';

const FirstRoute = () => (
  <View style={{ flex: 1}} >
    <ScrollView>
      <View style={{margin:wp('4%'),backgroundColor:"white",padding:10,borderRadius:10,elevation:10,opacity:10}}>
    <View >
      <Text>Profile Completion</Text>

    </View>
    <View>
      <Text>Add your profile picture</Text>
    </View>
    <View>
      <Text>Add your  name</Text>
    </View>
    <View>
      <Text>Add your workplace</Text>
    </View>
    <View>
      <Text>Add your country</Text>
    </View>
    <View>
      <Text>Add your address</Text>
    </View>
    </View>
    <View style={{margin:wp('4%'),backgroundColor:"white",padding:10,borderRadius:10,elevation:10,opacity:10}}>
      <View>
        <TextInput placeholder="Search for Posts"></TextInput>
      </View>
      <View>
        <Text>Online</Text>
      </View>
      <View>
        <Text>15 Followers</Text>
      </View>
      <View>
        <Text>12 posts</Text>
      </View>
      <View>
        <Text>Female</Text>
      </View>
      <View>
        <Text>12-12-07</Text>
      </View>
    </View>
    </ScrollView>

  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1 }} >
    <ScrollView>
      <View>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',margin:wp('4%')}}>
    <View>
      <Text>15 Following</Text>
    </View>
    <View>
      <Text>Family members</Text>
    </View>
    </View>
    <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
    <View style={{padding:10,width:wp('40%'),backgroundColor:'white',elevation:10,opacity:10,borderRadius:10,margin:wp('3%')}}>
      <View>
        <Image source={require('../../../images/d-avatar.jpg')} style={{borderRadius:40,height:100,width:100,alignSelf:'center'}}></Image>
      </View>
      <View style={{alignSelf:'center',margin:wp('3%')}}>
        <Text >Vipan Kumar</Text>
      </View>
     <View style={{alignSelf:'center',backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
       <Text style={{color:'white'}}>Following</Text>
     </View>
    </View>
    <View style={{padding:10,width:wp('40%'),backgroundColor:'white',elevation:10,opacity:10,borderRadius:10,margin:wp('3%')}}>
      <View>
        <Image source={require('../../../images/d-avatar.jpg')} style={{borderRadius:40,height:100,width:100,alignSelf:'center'}}></Image>
      </View>
      <View style={{alignSelf:'center',margin:wp('3%')}}>
        <Text >Vipan Kumar</Text>
      </View>
     <View style={{alignSelf:'center',backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
       <Text style={{color:'white'}}>Following</Text>
     </View>
     </View>
    </View>
    </View>
    
    </ScrollView>
    </View>
);

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Timeline' },
    { key: 'second', title: 'Following' },
   
  ]);

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