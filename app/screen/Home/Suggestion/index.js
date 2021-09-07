import React, { useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image ,ActivityIndicator} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import * as Utility from '../../../utility/index';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';

const Suggestion = () => {
    const [suggestion, setSuggestions] = useState()
    const [loader,setLoader]=useState(false)
    useEffect(() => {
        getsuggestionlist();
    }, [])
    const getsuggestionlist = async () => {

        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        var username = await Utility.getFromLocalStorge("fullName");
        var email = await Utility.getFromLocalStorge("email");
        console.log("token=123" + token)
        try {
            setLoader(true);
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
            setLoader(false);
        } catch (error) {
            console.error(error);
        }

    }
    const deletesuggestion = (item) => {
        console.log(item)
    }
    const acceptsuggestion = (item) => {
        console.log(item)
    }
    return (
        <View style={{marginBottom:hp('10%')}}>
            
            <View style={{ alignSelf: 'center', backgroundColor: '#b9424d', width: '100%', padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center', color: 'white' }}>Suggestion List</Text>
            </View>
            {loader == true ? (
          <ActivityIndicator style={{marginTop: 10}} size="large" color="red" />
        ) : null}
                <FlatList
                    data={suggestion}
                    keyExtractor={item => item.id}
                    renderItem={({ item, id }) => (
                        <View >
                        <View style={{ padding:10, margin: wp('4%'), backgroundColor: 'white', borderRadius: 10, elevation: 10, opacity: 10, marginBottom: hp('2%')}}>
                            <View style={{ flexDirection: 'row', margin: '5%' }}>
                                <Image source={{ uri: item.user_profile.profile_photo_url }} style={{ height: 100, width: 100, borderRadius: 20 }}></Image>

                                <Text style={{ marginLeft: wp('2%'), alignSelf: 'center', fontSize: 15, fontWeight: 'bold',marginLeft: 20}}>{item.user_info.username}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: wp('2%'), justifyContent: 'space-evenly', }}>
                                <TouchableOpacity onPress={() => acceptsuggestion(item.id)} >
                                    <View style={{ width: wp('25%'), backgroundColor: '#b9424d', padding: 10, alignItems: 'center', borderRadius: 10 }}>
                                        <Text style={{ color: 'white' }}>Accept</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deletesuggestion(item.id)}>
                                    <View style={{ width: wp('25%'), backgroundColor: 'gray', padding: 10, alignItems: 'center', borderRadius: 10 }}>
                                        <Text style={{ color: 'white' }}>Delete</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </View>
                    )
                    }
                />
            </View>

       
    )
}
export default Suggestion