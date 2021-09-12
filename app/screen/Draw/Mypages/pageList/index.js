import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image,ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from '../../../utility/index';
import * as Utility from '../../../../utility/index';

const pageList = ({ navigation }) => {
    const [page, setPagelist] = useState([]);
    const [loader,setLoader]=useState(false)
    useEffect(() => {
        getPageList();
    }, [])
    const getPageList = async () => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        try {
            setLoader(true)
            let response = await fetch(
                `http://79.133.41.198:81/users/${userId}/getallpage`, // getCoverPic
                {
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + token,
                    }
                }
            )
            let json = await response.json();
            setPagelist(json);
            console.log(json);
            setLoader(false)
        } catch (error) {
            console.log(error);
        }

    }
    const sowpageinfo = async (item) => {
        // console.log("page id is :-", item.page_id);
        // await Utility.setInLocalStorge("getpageid", item.page_id)
        navigation.navigate('showpagedetails',{
            page_id:{
                pageId:item.page_id
            }})

    }

    return (
        <View>
            <View style={{ alignSelf: 'center', backgroundColor: '#b9424d', width: '100%', padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center', color: 'white' }}>
                    My Page List
                </Text>
            </View>
            {loader == true ? (
          <ActivityIndicator style={{marginTop: 10}} size="large" color="red" />
        ) : null}
                <View>
                    {page.length > 0 ?
                        <FlatList
                            //   horizontal
                            data={page}
                            keyExtractor={item => item.page_id}
                            // numColumns={5}
                            renderItem={({ item, id }) => (
                                <View>
                                    <View
                                        style={{
                                            borderBottomColor: 'black',
                                            borderBottomWidth: 1,
                                        }}
                                    />
                                    <View key={id} style={{ margin: '2%', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                        <TouchableOpacity onPress={() => navigation.navigate('Profile_cover')}>
                                            <View>
                                                <Image source={{ uri: item.page_profile_pic_url }} style={{ height: 50, width: 50, borderRadius: 50 }}></Image>
                                            </View>
                                        </TouchableOpacity>
                                        <View style={{ alignSelf: 'center' }}>
                                            <Text style={{ fontSize: 20, color: '#99003d', alignSelf: 'center', fontWeight: 'bold' }}>{item.page_name}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => sowpageinfo(item)}>
                                            <View style={{
                                                backgroundColor: '#99003d', padding
                                                    : 8, alignSelf: 'center', borderRadius: 10, marginTop: 10
                                            }}>
                                                <Text style={{ color: 'white' }}>Read</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            borderBottomColor: 'black',
                                            borderBottomWidth: 1,
                                        }}
                                    />
                                </View>
                            )
                            }
                        // showsHorizontalScrollIndicator={false}
                        /> :
                        <View style={{alignSelf:'center'}}>
                            <Text style={{fontWeight:'900',fontSize:20}}>No Page Found</Text>
                        </View>

                    }
                </View>
      
        </View>
    )
}
export default pageList;