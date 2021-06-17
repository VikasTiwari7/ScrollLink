import React from 'react';
import { Text, View,Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../../../utility/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Popularpost=({navigation})=>{
    return(
        <View>
            <ScrollView>
                <View style={{margin:wp('5%')}}>
            <Text style={{fontSize:22,fontWeight:'bold'}}>Popular post</Text>
            </View>

            <View style={{padding:5,margin:wp('4%'),backgroundColor:'white',borderRadius:10,elevation:10,opacity:10}}>
               
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                        <View>
                            <Image  source={require('../../../images/splashlogo.png')} style={{height:40,width:40,borderRadius:50}}></Image>
                        </View>
                        <View>
                            <Text>Vikas Tiwari</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12}}>6 hours ago .</Text>
                                <Text style={{fontSize:10}}>Translate</Text>
                            </View>

                        </View>
                        <View>
                        <MaterialCommunityIcons name="menu-down" size={35} />
                        </View>

                    </View>
                    <View style={{margin:wp('5%')}} >
                        <Text>Real test here jhfsjfjfjf
                            dsggjdgjg
                            sdghgdfjg
                            sjhgjfj
                            dvjfdjsfjrfjhf
                            vbjhfjsgfhgvkasgkgrgkf
                            erkgjkgkjgkjgkjgsd
                            gvfvgj
                            fvvfvvshahfvkhfvkaghkfsdfgvka
                            smvfjvnsavnmgfhvmnafvcjfhdhsvavds
                            dvmnavjfdhakjwegvhgjnadkjgfkjggkakflegakhgf
                            ane ghjkegbavvfjghfjnkjguaeljcgacnbklhwe
                            wdgkjgdbwkho
                        </Text>
                       <Image source={require('../../../images/d-cover.jpg')} style={{width:wp('80%'),borderRadius:10}}></Image>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View>
                        <MaterialCommunityIcons name="hand-heart" size={25} />
                        </View>
                        <View>
                        <MaterialCommunityIcons name="message" size={25} />

                        </View>
                        <View>
                        <MaterialCommunityIcons name="share" size={25} />

                        </View>
                    </View>
        


                </View>
                <View style={{padding:5,margin:wp('4%'),backgroundColor:'white',borderRadius:10,elevation:10,opacity:10}}>
               
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                        <View>
                            <Image  source={require('../../../images/splashlogo.png')} style={{height:40,width:40,borderRadius:50}}></Image>
                        </View>
                        <View>
                            <Text>Vikas Tiwari</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12}}>6 hours ago .</Text>
                                <Text style={{fontSize:10}}>Translate</Text>
                            </View>

                        </View>
                        <View>
                        <MaterialCommunityIcons name="menu-down" size={35} />
                        </View>

                    </View>
                    <View style={{margin:wp('5%')}} >
                        <Text>Real test here jhfsjfjfjf
                            dsggjdgjg
                            sdghgdfjg
                            sjhgjfj
                            dvjfdjsfjrfjhf
                            vbjhfjsgfhgvkasgkgrgkf
                            erkgjkgkjgkjgkjgsd
                            gvfvgj
                            fvvfvvshahfvkhfvkaghkfsdfgvka
                            smvfjvnsavnmgfhvmnafvcjfhdhsvavds
                            dvmnavjfdhakjwegvhgjnadkjgfkjggkakflegakhgf
                            ane ghjkegbavvfjghfjnkjguaeljcgacnbklhwe
                            wdgkjgdbwkho
                        </Text>
                       <Image source={require('../../../images/d-cover.jpg')} style={{width:wp('80%'),borderRadius:10}}></Image>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View>
                        <MaterialCommunityIcons name="hand-heart" size={25} />
                        </View>
                        <View>
                        <MaterialCommunityIcons name="message" size={25} />

                        </View>
                        <View>
                        <MaterialCommunityIcons name="share" size={25} />

                        </View>
                    </View>
        


                </View>
                <View style={{padding:5,margin:wp('4%'),backgroundColor:'white',borderRadius:10,elevation:10,opacity:10}}>
               
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                        <View>
                            <Image  source={require('../../../images/splashlogo.png')} style={{height:40,width:40,borderRadius:50}}></Image>
                        </View>
                        <View>
                            <Text>Vikas Tiwari</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12}}>6 hours ago .</Text>
                                <Text style={{fontSize:10}}>Translate</Text>
                            </View>

                        </View>
                        <View>
                        <MaterialCommunityIcons name="menu-down" size={35} />
                        </View>

                    </View>
                    <View style={{margin:wp('5%')}} >
                        <Text>Real test here jhfsjfjfjf
                            dsggjdgjg
                            sdghgdfjg
                            sjhgjfj
                            dvjfdjsfjrfjhf
                            vbjhfjsgfhgvkasgkgrgkf
                            erkgjkgkjgkjgkjgsd
                            gvfvgj
                            fvvfvvshahfvkhfvkaghkfsdfgvka
                            smvfjvnsavnmgfhvmnafvcjfhdhsvavds
                            dvmnavjfdhakjwegvhgjnadkjgfkjggkakflegakhgf
                            ane ghjkegbavvfjghfjnkjguaeljcgacnbklhwe
                            wdgkjgdbwkho
                        </Text>
                       <Image source={require('../../../images/d-cover.jpg')} style={{width:wp('80%'),borderRadius:10}}></Image>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View>
                        <MaterialCommunityIcons name="hand-heart" size={25} />
                        </View>
                        <View>
                        <MaterialCommunityIcons name="message" size={25} />

                        </View>
                        <View>
                        <MaterialCommunityIcons name="share" size={25} />

                        </View>
                    </View>
        


                </View>
                <View style={{padding:5,margin:wp('4%'),backgroundColor:'white',borderRadius:10,elevation:10,opacity:10}}>
               
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                        <View>
                            <Image  source={require('../../../images/splashlogo.png')} style={{height:40,width:40,borderRadius:50}}></Image>
                        </View>
                        <View>
                            <Text>Vikas Tiwari</Text>
                            <View style={{flexDirection:'row'}}>
                                <Text style={{fontSize:12}}>6 hours ago .</Text>
                                <Text style={{fontSize:10}}>Translate</Text>
                            </View>

                        </View>
                        <View>
                        <MaterialCommunityIcons name="menu-down" size={35} />
                        </View>

                    </View>
                    <View style={{margin:wp('5%')}} >
                        <Text>Real test here jhfsjfjfjf
                            dsggjdgjg
                            sdghgdfjg
                            sjhgjfj
                            dvjfdjsfjrfjhf
                            vbjhfjsgfhgvkasgkgrgkf
                            erkgjkgkjgkjgkjgsd
                            gvfvgj
                            fvvfvvshahfvkhfvkaghkfsdfgvka
                            smvfjvnsavnmgfhvmnafvcjfhdhsvavds
                            dvmnavjfdhakjwegvhgjnadkjgfkjggkakflegakhgf
                            ane ghjkegbavvfjghfjnkjguaeljcgacnbklhwe
                            wdgkjgdbwkho
                        </Text>
                       <Image source={require('../../../images/d-cover.jpg')} style={{width:wp('80%'),borderRadius:10}}></Image>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View>
                        <MaterialCommunityIcons name="hand-heart" size={25} />
                        </View>
                        <View>
                        <MaterialCommunityIcons name="message" size={25} />

                        </View>
                        <View>
                        <MaterialCommunityIcons name="share" size={25} />

                        </View>
                    </View>
        


                </View>
                
                

            </ScrollView>
        </View>
    )
}
export default Popularpost;