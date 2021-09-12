import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Utility from '../../../utility/index';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
const Search = ({navigation}) => {
    const [userName, setUserName] = useState();
    const [searcharray, setSearcharray] = useState([]);
    const searchValue = async () => {
        var token = await Utility.getFromLocalStorge("JWT");
        console.log("token=123" + token)
        try {
            let response = await fetch(
                `http://79.133.41.198:81/search/user?id=${userName}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            )
            let json = await response.json();
            setSearcharray(json)
            console.log(json);
        } catch (error) {
            console.error(error);
        }
    }
    const openProfile=(item)=>{
        console.log("Navigation profile ???",item);
        navigation.navigate('Profile_cover',{
            user_id:{
                userId:item.id
            }
        })

    }
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#b9424d', borderBottomEndRadius: 10 }}>
                <View style={{ margin: '3%' }}>
                    <TouchableOpacity activeOpacity={1} onPress={()=>navigation.navigate('drawer')}>
                        <Image source={require('../../../images/back.png')} style={{ height: 30, width: 30 }}></Image>
                    </TouchableOpacity>
                </View>
                <View>
                    <TextInput placeholder="Search more.." placeholderTextColor="#b9424d" style={{fontSize: 15,fontWeight: 'bold' }}
                        onChangeText={(data) => setUserName(data)}
                    ></TextInput>
                </View>
                <View style={{ margin: '3%' }}>
                    <TouchableOpacity activeOpacity={1} onPress={() => searchValue()}>
                        <Image source={require('../../../images/tickBlue.png')} style={{ height: 30, width: 30 }}></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {searcharray.length > 0 ?
                    searcharray.map((item, index) => (
                        <View key={index}>
                            <TouchableOpacity onPress={()=>openProfile(item)}>
                                <View style={{ margin: wp('5%'), flexDirection: 'row', justifyContent: 'space-evenly', backgroundColor: 'gray', padding: 10, borderRadius: 10 }}>
                                    <View>
                                        <Image source={{ uri: item.user_profile.profile_photo_url }} style={{ height: 50, width: 50 }}></Image>
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={{ color: 'white', fontSize: 20 }}>{item.user_info.username}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ))
                 
                    :
                <View style={{margin:wp('5%'),alignSelf:'center'}}>
                        <Text>Sorry this user not present</Text>
                    </View>

                }
            </View>
        </View>
    )
}
export default Search;