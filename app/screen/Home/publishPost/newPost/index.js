import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../../../utility/index';
import * as Utility from '../../../../utility/index';
const Newpost = ({navigation}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isEnabled1, setIsEnabled1] = useState(false);
  const [isEnabled2, setIsEnabled2] = useState(false);
  const [isEnabled3, setIsEnabled3] = useState(false);
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
      `http://79.133.41.198:4000/users/${userId}/updatepost/${postId}/updatePostInfo`,
    );

    try {
      let response = await fetch(
        // http://79.133.41.198:4000/users/60d97dd575d2e590a94188a5/createpost
        `http://79.133.41.198:4000/users/${userId}/updatepost/${postId}/updatePostInfo`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + token,
          },
          body: {
            user_id: '60d97dd575d2e590a94188a5',
            username: 'Rohan',
            post_type: 'image',
            tag_people: 'Something is better then people',
            location: 'delhi',
            description: 'bla bla',
          },
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
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          margin: wp('5%'),
        }}>
        <TouchableOpacity>
          <View>
            <Text>Back arrow</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <Text>New Post</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Finalpost()}>
          <View>
            <Text>Right</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 10,
        }}>
        <Image source={require('../../../../images/splashlogo.png')}></Image>
        <TextInput
          placeholder="Write a caption "
          placeholderTextColor="#b9424d"></TextInput>
        <Image source={require('../../../../images/splashlogo.png')}></Image>
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
      <TouchableOpacity>
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

      <View style={{padding: 10}}>
        <Text style={{fontSize: 18, padding: 5}}>Also post to </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image source={require('../../../../images/splashlogo.png')}></Image>
          <View style={{alignSelf: 'center'}}>
            <Text style={{color: 'gray'}}>Facebook</Text>
            <Text style={{color: 'gray'}}>username</Text>
          </View>
          <Switch
            trackColor={{false: '#767577', true: '#b9424d'}}
            thumbColor={isEnabled1 ? '#b9424d' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch1}
            value={isEnabled}
          />
        </View>
        <View>
          <Text>Twitter </Text>
          <Switch
            trackColor={{false: '#767577', true: '#b9424d'}}
            thumbColor={isEnabled2 ? '#b9424d' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch2}
            value={isEnabled}
          />
        </View>
        <View>
          <Text>Tumblr </Text>
          <Switch
            trackColor={{false: '#767577', true: '#b9424d'}}
            thumbColor={isEnabled3 ? '#b9424d' : '#f4f3f4'}
            // ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch3}
            value={isEnabled}
          />
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
          <Text style={{color: 'gray'}}>Advanced settings</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Newpost;
