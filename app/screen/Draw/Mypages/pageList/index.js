import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// import {
//     widthPercentageToDP as wp,
//     heightPercentageToDP as hp,
// } from '../../../utility/index';
import * as Utility from '../../../../utility/index';

const pageList = ({ navigation }) => {
    const [page, setPagelist] = useState([]);
    useEffect(() => {
        getPageList();
    }, [])
    const getPageList =async () => {
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        try {
            let response = await fetch(
                `http://79.133.41.198:4000/users/${userId}/getallpage`, // getCoverPic
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
        } catch (error) {
            console.log(error);
        }

    }
    const sowpageinfo=async(item)=>{
        console.log("page id is :-",item.page_id);
        await Utility.setInLocalStorge("getpageid",item.page_id)
        
        navigation.navigate('showpagedetails')

    }
 
    return (
        <View>
            <View style={{ alignSelf: 'center', backgroundColor: '#b9424d', width: '100%', padding: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20, alignSelf: 'center', color: 'white' }}>
                    My Page List
                </Text>
            </View>
            <ScrollView>
                <View>
                <FlatList
                    //   horizontal
                        data={page}
                        keyExtractor={item => item._id}
                        // numColumns={5}
                        renderItem={({ item , id}) => (
                            <TouchableOpacity onPress={()=>sowpageinfo(item)}>
                                <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>
                                <View key={id} style={{  margin:'5%',borderRadius:10 }}>
                                            <Text style={{ fontSize: 20, color: '#99003d' }}>{item.page_name}</Text>
                                </View> 
                                <View
  style={{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  }}
/>
                            </TouchableOpacity>
                        )
                        }
                        // showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
export default pageList;