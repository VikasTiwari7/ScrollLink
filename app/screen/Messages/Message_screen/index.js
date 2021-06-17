import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
const Message_screen = ({navigation}) => {
    return (
        <View>
            <ScrollView>
                <View style={{margin:wp('5%')}}>
                    <Text style={{fontSize:22,fontWeight:'bold'}}>Messages</Text>
                </View>
                <View>
                    <View style={{alignSelf:'center',margin:wp('5%')}}>
                        <Image source={require('../../../images/png/medal.png')}></Image>
                    </View>
                    <View style={{alignSelf:'center'}}>
                        <Text>No more message</Text>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}
export default Message_screen;