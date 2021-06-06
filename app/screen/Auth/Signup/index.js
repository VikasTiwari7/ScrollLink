import React,{useState} from 'react';
import {View,Text, Image, TouchableOpacity, ScrollView,ActivityIndicator, Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
  import { TextInput} from 'react-native-paper';
  import * as Utility from '../../../utility/index';
import { BaseUrl } from '../../../api/url';
//   import {CheckBox} from '@react-native-community/checkbox'

const Signup =({navigation})=>{
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password,setPassword]=useState();
    const [confirmPassword,setconfirmPassword]=useState();
    const [Gender,setGender]=useState();
    const [isSelected, setSelection]  =useState(false);
    const [loader,setLoader]=useState(false)
   
const openLogin=()=>{
    navigation.navigate('Signin')
}
   
    const onRegister= async()=>{
        // navigation.navigate('Bottom')

        try{
            if (Utility.isFieldEmpty(username && email && password && confirmPassword && Gender )) {
                Alert.alert('Please Fill the all field');
              }  else {
                setLoader(true);
                let response = await fetch(
                  BaseUrl+'users/register',
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        fullname:username,
                        email:email
                    }),
                  },
                );
                let json = await response.json();
                setLoader(false)
                        console.log("new data",json);
                        if(json.id){
                            navigation.navigate('Signin')
                        }
                        else{
                            Alert.alert("Something went Wrong");
                        }

                }
        }catch(error){
            console.log(error);

        }
    }

    return(
        <View>
            <ScrollView>
            {loader == true ? (
          <ActivityIndicator style={{marginTop: 10}} size="large" color="red" />
        ) : null}
           <View style={{flexDirection:'row',justifyContent:'space-between',margin:wp('7%')}}>
               <View>
                   <Image source={require('../../../images/splashlogo.png')} ></Image>
               </View>
               <View style={{alignItems:'center',marginTop:wp('8%')}}>
               <Text style={{fontSize:20,fontWeight:'bold',color:'#b9424d'}}>ScrollLink</Text>
           </View>
               <TouchableOpacity onPress={()=>openLogin()}>
               <View style={{backgroundColor:'#b9424d',padding:5,height:hp('5%'),width:wp('20%'),borderRadius:10}}>
                   <Text style={{color:'white',alignSelf:'center'}}>Login</Text>
               </View>
               </TouchableOpacity>
             
           </View>
          
          
           <View style={{margin:wp('5%'),backgroundColor:'white',padding:10,borderRadius:10,opacity:10,elevation:10}}>
               <Text>Sign  up</Text>
               <View>
                   <Text>(Do not use space and special characters in the username.It should be aplha numerica single word)</Text>
               </View>
               <View style={{margin:wp('2%')}}>
                    <TextInput
                label="Username"
                value={username}
                onChangeText={text => setUsername(text)}
                />
                </View>
                <View style={{margin:wp('2%')}}>
                <TextInput
                label="E-mail address"
                value={email}
                onChangeText={text => setEmail(text)}
                />
                </View>
                <View style={{margin:wp('2%')}}>
                <TextInput
                label="Password"
                value={password}
                onChangeText={text => setPassword(text)}
                />
                </View>
                <View style={{margin:wp('2%')}}>
                <TextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={text => setconfirmPassword(text)}
                />
                </View>
               
                <TouchableOpacity onPress={()=>onRegister()}>
                <View style={{backgroundColor:'#b9424d',padding:10,margin:wp('3%'),borderRadius:10}}>
                <Text style={{alignSelf:'center',color:'white',fontSize:18}}>Let's Go !</Text>
                </View>
                </TouchableOpacity>
              
                
           </View>
           <View style={{flexDirection:'row',justifyContent:'center'}}>
               <View>
                   <Text>Already have an account? </Text>
               </View>
               <TouchableOpacity onPress={()=>openLogin()}>
               <View>
                   <Text style={{color:'#b9424d',textDecorationLine:'underline'}}>Login</Text>
               </View>
               </TouchableOpacity>
           </View>
       
           </ScrollView>
        </View>
    )
}
export default Signup;