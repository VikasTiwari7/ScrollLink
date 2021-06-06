import React from 'react';
import { useEffect } from 'react';
import {View,Text,Image} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from '../../../utility/index';
  import * as Utility from "../../../utility/index"
const Splash =({navigation})=>{
    useEffect(() => {
        const timeoutHandle = setTimeout(() => {
          retrieveData();
        }, 2000);
      });
      const retrieveData = async () => {
        let userId = await Utility.getFromLocalStorge("userId")
        if (userId !== null) {
          return                             navigation.navigate('drawer')

        }
        else {
          navigation.navigate("Signin")
        }
      };
    return(
        <View>
            <View style={{alignItems:'center',marginTop:hp('40%')}}>
                <Image source={require('../../../images/img/logo.png')} ></Image>
            </View>
            <View style={{alignSelf:'center'}}>
              <Text style={{fontSize:22,fontWeight:'bold'}}>ScrollLink</Text>
            </View>
        </View>
    )
}
export default Splash;