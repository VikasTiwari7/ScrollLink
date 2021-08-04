import React,{useState} from 'react';
import { Text,View,Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { heightPercentageToDP } from '../../../../utility';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../../utility/index';
import * as Utility from '../../../../utility/index';
const showPage=({navigation})=>{
    // const [postid,setPostid]=useState();

    const [pagepostfile,setPagepostfile]=useState();
    const openpagepost=async()=>{
        var userId = await Utility.getFromLocalStorge("userId");
        var token = await Utility.getFromLocalStorge("JWT");
        let pageId=await Utility.getFromLocalStorge('pageId');
        try {
          let response = await fetch(
            `http://79.133.41.198:4000/users/${userId}/${pageId}/createpost`, // getCoverPic
            {
              method: "GET",
              headers: {
                Authorization: 'Bearer ' + token,
              }
            }
          )
          let json = await response.json();
          console.log(json);
         var  postId=json.post_id;
          console.log("new post id",postId)
          await Utility.setInLocalStorge('pagepostId',postId);
          if(postId){
            navigation.navigate('pagepost');
          }
      }
      catch(error){
        console.log(error);
      }
        
    }
    
    return(
        <View>
            <Text> Vikas </Text>
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                <View style={{backgroundColor:'white'}}>
                    <Text>Overview</Text>
                </View>
                
                <View style={{backgroundColor:'white'}}>
                    <Text>Overview</Text>
                </View>
                
                <View style={{backgroundColor:'white'}}>
                    <Text>Overview</Text>
                </View>
            </View>
            <ScrollView>
            <View>
                <View>
                <Image source={require('../../../../images/png/albums.png')} style={{height:hp('25%'),width:wp('90%'),alignSelf:'center',margin:wp('5%')}}>
                </Image>
                </View>
            </View>
            <View style={{flexDirection:'row'}}>
                <View>
                <Image source={require('../../../../images/png/albums.png')} style={{borderRadius:50,height:50,width:50}} ></Image>
                </View>
                <View>
                    <Text>Vikas</Text>
                    <Text>Create page @username</Text>
                </View>
            </View>
            </ScrollView>
            <TouchableOpacity onPress={()=>openpagepost()}>
            <View style={{padding:10,backgroundColor:'blue',margin:wp('5%'),alignSelf:'center'}}>
                <Text style={{color:'white',alignSelf:'center'}}>Create Post</Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}
export default showPage;