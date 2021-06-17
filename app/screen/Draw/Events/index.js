import * as React from 'react';

import {View,Text, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const Events = () => (
    
    <View>
        <View style={{margin:wp('5%')}}>
            <Text style={{fontSize:22,fontWeight:'bold'}}>Events</Text>
        </View>
  <Card style={{margin:wp('5%')}}>
    <Card.Content>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
      <View style={{margin:wp('2%'),backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
          <Text style={{color:'white'}}>My Events</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={{margin:wp('2%'),backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
          <Text style={{color:'white'}}>Browser Events</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={{margin:wp('2%'),backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
          <Text style={{color:'white'}}>Events Going</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={{margin:wp('2%'),backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
          <Text style={{color:'white'}}>Invited</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={{margin:wp('2%'),backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
          <Text style={{color:'white'}}>Event Interested</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={{margin:wp('2%'),backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
          <Text style={{color:'white'}}>Past Events</Text>
      </View>
      </TouchableOpacity>
     
      </ScrollView>
     
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{margin:wp('5%'),borderRadius:10}} />
    <Card.Content>
        <Title>11-06-2021</Title>
      <Title>Online Vastu Class</Title>
     
    </Card.Content>
    <Card.Actions style={{flexDirection:'row',justifyContent:'space-evenly'}}>
        
      <Button onPress={()=>alert("vikas")}>Online</Button>
      <Button style={{backgroundColor:'red',width:wp('30%'),padding:4,}} onPress={()=>alert("Go")}>
          <Text style={{color:'white'}}>Go</Text></Button>
    </Card.Actions>
  </Card>
  </View>
);
export default Events;