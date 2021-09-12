import React,{useEffect, useState} from 'react';
import {View,Text, Image, TouchableOpacity,ActivityIndicator,Alert} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
  import * as Utility from '../../../utility/index';
  import { TextInput } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import * as api from '../../../api/url';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import DeviceInfo from 'react-native-device-info';

import {getManufacturer} from 'react-native-device-info';



const Signin =({navigation})=>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loader,setLoader]=useState(false)
    const [users,setusers]=useState();
    const [asyncDeviceInfo, setAsyncDeviceInfo] = useState({});
    const [devicebasicinfo,setDevicebasicinfo]=useState();
    // const DeviceInfo = NativeModules.DeviceInfo;
    const openRegister=()=>{
        navigation.navigate('Signup')
    }
    useEffect(()=>{
        GoogleSignin.configure({
            webClientId: '453342997420-sj4qv0hlek702tnttevb4fetqtnjlpgg.apps.googleusercontent.com', 
            offlineAccess: true, 
            hostedDomain: '', 
            forceConsentPrompt: true, 
          });
          // getDataAsync();
    })
  
    const getDataAsync = async () => {
        let deviceJSON = {};
        try {
          deviceJSON.manufacturer = await getManufacturer();
          deviceJSON.buildId = await DeviceInfo.getBuildId();
          deviceJSON.isCameraPresent = 
            await DeviceInfo.isCameraPresent();
          deviceJSON.deviceName = await DeviceInfo.getDeviceName();
          deviceJSON.usedMemory = await DeviceInfo.getUsedMemory();
          deviceJSON.userAgent = await DeviceInfo.getUserAgent();
          deviceJSON.instanceId = await DeviceInfo.getInstanceId();
          deviceJSON.installReferrer = 
            await DeviceInfo.getInstallReferrer();
          deviceJSON.installerPackageName = 
            await DeviceInfo.getInstallerPackageName();
          deviceJSON.isEmulator = await DeviceInfo.isEmulator();
          deviceJSON.fontScale = await DeviceInfo.getFontScale();
          deviceJSON.hasNotch = await DeviceInfo.hasNotch();
          deviceJSON.firstInstallTime = 
            await DeviceInfo.getFirstInstallTime();
          deviceJSON.lastUpdateTime = 
            await DeviceInfo.getLastUpdateTime();
          deviceJSON.serialNumber = 
            await DeviceInfo.getSerialNumber();
          deviceJSON.androidId = await DeviceInfo.getAndroidId();
          deviceJSON.IpAddress = await DeviceInfo.getIpAddress();
       
          deviceJSON.MacAddress = await DeviceInfo.getMacAddress();
      
          deviceJSON.phoneNumber = await DeviceInfo.getPhoneNumber();
          deviceJSON.ApiLevel = await DeviceInfo.getApiLevel();
          deviceJSON.carrier = await DeviceInfo.getCarrier();
          deviceJSON.totalMemory = await DeviceInfo.getTotalMemory();
          deviceJSON.maxMemory = await DeviceInfo.getMaxMemory();
          deviceJSON.totalDiskCapacity = 
            await DeviceInfo.getTotalDiskCapacity();
          deviceJSON.totalDiskCapacityOld = 
            await DeviceInfo.getTotalDiskCapacityOld();
          deviceJSON.freeDiskStorage = 
            await DeviceInfo.getFreeDiskStorage();
          deviceJSON.freeDiskStorageOld = 
            await DeviceInfo.getFreeDiskStorageOld();
          deviceJSON.batteryLevel = await DeviceInfo.getBatteryLevel();
          deviceJSON.isLandscape = await DeviceInfo.isLandscape();
          deviceJSON.isAirplaneMode = await DeviceInfo.isAirplaneMode();
          deviceJSON.isBatteryCharging = 
            await DeviceInfo.isBatteryCharging();
          deviceJSON.isPinOrFingerprintSet = 
            await DeviceInfo.isPinOrFingerprintSet();
          deviceJSON.supportedAbis = await DeviceInfo.supportedAbis();
          deviceJSON.hasSystemFeature = 
            await DeviceInfo.hasSystemFeature(
              'android.software.webview',
            );
          
          try {
            deviceJSON.deviceToken = await DeviceInfo.getDeviceToken();
          } catch (e) {
            
          }
        } catch (e) {
          console.log('Trouble getting device info ', e);
        }
        console.log(deviceJSON);
        setDevicebasicinfo(devicebasicinfo);
    }

    const onLogin= async()=>{
        try{
            if (Utility.isFieldEmpty(email && password )) {
                Alert.alert('Please Fill the all field');
              }  else {
                setLoader(true);
                let response = await fetch(
                  api.BaseUrl+'/users/authenticate',
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: email,
                        password: password,
                        // basicinfo:devicebasicinfo
                    }),
                  },
                );
                let json = await response.json();
                
                setLoader(false);
                        console.log("new data",json);
                        if(json.id){
                            await Utility.setInLocalStorge("userId", json.id)
                            await Utility.setInLocalStorge("email", json.email)
                            await Utility.setInLocalStorge("fullName", json.fullname)
                            await Utility.setInLocalStorge("JWT",json.jwtToken)
                            navigation.navigate('drawer')
                        }
                        else{
                            Alert.alert("Something went Wrong");
                        }
                     

                }
        }catch(error){
            console.log(error);

        }
    }
    const _signIn=async()=>{
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            // this.setState();
            setusers(userInfo);
            console.log("user data",userInfo);
          } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            } else if (error.code === statusCodes.IN_PROGRESS) {
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            } else {
            }
          }
    }
    const openForgot=()=>{
        navigation.navigate('forgotscreen');
    }
    return(
        <View style={{flex:1}}>
            <ScrollView>
            {loader == true ? (
          <ActivityIndicator style={{marginTop: 10}} size="large" color="red" />
        ) : null}
           
           <View style={{flexDirection:'row',justifyContent:'space-between',margin:wp('7%')}}>
               <View>
                   <Image source={require('../../../images/img/icon.png')}  style={{opacity:10}} ></Image>
               </View>
               <View style={{alignItems:'center',marginTop:wp('8%')}}>
               <Text style={{fontSize:20,fontWeight:'bold',color:'#b9424d'}}>ScrollLink</Text>
           </View>
               <TouchableOpacity onPress={()=>openRegister()}>
               <View style={{backgroundColor:'#b9424d',padding:5,height:hp('5%'),width:wp('20%'),borderRadius:10}}>
                   <Text style={{color:'white',alignSelf:'center'}}>Register</Text>
               </View>
               </TouchableOpacity>
           </View>
           
           <View style={{margin:wp('5%')}}>
               <Text>
                   Share What's new and life moments with your friends.
               </Text>
           </View>
           <View style={{margin:wp('5%'),backgroundColor:'white',padding:10,borderRadius:10,opacity:10,elevation:10}}>
               <Text>Welcome!</Text>
               <View style={{margin:wp('5%')}}>
                    <TextInput
                label="Username"
                value={email}
                onChangeText={text => setEmail(text)}
                />
                </View>
                <View style={{margin:wp('5%')}}>
                <TextInput
                label="Password"
                value={password}
                secureTextEntry={true}
                right={<TextInput.Icon name="quora"   onPress={()=>openForgot()}/>}
                onChangeText={text => setPassword(text)}
                />
                </View>
                <TouchableOpacity onPress={()=>onLogin()}>
                <View style={{backgroundColor:'#b9424d',padding:10,margin:wp('3%'),borderRadius:10}}>
                <Text style={{alignSelf:'center',color:'white',fontSize:18}}>Login</Text>
                </View>
                </TouchableOpacity>
                <View style={{alignItems:'center'}}>
                    <Text>OR</Text>
                </View>

                <View style={{alignSelf:'center'}}>
                <GoogleSigninButton
                  style={{ width: 192, height: 48 }}
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={_signIn}
                //   disabled={this.state.isSigninInProgress} 
                  />
                </View>
                
           </View>
           <View style={{flexDirection:'row',justifyContent:'center',marginBottom:hp('5%')}}>
               <View>
                   <Text>Don't have an account? </Text>
               </View>
               <TouchableOpacity onPress={()=>openRegister()}>
               <View>
                   <Text style={{color:'#b9424d',textDecorationLine:'underline'}}>Register</Text>
               </View>
               </TouchableOpacity>
           </View>
           {/* <View style={{alignItems:'center'}}>
               <Text>Trending !</Text>

           </View> */}
            </ScrollView>
        </View>
    )
}
export default Signin;