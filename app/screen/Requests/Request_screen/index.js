import React from 'react';
import { ScrollView, Text, View,Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
const Request_screen =({navigation})=>{
    const openWallet =()=>{
        navigation.navigate('Profile_cover')
    }
    return(
        <View>
            <ScrollView>
            <Text style={{fontWeight:'bold',fontSize:22,margin:wp('5%')}}>Requests</Text>
            <View style={{margin:wp('5%')}}>
            <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                <TouchableOpacity onPress={()=>openWallet()}>
                <View>
                    <Image source={require('../../../images/splashlogo.png')}></Image>
                </View>
                </TouchableOpacity>
                <View style={{width:wp('60%')}}>
                    <Text style={{marginLeft:wp('2%')}}>Vikas Tiwari</Text>
                    <View style={{flexDirection:'row',marginTop:wp('2%'),justifyContent:'space-evenly',}}>
                        <TouchableOpacity >
                        <View style={{width:wp('25%'),backgroundColor:'#b9424d',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Accept</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View  style={{width:wp('25%'),backgroundColor:'gray',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Delete</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:wp('5%')}}>
            <TouchableOpacity onPress={()=>openWallet()}>
                <View>
                    <Image source={require('../../../images/splashlogo.png')}></Image>
                </View>
                </TouchableOpacity>
                <View style={{width:wp('60%')}}>
                    <Text style={{marginLeft:wp('2%')}}>Vikas Tiwari</Text>
                    <View style={{flexDirection:'row',marginTop:wp('2%'),justifyContent:'space-evenly',}}>
                        <TouchableOpacity>
                        <View style={{width:wp('25%'),backgroundColor:'#b9424d',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Accept</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View  style={{width:wp('25%'),backgroundColor:'gray',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Delete</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:wp('5%')}}>
            <TouchableOpacity onPress={()=>openWallet()}>
                <View>
                    <Image source={require('../../../images/splashlogo.png')}></Image>
                </View>
                </TouchableOpacity>
                <View style={{width:wp('60%')}}>
                    <Text style={{marginLeft:wp('2%')}}>Vikas Tiwari</Text>
                    <View style={{flexDirection:'row',marginTop:wp('2%'),justifyContent:'space-evenly',}}>
                        <TouchableOpacity>
                        <View style={{width:wp('25%'),backgroundColor:'#b9424d',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Accept</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View  style={{width:wp('25%'),backgroundColor:'gray',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Delete</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:wp('5%')}}>
            <TouchableOpacity onPress={()=>openWallet()}>
                <View>
                    <Image source={require('../../../images/splashlogo.png')}></Image>
                </View>
                </TouchableOpacity>
                <View style={{width:wp('60%')}}>
                    <Text style={{marginLeft:wp('2%')}}>Vikas Tiwari</Text>
                    <View style={{flexDirection:'row',marginTop:wp('2%'),justifyContent:'space-evenly',}}>
                        <TouchableOpacity>
                        <View style={{width:wp('25%'),backgroundColor:'#b9424d',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Accept</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View  style={{width:wp('25%'),backgroundColor:'gray',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Delete</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:wp('5%')}}>
            <TouchableOpacity onPress={()=>openWallet()}>
                <View>
                    <Image source={require('../../../images/splashlogo.png')}></Image>
                </View>
                </TouchableOpacity>
                <View style={{width:wp('60%')}}>
                    <Text style={{marginLeft:wp('2%')}}>Vikas Tiwari</Text>
                    <View style={{flexDirection:'row',marginTop:wp('2%'),justifyContent:'space-evenly',}}>
                        <TouchableOpacity>
                        <View style={{width:wp('25%'),backgroundColor:'#b9424d',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Accept</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View  style={{width:wp('25%'),backgroundColor:'gray',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Delete</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:wp('5%')}}>
            <TouchableOpacity onPress={()=>openWallet()}>
                <View>
                    <Image source={require('../../../images/splashlogo.png')}></Image>
                </View>
                </TouchableOpacity>
                <View style={{width:wp('60%')}}>
                    <Text style={{marginLeft:wp('2%')}}>Vikas Tiwari</Text>
                    <View style={{flexDirection:'row',marginTop:wp('2%'),justifyContent:'space-evenly',}}>
                        <TouchableOpacity>
                        <View style={{width:wp('25%'),backgroundColor:'#b9424d',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Accept</Text>
                        </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                        <View  style={{width:wp('25%'),backgroundColor:'gray',padding:10,alignItems:'center',borderRadius:10}}>
                            <Text style={{color:'white'}}>Delete</Text>
                        </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </View>
            </ScrollView>
        </View>

    )
}
export default Request_screen;