import React,{useState} from 'react';
import { View ,Text, ScrollView,Image} from 'react-native';
import { TextInput} from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Profile_Privacy_setting=({navigation})=>{
    const [Status,setStatus]=useState();
    const [follow,setFollow]=useState();
    const [message,setMessage]=useState();
    const [friends,setFriends]=useState();
    const [timeline,setTimeline]=useState();
    const [birthday,setBirthday]=useState();
    const [confirmRequest,setconfirmRequest]=useState();
    const [activities,setActivities]=useState();
    const [location,setLocation]=useState();
    const [indexProfile,setIndexProfile]=useState();
    const backarrow=()=>{
        navigation.navigate('Bottom')

    }
    return(
        <View>
            <ScrollView>
                <View style={{flexDirection:'row',width:wp('60%'),justifyContent:'space-evenly'}}>
                    <TouchableOpacity onPress={()=>backarrow()}>
                  <MaterialCommunityIcons name="keyboard-backspace" size={35} color={'#b9424d'}
                   />
                   </TouchableOpacity>
            <Text style={{fontSize:22,fontWeight:'bold'}}>Privacy Setting</Text>
            </View>
         
            <View style={{backgroundColor:'white',borderRadius:10,margin:wp('4%'),padding:10,elevation:10,opacity:10}}>
            <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Status"
                value={Status}
                onChangeText={text => setStatus(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Who can follow me ?"
                value={follow}
                onChangeText={text => setFollow(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Who can message me ?"
                value={message}
                onChangeText={text => setMessage(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Who can see my friends"
                value={friends}
                onChangeText={text => setFriends(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Who can post on my timeline ?"
                value={timeline}
                onChangeText={text => setTimeline(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Who can see my birthday"
                value={birthday}
                onChangeText={text => setBirthday(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Confirm request when someone follows you ?"
                value={confirmRequest}
                onChangeText={text => setconfirmRequest(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Show my activities ?"
                value={activities}
                onChangeText={text => setActivities(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Share my location with public ?"
                value={location}
                onChangeText={text => setLocation(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Allow search engines to index my profile and ..... ?"
                value={indexProfile}
                onChangeText={text => setIndexProfile(text)}
                />
                </View>
            

             <View style={{padding:10,alignSelf:'center',backgroundColor:'#b9424d',width:wp('40%'),borderRadius:15}}>
                    <Text style={{alignSelf:'center',color:'white',fontWeight:'bold',fontSize:18}}>Save </Text>
                </View>
                </View>
            
   
            </ScrollView>
        </View>
    )
}
export default Profile_Privacy_setting;