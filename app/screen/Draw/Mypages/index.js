import React, { useEffect,useState } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
import * as Utility from '../../../utility/index';

const Mypages = ({navigation}) => {
    const [pagelist,setPagelist]=useState([]);
    useEffect(()=>{
    },[]);
    
    const createPage= async()=>{
            var userId = await Utility.getFromLocalStorge("userId");
            console.log(userId);
            var token = await Utility.getFromLocalStorge("JWT");
            console.log(token);
            try {
              let response = await fetch(
                `http://79.133.41.198:81/users/${userId}/createpage`,
                {
                  method: "GET",
                  headers: {
                    Authorization: 'Bearer ' + token,
                  }
                }
              )
              let json = await response.json();
              console.log(json.page_id);
              var postId=json.page_id;
           
            //   console.log("new post id",postId)
            //   await Utility.setInLocalStorge('pageId',postId);
              if(postId){
                  navigation.navigate('updatepagemedia',{
                    page_id:{
                        pageId:postId
                    }});
              }
          }
          catch(error){
            console.log(error);
          }
        }
   
            const openMypageList=()=>{
                navigation.navigate('pagelist');
            }
    return (
        <View>
            <ScrollView>
                <View style={{ margin: wp('5%') }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 22 }}>My Page</Text>
                </View>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <TouchableOpacity onPress={()=>openMypageList()}>
                        <View style={{ margin: wp('2%'), backgroundColor: '#b9424d', padding: 10, borderRadius: 10 }}>
                            <Text style={{ color: 'white' }}>My Pages</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ margin: wp('2%'), backgroundColor: '#b9424d', padding: 10, borderRadius: 10 }}>
                            <Text style={{ color: 'white' }}>Suggested Group</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={{ margin: wp('2%'), backgroundColor: '#b9424d', padding: 10, borderRadius: 10 }}>
                            <Text style={{ color: 'white' }}>Joined Group</Text>
                        </View>
                    </TouchableOpacity>


                </ScrollView>
                <View style={{ alignSelf: 'center', margin: wp('5%') }}>
                    <View>
                        <Image source={require('../../../images/png/albums.png')} style={{ height: 100, width: 100, alignSelf: 'center' }}></Image>
                    </View>
                    <View>
                      
                    </View>
                    <TouchableOpacity onPress={()=>createPage()}>
                        <View style={{ backgroundColor: '#b9424d', margin: wp('5%'), padding: 10, alignItems: 'center', borderRadius: 10 }}>
                            <Text style={{ color: 'white' }}>Create</Text>
                        </View>
                    </TouchableOpacity>
                </View>
              
            </ScrollView>

        </View>
    )
}
export default Mypages;