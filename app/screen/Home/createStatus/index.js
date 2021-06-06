import React,{useState} from 'react';
import {View,Text, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
import { TextInput} from 'react-native-paper';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    launchCamera,
    launchImageLibrary
  } from 'react-native-image-picker'

const CreateStatus=()=>{
    const [Status,setStatus]=useState();
    const [filePath, setFilePath] = useState();
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
      const onCreate1=()=>{
          if(filePath){
          Alert.alert("Post published")
          }
          else{
              Alert.alert("Please choose the file")
          }
      }
    return(
        <View>
            <ScrollView>
            <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',margin:wp('5%')}}>Create  New Status</Text>
            <View style={{margin:wp('5%')}}>
                    <TextInput
                label="What is going on"
                value={Status}
                onChangeText={text => setStatus(text)}
                style={{height:hp('15%')}}
                />
                </View>
                <View style={{margin:wp('4%')}}>
                    <Text>Media File</Text>
                </View>
                <TouchableOpacity onPress={()=>chooseFile('photo')}>
                <View style={{marginLeft:wp('7%'),flexDirection:'row'}}>
                    <View>
                    <MaterialCommunityIcons name="video" size={25} color={'#b9424d'} />
                    </View>
                    <View>
                        <Text style={{marginLeft:wp('2%')}}>Select Photos & Videos </Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onCreate1()}>
                <View style={{backgroundColor:'#b9424d',alignSelf:'center',padding:10,width:wp('25%'),marginTop:hp('5%'),borderRadius:5}}>
                    <Text style={{alignSelf:'center',color:'white'}}>Create</Text>
                </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}
export default CreateStatus;