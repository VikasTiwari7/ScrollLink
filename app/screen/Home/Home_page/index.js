import React, { useEffect, useState, useRef } from 'react';
import {
    Image, ScrollView, Text, View, Button, Platform,
    PermissionsAndroid, BackHandler, Alert, TextInput, StyleSheet,TouchableOpacity,RefreshControl
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { FAB, Portal, Provider } from 'react-native-paper';
import { } from '@react-navigation/drawer'
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import Header from '../../../components/header';
import * as Utility from '../../../utility/index';
// import * as api from '../../../api/url';
import { useIsFocused } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
// import Story from 'react-native-story'

import Share from 'react-native-share';
import Moment from 'moment';
import Video from 'react-native-video';

const HomePage = ({ navigation }) => {
    const refRBSheet = useRef();
    const isFocused = useIsFocused();
    const [condition, setCondition] = useState(false);
    const [chatcondition, setChatcondition] = useState();
    const [chatstatus, setChatStatus] = useState(false);
    const [filePath, setFilePath] = useState({});
    const [wish, setWish] = useState('');
    const [hidewish, setHidewish] = useState(true);
    const [timeline, setTimeline] = useState([]);
    const [statusdata, setStatusData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [msg, setMsg] = useState();
    const [chat, setchat] = useState([]);
    const [profileData, setProfiledata] = useState();
    const [conditionSuggestion, setConditionSuggestions] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    var vikas = [];
    useEffect(() => {
        navigation.addLis
        getDate1();
        retrieveProfile();
        getTimeline();
        getStatus();
        getsuggestionlist();

        // const backAction = () => {
        //     Alert.alert("Hold on!", "Are you sure you want to go back?", [
        //       {
        //         text: "Cancel",
        //         onPress: () => null,
        //         style: "cancel"
        //       },
        //       { text: "YES", onPress: () => BackHandler.exitApp() }
        //     ]);
        //     return true;
        //   };

        //   const backHandler = BackHandler.addEventListener(
        //     "hardwareBackPress",
        //     backAction
        //   );

        //   return () => backHandler.remove();

    }, [isFocused])


    const getsuggestionlist = async () => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:81/users/${userId}/getPeopleMayKnowList`, // getCoverPic
                {
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            )
            let json = await response.json();
            console.log("Suggestion records-", json);
            setSuggestions(json);
        } catch (error) {
            console.error(error);
        }

    }
    const getStatus = async () => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:81/users/${userId}/getstatus`, // getCoverPic
                {
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + token,

                    }
                }
            )
            let json = await response.json();
            console.log("status records:-", json);
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
                `http://79.133.41.198:81/users/${userId}/getProfileData`, // getCoverPic
                {
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + token,

                    }
                }
            )
            let json = await response.json();
            let abc = json;
            await Utility.setInLocalStorge("imageUrl", json.user_profile.profile_photo_url)
            setProfiledata(json.user_profile.profile_photo_url);
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
                `http://79.133.41.198:81/users/${userId}/timelinefeed`, // getCoverPic
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
    const openProfileCover = async () => {
        navigation.navigate('Profile_cover')
    }
    const openPublishPost = async () => {
        navigation.navigate('publishPost');
    }
    const chooseFile = async (type) => {
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
    const openStatus = async () => {
        navigation.navigate('CreateStatus')
    }
    const likeapicall = async (item) => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        var postid = item.id;
        console.log("upload post id", postid);
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:81/users/${userId}/postlike/${postid}`, // getCoverPic
                {
                    method: "PUT",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            )
            let json = await response;
            if (json.status == 200) {
                // alert(postid+"like is like")
                getTimeline();
            }
            console.log("like reply", json);
            // setTimeline(json);  
        } catch (error) {
            console.error(error);
        }

    }
    const doublelikepost = async (item) => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        var postid = item.id;
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:81/users/${userId}/doublelike/${postid}`, // getCoverPic
                {
                    method: "PUT",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            )
            let json = await response;
            console.log("double like ", json);
            if (json.status == 200) {
                getTimeline();
            }
            // setTimeline(json);  
        } catch (error) {
            console.error(error);
        }

    }
    const addComment = async (item) => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        var postid = item.id;
        console.log("token=123" + postid)
        try {
            console.log("like", `http://79.133.41.198:81/users/${userId}/postcomment/${postid}`)
            let response = await fetch(
                `http://79.133.41.198:81/users/${userId}/postcomment/${postid}`, // getCoverPic
                {
                    method: "PUT",
                    headers: {
                        Authorization: 'Bearer ' + token,
                        "Content-Type": 'application/json',
                    },

                    body: JSON.stringify({
                        user_id: userId,
                        username: username,
                        comment: msg
                    })
                })
            let json = await response;
            console.log("Add the comments", json);
            if (json.status == 200) {
                getTimeline();

            }
            // setTimeline(json);  
        } catch (error) {
            console.error(error);
        }
    }
    const deletepost = async (item) => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        var postid = item.post_id;
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:81/users/${userId}/deletecomment/${postid}`, // getCoverPic
                {
                    method: "PUT",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                },
                body = JSON.stringify({
                    user_id: userId,
                    username: username,
                    comment: msg
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

    const removeitem = (item) => {
        console.log("remove data from array ", item)
        setSuggestions(suggestions.filter(item => item !== item))


    }
    const openchat = async (item) => {
        console.log("chat item is ", item);
        setChatcondition(item)
        setChatStatus(!chatstatus)
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        var postid = item.post_id;
        console.log("token=123" + token)
        console.log("url checked", `http://79.133.41.198:81/users/${userId}/getcomments/${item}`);
        try {
            let response = await fetch(
                `http://79.133.41.198:81/users/${userId}/getcomments/${item}`, // getCoverPic
                {
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            )
            let json = await response.json();
            setchat(json.by_who)
            console.log("show comments are ", json);
        } catch (error) {
            console.error(error);
        }

    }
    const openshare = (options) => {
        Share.open(options)
            .then((res) => {
                console.log("share is ", res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }
    const following = async (item) => {
        console.log("following items are", item)

        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:81/users/${userId}/addfollowers/${item.id}`, // getCoverPic
                {
                    method: "PUT",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            )
            let json = await response;
            console.log("Follow Records records-", json);
            if (json.status == 200) {
                alert("Successfully follow")
                getTimeline();
            } else {
                alert("Something went wrong");
            }

            // setSuggestions(json);
        } catch (error) {
            console.error(error);
        }

    }
    const openBottomsheet=(item)=>{
        console.log("select post id ",item.id)
        // setSelectPostid(item)
        refRBSheet.current.open()
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getTimeline(2000).then(() => setRefreshing(false));
      }, []);
    return (
        <Provider   >
            <View style={{ flex: 1 }}>
                <Header navigation={navigation} />
                <Portal >
                    <FAB.Group
                        fabStyle={{ position: 'absolute', bottom: 5, margin: 0 }}
                        open={open}
                        icon={open ? 'plus' : 'plus'}
                        actions={[
                            {
                                icon: 'plus',
                                label: 'Status',
                                onPress: () => openStatus()
                            },
                            {
                                icon: 'plus',
                                label: 'Post',
                                onPress: () => openPublishPost()
                            },
                            {
                                icon: 'plus',
                                // label:'Post',
                                onPress: () => console.log("Pressed post")
                            }
                        ]}
                        onStateChange={onStateChange}
                        onPress={() => {
                            if (open) {

                            }
                        }}
                    />
                </Portal>

                {hidewish ?
                    <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
                        <View>
                            <Text style={{ fontWeight: '900', fontSize: 22, color: '#b9424d' }}>{wish}</Text>
                        </View>
                        <TouchableOpacity onPress={() => setHidewish(!hidewish)}>
                            <View>
                                <Image source={require('../../../images/cross.png')} style={{ height: 20, width: 20 }}></Image>
                            </View>
                        </TouchableOpacity>
                    </View> : null}


                <ScrollView showsVerticalScrollIndicator={false} refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={()=>onRefresh()}
                    ></RefreshControl>
                }>
                    <View style={{ margin: hp('1%') }}>
                        <ScrollView horizontal={true}>
                            <View style={{ flexDirection: 'row' }}>
                                {statusdata.length > 0 ? statusdata.map((item, index) => (
                                    <View key={index}>
                                        <View style={{ width: wp('30%'), margin: wp('2%'), borderRadius: 10 }} >
                                            <TouchableOpacity>
                                                <Image source={{ uri: item.source }} style={{ height: 100, width: 100, borderRadius: 10 }}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )) : <View style={{ width: wp('30%'), margin: wp('2%'), borderRadius: 10 }} >
                                    <TouchableOpacity>
                                        <Image source={{ uri: 'https://picsum.photos/seed/picsum/200/300' }} style={{ height: 100, width: 100, borderRadius: 10 }}></Image>
                                    </TouchableOpacity>
                                </View>}
                            </View>
                        </ScrollView>
                    </View>
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
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
                                {profileData ? <Image source={{ uri: profileData }} style={{ height: 50, width: 50, borderRadius: 50 }}></Image> :
                                    <Image source={require('../../../images/splashlogo.png')} style={{ height: 50, width: 50 }}></Image>}
                            </View>
                        </TouchableOpacity>
                        <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 10, width: wp('50%') }}>
                            <Text style={{ alignSelf: 'center', color: 'red' }}>What's going on ?</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('videoscreen')}>
                            <View >
                                <MaterialCommunityIcons name="video" size={25} color={'#b9424d'} />
                            </View>
                        </TouchableOpacity>

                    </View>
                    {suggestions.length > 0 ?
                        <View style={{ margin: wp('3%') }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                        Suggestions
                                    </Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('suggestion')}>
                                    <View>
                                        <Text style={{ marginRight: 10 }}>See All</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>

                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                {suggestions.map((item, index) => (
                                    <View style={{ padding: 10, width: wp('40%'), backgroundColor: 'white', elevation: 10, opacity: 10, borderRadius: 10, margin: wp('3%') }} key={index}>
                                        <TouchableOpacity onPress={() => removeitem(item.id)}>
                                            <View style={{ alignSelf: 'flex-end' }}>
                                                <Image source={require('../../../images/cross.png')} style={{ height: 10, width: 10 }}></Image>
                                            </View>
                                        </TouchableOpacity>
                                        <View>
                                            <Image source={{ uri: item.user_profile.profile_photo_url }} style={{ borderRadius: 40, height: 100, width: 100, alignSelf: 'center' }}></Image>
                                        </View>
                                        <View style={{ alignSelf: 'center', margin: wp('3%') }}>
                                            <Text >{item.user_info.username}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => following(item)}>
                                            <View style={{ alignSelf: 'center', backgroundColor: '#b9424d', padding: 10, borderRadius: 10 }}>
                                                <Text style={{ color: 'white' }}>Following</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        : null}


                    {timeline.length > 0 ?
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
                                            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.username}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontSize: 12 }} >{Moment(item.created).format('DD MMM YYYY')}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() =>openBottomsheet(item)}>
                                        <View>
                                            <MaterialCommunityIcons name="menu-down" size={35} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ margin: wp('4%') }}>
                                    <Text>{item.caption} </Text>
                                    {item.post_type == 'image' ?
                                        <TouchableOpacity activeOpacity={0.8}>
                                            <Image source={{ uri: item.post_upload_url }} style={{ width: wp('80%'), height: hp('40%'), borderRadius: 10 }}
                                            ></Image>
                                        </TouchableOpacity> : null}
                                    {item.post_type == 'video' ?
                                        <Video source={{ uri:  item.post_upload_url }}
                                        style={{width: wp('30%'), height: hp('20%'), borderRadius: 10}}
                                           />

                                        : null}

                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: wp('3%') }}>
                                    <TouchableOpacity onPress={() => likeapicall(item)}>
                                        <View>
                                            <Image source={require('../../../images/png/like.png')} style={{ height: 30, width: 30 }}></Image>
                                        </View>
                                        <View>
                                            <Text>Likes {item.likes.likes_count}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => doublelikepost(item)}>
                                        <View>
                                            <Image source={require('../../../images/reaction/reactions_sad.png')} style={{ height: 50, width: 50 }}></Image>
                                        </View>

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => openchat(item.id)}>
                                        <View>
                                            <MaterialCommunityIcons name="message" size={25} />

                                        </View>
                                        <View>
                                            <Text>{item.comments.comments_count}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => openshare(item)} >
                                        <View>
                                            <MaterialCommunityIcons name="share" size={25} />

                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ padding: 10 }}>
                                    <Text>{item.description}............</Text>
                                </View>

                                {chatcondition == item.id && chatstatus ?
                                    <View>
                                        <View style={{ flexDirection: 'row', marginLeft: wp('5%'), justifyContent: 'space-between' }}>
                                            <TouchableOpacity onPress={() => openProfileCover()}>
                                                <View>
                                                    <Image source={require('../../../images/splashlogo.png')} style={{ height: 40, width: 40, borderRadius: 50 }}></Image>
                                                </View>
                                            </TouchableOpacity>
                                            <View>

                                                <TextInput
                                                    // style={styles.input}
                                                    onChangeText={(e) => setMsg(e)}
                                                    value={msg}
                                                    placeholder="Enter a comments..."
                                                // keyboardType="numeric"
                                                />
                                                {/* <TextInput
                                                    style={{ borderRadius: 10 }} > </TextInput> */}
                                            </View>
                                            <TouchableOpacity onPress={() => addComment(item)}>
                                                <View>
                                                    <MaterialCommunityIcons name="email-send-outline" size={35} />
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View>
                                            <Text style={{ alignSelf: 'center' }}>Show chat list </Text>


                                            {chat.length > 0 ? chat.map((i, n) => (
                                                <View key={n} style={{ alignItems: 'center', margin: 10 }}>
                                                    <Text style={{ alignSelf: 'center' }}>{i.comments}</Text>
                                                </View>
                                            )) : null}
                                        </View>


                                    </View>

                                    : null}
                            </View>
                        )) : null}



                </ScrollView>

            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
            >
                <View>
                    <ScrollView>
                        <View style={styles.sheet}>

                            <TouchableOpacity onPress={() => alert("Post  succesfully deleted")}>
                                <View style={styles.sheetdetail}>
                                    <View>
                                        <MaterialCommunityIcons name="note" size={25} color={'#b9424d'} />
                                    </View>

                                    <View>
                                        <Text>Delete</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <View style={styles.sheetdetail}>
                                    <MaterialCommunityIcons name="note" size={25} color={'#b9424d'} />
                                    <Text>Edit</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.sheetdetail}>
                                    <MaterialCommunityIcons name="note" size={25} color={'#b9424d'} />
                                    <Text>HidePost</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View style={styles.sheetdetail}>
                                    <MaterialCommunityIcons name="note" size={25} color={'#b9424d'} />
                                    <Text>Hide Caption</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View>
            </RBSheet>
        </Provider>

    )
}
const styles = StyleSheet.create({
    sheet: {
        margin: hp('5%'), width: wp('40%')
    },
    sheetdetail: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: wp('3%')
    }

})
export default HomePage;