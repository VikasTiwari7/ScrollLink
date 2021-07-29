import React, { useEffect, useState } from 'react';
import {
    Image, ScrollView, Text, View, Button, TextInput, Platform,
    PermissionsAndroid,FlatList
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { } from '@react-navigation/drawer'
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import Header from '../../../components/header';
import * as Utility from '../../../utility/index';
import * as api from '../../../api/url';
// var timeline=[];
const HomePage = ({ navigation }) => {
    const [condition, setCondition] = useState(false);
    const [chatcondition, setChatcondition] = useState(false);
    const [filePath, setFilePath] = useState({});
    const [wish,setWish]=useState('');
    const [hidewish,setHidewish]=useState(true);
    const [timeline,setTimeline]=useState([]);
    var vikas=[];
    useEffect(()=>{
        getDate1();
        retrieveProfile();
        getTimeline();
        
    })
    const retrieveProfile = async () => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        console.log("token=" + token)
        try {
          let response = await fetch(
            `http://79.133.41.198:4000/users/${userId}/getProfilePicUrl`, // getCoverPic
            {
              method: "GET",
              headers: {
                Authorization: 'Bearer ' + token,
               
              }
            }
          )
          let json = await response.text();
          let abc = json;
    
          let def = api.BaseUrl + abc;
          await Utility.setInLocalStorge("imageUrl",def)    
        } catch (error) {
          console.error(error);
        }
      };
    const getDate1=()=>{
        var hours = new Date().getHours();
        console.log(hours);
        if(hours<12){
            setWish("Good Morinng")
        }
        else if(hours<16){
            setWish("Good Afternoon")
     }
     else if(hours<20){
        setWish("Good Eveening")
     }

        else{
            setWish("Good Night")
        }
    }
    const getTimeline = async () => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        console.log("token=123" + token)
        try {
          let response = await fetch(
            `http://79.133.41.198:4000/users/${userId}/timelinefeed`, // getCoverPic
            {
              method: "GET",
              headers: {
                Authorization: 'Bearer ' + token,
               
            }
            }
          )
          let json = await response.json();
        console.log("timeline post ",json[0]._id);
        if(json.length>1){
            for(let i=0;i<json.length;i++){
                let post_id=json[i].post_id;
                var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        console.log("token=123" + token)
                try{
                    let response = await fetch(`http://79.133.41.198:4000/users/${userId}/getpostid/${post_id}`,
                    {
                        method: "GET",
                        headers: {
                          Authorization: 'Bearer ' + token,
                        }
                      }
                    )
                let json = await response.json();
                console.log("find post details",json);
                // setTimeline(json);
                vikas.push(json);
                console.log("vikas array length =:",vikas.length);
                }catch(error){
                    console.log(error);
                }
            }
        }
        // setTimeline(json);
        } catch (error) {
          console.error(error);
        }
      };
    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };
    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };
    const openProfileCover = () => {
        navigation.navigate('Profile_cover')
    }
    const openPublishPost = () => {
        navigation.navigate('publishPost');
    }
    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                alert('User cancelled camera picker');
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert('Camera not available on device');
                return;
            } else if (response.errorCode == 'permission') {
                alert('Permission not satisfied');
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }
            console.log('base64 -> ', response.base64);
            console.log('uri -> ', response.uri);
            console.log('width -> ', response.width);
            console.log('height -> ', response.height);
            console.log('fileSize -> ', response.fileSize);
            console.log('type -> ', response.type);
            console.log('fileName -> ', response.fileName);
            setFilePath(response);
        });
    };
    const openStatus = () => {
        navigation.navigate('CreateStatus')
    }
    return (
        <View>
        
            <Header navigation={navigation}/>
            {hidewish?
            <View style={{flexDirection:"row",justifyContent:'space-evenly'}}>
                <View>
                <Text style={{fontWeight:'900',fontSize:22,color:'#b9424d'}}>{wish}</Text>
                </View>
                <TouchableOpacity onPress={()=>setHidewish(!hidewish)}>
                <View>
                    <Text>Cancel</Text>
                </View>
                </TouchableOpacity>
            </View>:null}
            <ScrollView>
                <View style={{ margin: hp('1%') }}>
                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <View style={{ width: wp('30%'), margin: wp('2%'), elevation: 10, borderRadius: 10 }}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../images/d-avatar.jpg')} style={{ height: 100, width: 100 }}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => openStatus()}>

                                        <View style={{ alignSelf: 'center', backgroundColor: 'white', borderRadius: 20 }} >
                                            <MaterialCommunityIcons name="plus" size={35} />
                                        </View>


                                    </TouchableOpacity>

                                </View>
                                <Text style={{ alignSelf: 'center' }}>Create you post</Text>
                            </View>
                            <View>
                                <View style={{ width: wp('30%'), margin: wp('2%'), elevation: 10, borderRadius: 10 }}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../images/d-avatar.jpg')} style={{ height: 100, width: 100 }}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={{ alignSelf: 'center', backgroundColor: 'white', borderRadius: 20 }} >
                                            <MaterialCommunityIcons name="plus" size={35} />
                                        </View>

                                    </TouchableOpacity>

                                </View>
                                <Text style={{ alignSelf: 'center' }}>Create you post</Text>
                            </View>
                            <View>
                                <View style={{ width: wp('30%'), margin: wp('2%'), elevation: 10, borderRadius: 10 }}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../images/d-avatar.jpg')} style={{ height: 100, width: 100 }}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={{ alignSelf: 'center', backgroundColor: 'white', borderRadius: 20 }} >
                                            <MaterialCommunityIcons name="plus" size={35} />
                                        </View>

                                    </TouchableOpacity>

                                </View>
                                <Text style={{ alignSelf: 'center' }}>Create you post</Text>
                            </View>
                            <View>
                                <View style={{ width: wp('30%'), margin: wp('2%'), elevation: 10, borderRadius: 10 }}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../images/d-avatar.jpg')} style={{ height: 100, width: 100 }}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={{ alignSelf: 'center', backgroundColor: 'white', borderRadius: 20 }} >
                                            <MaterialCommunityIcons name="plus" size={35} />
                                        </View>

                                    </TouchableOpacity>

                                </View>
                                <Text style={{ alignSelf: 'center' }}>Create you post</Text>
                            </View>
                            <View>
                                <View style={{ width: wp('30%'), margin: wp('2%'), elevation: 10, borderRadius: 10 }}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../images/d-avatar.jpg')} style={{ height: 100, width: 100 }}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={{ alignSelf: 'center', backgroundColor: 'white', borderRadius: 20 }} >
                                            <MaterialCommunityIcons name="plus" size={35} />
                                        </View>

                                    </TouchableOpacity>

                                </View>
                                <Text style={{ alignSelf: 'center' }}>Create you post</Text>
                            </View>
                            <View>
                                <View style={{ width: wp('30%'), margin: wp('2%'), elevation: 10, borderRadius: 10 }}>
                                    <TouchableOpacity>
                                        <Image source={require('../../../images/d-avatar.jpg')} style={{ height: 100, width: 100 }}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <View style={{ alignSelf: 'center', backgroundColor: 'white', borderRadius: 20 }} >
                                            <MaterialCommunityIcons name="plus" size={35} />
                                        </View>

                                    </TouchableOpacity>

                                </View>
                                <Text style={{ alignSelf: 'center' }}>Create you post</Text>
                            </View>

                        </View>
                    </ScrollView>


                </View>
                <View>
                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('25%'), backgroundColor: '#ffcccb', borderRadius: 20, justifyContent: 'space-evenly', margin: wp('3%'), padding: 5 }}>
                                <MaterialCommunityIcons name="note" size={25} color={'#b9424d'} />
                                <Text style={{ color: '#b9424d', fontSize: 16, fontWeight: 'bold' }}> All</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('25%'), backgroundColor: '#ffcccb', borderRadius: 20, justifyContent: 'space-evenly', margin: wp('3%') }}>
                                <MaterialCommunityIcons name="format-text" size={25} color={'#b9424d'} />
                                <Text style={{ color: '#b9424d', fontSize: 16, fontWeight: 'bold' }}> Text</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('25%'), backgroundColor: '#ffcccb', borderRadius: 20, justifyContent: 'space-evenly', margin: wp('3%') }}>
                                <MaterialCommunityIcons name="camera" size={25} color={'#b9424d'} />
                                <Text style={{ color: '#b9424d', fontSize: 16, fontWeight: 'bold' }}> Photos</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('25%'), backgroundColor: '#ffcccb', borderRadius: 20, justifyContent: 'space-evenly', margin: wp('3%') }}>
                                <MaterialCommunityIcons name="video" size={25} color={'#b9424d'} />
                                <Text style={{ color: '#b9424d', fontSize: 16, fontWeight: 'bold' }}> Videos</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('25%'), backgroundColor: '#ffcccb', borderRadius: 20, justifyContent: 'space-evenly', margin: wp('3%') }}>
                                <MaterialCommunityIcons name="music" size={25} color={'#b9424d'} />
                                <Text style={{ color: '#b9424d', fontSize: 16, fontWeight: 'bold' }}>Sounds</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('25%'), backgroundColor: '#ffcccb', borderRadius: 20, justifyContent: 'space-evenly', margin: wp('3%') }}>
                                <MaterialCommunityIcons name="note" size={25} color={'#b9424d'} />
                                <Text style={{ color: '#b9424d', fontSize: 16, fontWeight: 'bold' }}>Files</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: wp('25%'), backgroundColor: '#ffcccb', borderRadius: 20, justifyContent: 'space-evenly', margin: wp('3%') }}>
                                <MaterialCommunityIcons name="map" size={25} color={'#b9424d'} />
                                <Text style={{ color: '#b9424d', fontSize: 16, fontWeight: 'bold' }}>Maps</Text>
                            </View>
                        </View>

                    </ScrollView>
                </View>
                <View style={{ flexDirection: 'row', margin: wp('5%'), borderRadius: 10, padding: 10, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => openProfileCover()}>
                        <View >
                            <Image source={require('../../../images/splashlogo.png')} style={{ height: 50, width: 50 }}></Image>
                        </View>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: wp('50%') }}>
                        <Text style={{ alignSelf: 'center', color: 'red' }}>What's going on ?</Text>
                    </View>
                    <TouchableOpacity>
                        <View >
                            <MaterialCommunityIcons name="video" size={25} color={'#b9424d'} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => openPublishPost()}>
                        <View >
                            <MaterialCommunityIcons name="camera" size={25} color={'#b9424d'} />
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <ScrollView> */}
                <FlatList
            data={vikas}
            // numColumns={2}
            renderItem={({item, index}) => (
              <View key={index}>
                  <Text>{item.post_id}</Text>
              </View>
            )}
          />
          {/* </ScrollView> */}
                <View style={{ padding: 5, margin: wp('4%'), backgroundColor: 'white', borderRadius: 10, elevation: 10, opacity: 10 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', padding: 10 }}>
                        <TouchableOpacity onPress={() => openProfileCover()}>
                            <View>
                                <Image source={require('../../../images/splashlogo.png')} style={{ height: 40, width: 40, borderRadius: 50 }}></Image>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => openProfileCover()}>
                            <View>
                                <Text>Vikas Tiwari</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 12 }}>6 hours ago.</Text>
                                    <Text style={{ fontSize: 10 }}>Translate</Text>
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
                        <Text>Real test here </Text>
                        <Image source={require('../../../images/d-cover.jpg')} style={{ width: wp('80%'), borderRadius: 10 }}></Image>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: wp('3%') }}>
                        <TouchableOpacity>
                            <View>
                                <MaterialCommunityIcons name="hand-heart" size={25} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setChatcondition(!chatcondition)}>
                            <View>
                                <MaterialCommunityIcons name="message" size={25} />

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View>
                                <MaterialCommunityIcons name="share" size={25} />

                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: wp('2%') }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <MaterialCommunityIcons name="hand-heart" size={15} />
                            </View>
                            <View>
                                <Text>1 reactions</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <MaterialCommunityIcons name="message" size={15} />
                            </View>
                            <View>
                                <Text>0</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <MaterialCommunityIcons name="share" size={15} />
                            </View>
                            <View>
                                <Text>0</Text>
                            </View>

                        </View>
                    </View>
                </View>
            
                {chatcondition == true ?
                    <View style={{ flexDirection: 'row', margin: wp('5%'), justifyContent: 'space-evenly', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => openProfileCover()}>
                            <View>
                                <Image source={require('../../../images/splashlogo.png')} style={{ height: 40, width: 40, borderRadius: 50 }}></Image>
                            </View>
                        </TouchableOpacity>
                        <View>
                            <TextInput placeholder="Write a comment ...." placeholderTextColor='red' style={{ borderRadius: 10, borderWidth: 1, width: wp('60%') }}> </TextInput>
                        </View>
                        <TouchableOpacity>
                            <View>
                                <MaterialCommunityIcons name="email-send-outline" size={35} />
                            </View>
                        </TouchableOpacity>
                    </View> : null}

            </ScrollView>
        </View>

    )
}
export default HomePage;