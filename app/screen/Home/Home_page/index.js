import React, { useEffect, useState } from 'react';
import {
    Image, ScrollView, Text, View, Button, TextInput, Platform,
    PermissionsAndroid
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB, Portal, Provider } from 'react-native-paper';
import { } from '@react-navigation/drawer'
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import Header from '../../../components/header';
import * as Utility from '../../../utility/index';
import * as api from '../../../api/url';
// import {d}/
// var timeline=[];
const HomePage = ({ navigation }) => {
    const [condition, setCondition] = useState(false);
    const [chatcondition, setChatcondition] = useState(false);
    const [filePath, setFilePath] = useState({});
    const [wish, setWish] = useState('');
    const [hidewish, setHidewish] = useState(true);
    const [timeline, setTimeline] = useState([]);
    const [statusdata,setStatusData]=useState([]);
    const [msg,setMsg]=useState();
    var vikas = [];
    useEffect(() => {
        getDate1();
        retrieveProfile();
        getTimeline();
        getStatus();

    }, [])
    
    const getStatus = async () => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:4000/users/${userId}/getstatus`, // getCoverPic
                {
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + token,

                    }
                }
            )
            let json = await response.json();
            console.log("status records:-",json);
            setStatusData(json);
        } catch (error) {
            console.error(error);
        }
    };
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
            await Utility.setInLocalStorge("imageUrl", def)
        } catch (error) {
            console.error(error);
        }
    };
    const getDate1 = () => {
        var hours = new Date().getHours();
        console.log(hours);
        if (hours < 12) {
            setWish("Good Morinng")
        }
        else if (hours < 16) {
            setWish("Good Afternoon")
        }
        else if (hours < 20) {
            setWish("Good Eveening")
        }

        else {
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
            console.log(json);
            setTimeline(json);
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
    const openProfileCover = async() => {
        navigation.navigate('Profile_cover')
    }
    const openPublishPost = async() => {
        navigation.navigate('publishPost');
    }
    const chooseFile = async(type) => {
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
    const openStatus = async() => {
        navigation.navigate('CreateStatus')
    }
    const likeapicall = async(item) => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        var postid = item.id;
        console.log("upload post id",postid);
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:4000/users/${userId}/postlike/${postid}`, // getCoverPic
                {
                    method: "PUT",
                    headers: {
                        Authorization: 'Bearer ' + token,

                    }
                }
            )
            let json = await response;
            if(json.status==200){
                alert(postid+"like is like")
            }
            console.log("like reply",json);
            // setTimeline(json);  
        } catch (error) {
            console.error(error);
        }

    }
    const doublelikepost = async(item) => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        var postid = item.id;
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:4000/users/${userId}/doublelike/${postid}`, // getCoverPic
                {
                    method: "PUT",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            )
            let json = await response;
            console.log(json);
            // setTimeline(json);  
        } catch (error) {
            console.error(error);
        }

    }
    const addComment=async(item)=>{
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        var postid = item.id;
        console.log("token=123" + postid)
        try {
            console.log("like",`http://79.133.41.198:4000/users/${userId}/postcomment/${postid}`)
            let response = await fetch(
                `http://79.133.41.198:4000/users/${userId}/postcomment/${postid}`, // getCoverPic
                {
                    method: "PUT",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    },
                
                body:{
                    user_id:userId,
                    username:username,
                    comment:msg
                }
            })
            let json = await response;
            console.log("Add the comments",json);
            if(json.status==200){
                alert("Comments is added")
                setChatcondition(false)

            }
            // setTimeline(json);  
        } catch (error) {
            console.error(error);
        }
    }
    const deletepost=async(item)=>{
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        var postid = item.post_id;
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:4000/users/${userId}/deletecomment/${postid}`, // getCoverPic
                {
                    method: "PUT",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                },
                body=JSON.stringify({
                    user_id:userId,
                    username:username,
                    comment:msg
                })
            )
            let json = await response.json();
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    }
    const [state, setState] = useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });
  
    const { open } = state;
    return (
        <View style={{flex:1}}>
      
            {/* <View style={{margin:1}}> */}
            
    {/* </View> */}
            <Header navigation={navigation} />
            {hidewish ?
                <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                    <View>
                        <Text style={{ fontWeight: '900', fontSize: 22, color: '#b9424d' }}>{wish}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setHidewish(!hidewish)}>
                        <View>
                            <Text>Cancel</Text>
                        </View>
                    </TouchableOpacity>
                </View> : null}
            <ScrollView>
                <View style={{ margin: hp('1%') }}>
                    <ScrollView horizontal={true}>
                        <View style={{ flexDirection: 'row' }}>
                            {statusdata.length>0? statusdata.map((item,index)=>(
                            <View key={index}>
                                <View style={{ width: wp('30%'), margin: wp('2%'), elevation: 10, borderRadius: 10 }} >
                                    <TouchableOpacity>
                                        <Image source={{uri:item.status_url}} style={{ height: 100, width: 100 }}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => openStatus()}>
                                        <View style={{ alignSelf: 'center', backgroundColor: 'white', borderRadius: 20 }} >
                                            <MaterialCommunityIcons name="plus" size={35} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ alignSelf: 'center' }}>Create you post</Text>
                            </View>
                            )):null}
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
                <Provider   >
      <Portal >
        <FAB.Group
        fabStyle={{position:'absolute',bottom:5,margin:0}}
        
          open={open}
          icon={open ? 'plus' : 'plus'}
          actions={[
            { icon: 'plus', 
            label:'Status',
            onPress: () => openStatus() },
            {
                icon:'plus',
                label:'Post',
                onPress:()=>openPublishPost()            },
            {
                icon:'plus',
                // label:'Post',
                onPress:()=>console.log("Pressed post")
            }
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </Portal>
    </Provider>
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
                {/* <View> */}
              
    {/* </View> */}
   
                {timeline.length > 0?
                timeline.map((item, index) => (

                    <View style={{ padding: 5, margin: wp('4%'), backgroundColor: 'white', borderRadius: 10, elevation: 10, opacity: 10, marginBottom: hp('5%') }} key={index}>
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
                            <Text>{item.caption} </Text>
                            <TouchableOpacity onPress={()=>doublelikepost(item)}>
                            <Image source={{uri:item.post_upload_url}} style={{ width: wp('80%'),height:hp('40%'), borderRadius: 10 }} 
                    ></Image>
                    </TouchableOpacity>

                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: wp('3%') }}>
                            <TouchableOpacity onPress={() => likeapicall(item)}>
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
                                    <Text>{item.likes.likes_count}reactions</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <View>
                                    <MaterialCommunityIcons name="message" size={15} />
                                </View>
                                <View>
                                    <Text>{item.comments.comments_count}</Text>
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
                        {chatcondition ?
                        <View>
                            <View style={{ flexDirection: 'row', marginLeft: wp('5%'), justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => openProfileCover()}>
                                    <View>
                                        <Image source={require('../../../images/splashlogo.png')} style={{ height: 40, width: 40, borderRadius: 50 }}></Image>
                                    </View>
                                </TouchableOpacity>
                                <View>
                                    <TextInput placeholder="Write a comment ...." placeholderTextColor='red' style={{ borderRadius: 10, borderWidth: 1 }} onChangeText={(e)=>setMsg(e)}> </TextInput>
                                </View>
                                <TouchableOpacity onPress={()=>addComment(item)}>
                                    <View>
                                        <MaterialCommunityIcons name="email-send-outline" size={35} />
                                    </View>
                                </TouchableOpacity>
                                </View>
                                <View>
                                    <Text>Show chat list </Text>
                                    <TouchableOpacity onPress={()=>deletepost(item)}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', margin: hp('5%') }} >
                                        <Image source={require('../../../images/splashlogo.png')} style={{ height: 20, width: 20 }}>
                                        </Image>
                                        <Text>Helllo vikas </Text>
                                    </View>
                                    </TouchableOpacity>

                                </View>
                            </View> 
                            
                            : null}
                    </View>
                )):null}

               

            </ScrollView>
        
       </View>

    )
}
export default HomePage;