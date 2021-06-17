import React from 'react';
import { Text, View ,TouchableOpacity,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
const Mygroups=()=>{
    return(
<View>
    <ScrollView>
    <View style={{margin:wp('5%')}}>
    <Text style={{fontWeight:'bold',fontSize:22}}>My Groups</Text>
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <TouchableOpacity>
      <View style={{margin:wp('2%'),backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
          <Text style={{color:'white'}}>My Groups</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={{margin:wp('2%'),backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
          <Text style={{color:'white'}}>Suggested Group</Text>
      </View>
      </TouchableOpacity>
      <TouchableOpacity>
      <View style={{margin:wp('2%'),backgroundColor:'#b9424d',padding:10,borderRadius:10}}>
          <Text style={{color:'white'}}>Joined Group</Text>
      </View>
      </TouchableOpacity>
      
     
      </ScrollView>
      <View style={{alignSelf:'center',margin:wp('5%')}}>
          <View>
          <Image source={require('../../../images/png/albums.png')} style={{height:100,width:100,alignSelf:'center'}}></Image>
          </View>
          <View>
              <Text>No groups to show </Text>
          </View>
          <TouchableOpacity>
          <View style={{backgroundColor:'#b9424d',margin:wp('5%'),padding:10,alignItems:'center',borderRadius:10}}>
              <Text style={{color:'white'}}>Create</Text>
              </View>
              </TouchableOpacity>
      </View>
    </ScrollView>
</View>
    )
}
export default Mygroups;