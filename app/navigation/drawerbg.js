import React from 'react';
import {View,Text, Image} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../utility/index';
const Drawerbg=({navigation})=>{
    return(
        <View>
           <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={()=>navigation.navigate('drawerbg')}>
            <View style={{flexDirection:'row',margin:wp('5%'),width:wp('70%'),justifyContent:'space-evenly'}}>
                <View style={{width:wp('20%')}}>
                <Image source={require('../images/png/newspaper.png')} style={{height:30,width:30}}></Image>
                </View>
                <View style={{width:wp('40%')}}>
                <Text style={{fontSize:17,fontWeight:'900'}}>News Feed</Text>
                </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Albumn')}>
            <View style={{flexDirection:'row',margin:wp('5%'),width:wp('70%'),justifyContent:'space-evenly'}}>
                <View style={{width:wp('20%')}}>
                <Image source={require('../images/png/newspaper.png')} style={{height:30,width:30}}></Image>
                </View>
                <View style={{width:wp('40%')}}>
                <Text style={{fontSize:17,fontWeight:'900'}}>Albumn</Text>
                </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Savedpost')}>
            <View style={{flexDirection:'row',margin:wp('5%'),width:wp('70%'),justifyContent:'space-evenly'}}>
                <View style={{width:wp('20%')}}>
                <Image source={require('../images/png/newspaper.png')} style={{height:30,width:30}}></Image>
                </View>
                <View style={{width:wp('40%')}}>
                <Text style={{fontSize:17,fontWeight:'900'}}>Saved Posts</Text>
                </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Event')}>
            <View style={{flexDirection:'row',margin:wp('5%'),width:wp('70%'),justifyContent:'space-evenly'}}>
                <View style={{width:wp('20%')}}>
                <Image source={require('../images/png/newspaper.png')} style={{height:30,width:30}}></Image>
                </View>
                <View style={{width:wp('40%')}}>
                <Text style={{fontSize:17,fontWeight:'900'}}>Events</Text>
                </View>
            </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>navigation.navigate('Mygroups')} >
            <View style={{flexDirection:'row',margin:wp('5%'),width:wp('70%'),justifyContent:'space-evenly'}}>
                <View style={{width:wp('20%')}}>
                <Image source={require('../images/png/newspaper.png')} style={{height:30,width:30}}></Image>
                </View>
                <View style={{width:wp('40%')}}>
                <Text style={{fontSize:17,fontWeight:'900'}}>MY Groups</Text>
                </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Mypages')}>
            <View style={{flexDirection:'row',margin:wp('5%'),width:wp('70%'),justifyContent:'space-evenly'}}>
                <View style={{width:wp('20%')}}>
                <Image source={require('../images/png/newspaper.png')} style={{height:30,width:30}}></Image>
                </View>
                <View style={{width:wp('40%')}}>
                <Text style={{fontSize:17,fontWeight:'900'}}>My Pages</Text>
                </View>
            </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Popularpost')} >
            <View style={{flexDirection:'row',margin:wp('5%'),width:wp('70%'),justifyContent:'space-evenly'}}>
                <View style={{width:wp('20%')}}>
                <Image source={require('../images/png/newspaper.png')} style={{height:30,width:30}}></Image>
                </View>
                <View style={{width:wp('40%')}}>
                <Text style={{fontSize:17,fontWeight:'900'}}>Popular Posts</Text>
                </View>
            </View>
            </TouchableOpacity>

            
            </ScrollView>
        </View>
    )
}
export default Drawerbg;