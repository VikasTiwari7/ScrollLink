import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../../utility/index';
import * as Utility from '../../../../utility/index';
import GetLocation from 'react-native-get-location'
var myApiKey='AIzaSyBt3pAWHuJgxo-_7Gc6QQHZK_Z1vZFLmCM';
const Newpost = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
  const [caption,setCaption]=useState();
  useEffect(() => {
    // retrivedata()
  }, []);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleSwitch1 = () => setIsEnabled1(previousState => !previousState);
  const toggleSwitch2 = () => setIsEnabled2(previousState => !previousState);
  const toggleSwitch3 = () => setIsEnabled3(previousState => !previousState);
  const Finalpost = async () => {
    let userId = await Utility.getFromLocalStorge('userId');
    let token = await Utility.getFromLocalStorge('JWT');
    let name = await Utility.getFromLocalStorge('fullName');
    let postId = await Utility.getFromLocalStorge('postId');
    console.log(userId);
    console.log('token=' + token);
    console.log(userId);
    console.log(
      `http://79.133.41.198:81/users/${userId}/updatepost/${postId}/updatePostInfo`,
    );

    try {
      let response = await fetch(
        // http://79.133.41.198:81/users/60d97dd575d2e590a94188a5/createpost
        `http://79.133.41.198:81/users/${userId}/updatepost/${postId}/updatePostInfo`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
            "Content-Type" : 'application/json',
          },
          body: JSON.stringify({
            user_id: userId,
            username: name,
            post_type: 'image',
            tag_people: 'Something is better then people',
            location: 'delhi',
            description: caption || "This is beautiful post",
          }),
        },
      );
      let json = await response;
      console.log(json);
      if (json.status == 200) {
        navigation.navigate('drawer');
        // Alert.alert("Success Fully Uploaded ");
      } else {
        Alert.alert('failed');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const findLocation=()=>{
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
  })
  .then(location => {
      console.log(location);
      fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.latitude + ',' + location.longitude + '&key=' + myApiKey)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
})
  })
  .catch(error => {
      const { code, message } = error;
      console.warn(code, message);
  })

  }
  return (
    <View>
      <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: wp('5%'),
        }}>
        <TouchableOpacity>
          <View>
           <Image source={require('../../../../images/png/close.png')} style={{height:50,width:50}}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
          <Image source={require('../../../../images/png/add-3.png')} style={{height:50,width:50}}></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Finalpost()}>
          <View>
          <Image source={require('../../../../images/png/checked.png')} style={{height:50,width:50}}></Image>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
          padding: 10,
        }}>
        <Image source={require('../../../../images/splashlogo.png')}></Image>

<View style={{width:'90%',alignSelf:'center'}}>
        <TextInput
          placeholder="Write a caption "
          placeholderTextColor="#b9424d"
          value={caption}
          multiline={true}
          maxLength={100}
          
          onChangeText={(text)=>setCaption(text)}
          style={{marginLeft:10,borderRadius:10,width:'80%'}}
          ></TextInput>
          </View>
       
      </View>
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 0.5,
        }}
      />
      <TouchableOpacity>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 18}}>Tag people</Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>findLocation()}>
        <View style={{padding: 10}}>
          <Text style={{fontSize: 18}}>Add Location</Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 0.5,
          }}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <Text style={{fontSize: 18}}>Create a promotion</Text>
        <Switch
          trackColor={{false: '#767577', true: '#b9424d'}}
          thumbColor={isEnabled ? '#b9424d' : '#f4f3f4'}
          // ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
     
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 0.5,
        }}
      />
      <TouchableOpacity>
        <View style={{padding: 10}}>
          <Text style={{color: 'gray'}}>Advanced settings</Text>
        </View>
      </TouchableOpacity>
      </ScrollView>
    </View>
    
  );
};
export default Newpost;
