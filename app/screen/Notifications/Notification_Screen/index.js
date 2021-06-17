import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
const Notification_Screen = () => {
    const [notificationCondition, setNotificationCondition] = useState('activity');
    return (
        <View>
            <ScrollView>
            <Text style={{ margin: wp('5%'), fontWeight: 'bold', fontSize: 22 }}>Notifications</Text>
            <View style={{ flexDirection: 'row', width: wp('60%'), alignSelf: 'center', justifyContent: 'space-between', backgroundColor: 'gray', padding: 5, borderRadius: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => setNotificationCondition('activity')}>
                    <View style={notificationCondition == 'activity' ? { backgroundColor: 'white', padding: 5, width: wp('30%'), borderRadius: 10 } : null}>
                        <Text style={{ alignSelf: 'center' }}>Activities</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setNotificationCondition('notification')}>
                    <View style={notificationCondition == 'notification' ? { backgroundColor: 'white', padding: 5, width: wp('28%'), borderRadius: 10 } : null}>
                        <Text>Notifications</Text>
                    </View>
                </TouchableOpacity>
            </View>

            {notificationCondition == 'activity' ?
            <View>
                <View style={{flexDirection:'row',marginTop:hp('5%'),justifyContent:'space-between'}}>
                    <View style={{width:wp('20%')}}>
                        <Image source={require('../../../images/splashlogo.png')} style={{height:50,width:50}} ></Image>
                    </View>
                    <View style={{width:wp('50%'),marginTop:hp('3%')}}>
                    <View  style={{flexDirection:'row'}}>
                        <Text>Vikas Tiwari</Text>
                      <Text>commented on post</Text>
                    </View>
                    <Text>2 hours ago</Text>
                    </View>
                    <View style={{width:wp('20%'),marginTop:hp('5%'),marginLeft:wp('5%')}}>
                        <Image source={require('../../../images/splashlogo.png')} style={{height:20,width:20}}></Image>
                    </View>
                </View>
                <View style={{flexDirection:'row',marginTop:hp('5%'),justifyContent:'space-between'}}>
                    <View style={{width:wp('20%')}}>
                        <Image source={require('../../../images/splashlogo.png')}  style={{height:50,width:50}}></Image>
                    </View>
                    <View style={{width:wp('50%'),marginTop:hp('3%')}}>
                    <View  style={{flexDirection:'row'}}>
                        <Text>Vikas Tiwari</Text>
                      <Text>commented on post</Text>
                    </View>
                    <Text>2 hours ago</Text>
                    </View>
                    <View style={{width:wp('20%'),marginTop:hp('5%'),marginLeft:wp('5%')}}>
                        <Image source={require('../../../images/splashlogo.png')} style={{height:20,width:20}}></Image>
                    </View>
                </View>

                </View>
                

                : null}
            {notificationCondition == 'notification' ?
                <View>
                    <View style={{margin:wp('5%')}}>
                        <Image></Image>
                        <Text style={{fontSize:16,fontWeight:'bold'}}>Turn on notification sound</Text>
                    </View>
                    <View style={{alignSelf:'center',marginTop:hp('15%')}}>
                        <Image>

                        </Image>
                        <Text>You do not have any notifications</Text>
                        </View>
                </View>

                : null}
                </ScrollView>
        </View>

    )
}
export default Notification_Screen;