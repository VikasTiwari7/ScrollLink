import React from 'react';
import Splash from '../screen/Auth/Splash';
import Signin from '../screen/Auth/Signin';
import Signup from '../screen/Auth/Signup';
import Home_screen from '../screen/Home/Home_page';
import Others_Profile from '../screen/Home/Others_profile';
import Message_screen from '../screen/Messages/Message_screen';
import Notification_Screen from '../screen/Notifications/Notification_Screen';
import Profile_screen from '../screen/Profile/Profile_screen';
// import Request_screen from '../screen/Requests/Request_screen';
import Bottomtab from './Bottomtab';
import { createStackNavigator } from '@react-navigation/stack';
import Profile_Cover from '../screen/Profile/Profile_cover';
import Profile_General_Setting from '../screen/Profile/Profile_General_Setting';
import Profile_Activity from '../screen/Profile/Profile_Activity';
import Profile_Pokes from '../screen/Profile/Profile_Pokes';
import Profile_Points from '../screen/Profile/Profile_points';
import Profile_Wallet from '../screen/Profile/Profile_Wallet';
import Profile_Privacy_setting from '../screen/Profile/Profile_Privacy_Setting';
import CreateStatus from '../screen/Home/createStatus/index';
import publishPost from '../screen/Home/publishPost';
import drawer from './drawer';
import Albumn from '../screen/Draw/Albums';
import Drawerbg from './drawerbg';
import Newsfeed from '../screen/Draw/newFeed/index';
import Event from '../screen/Draw/Events';
import Mygroups from '../screen/Draw/Mygroups';
import Mypages from '../screen/Draw/Mypages';
import Popularpost from '../screen/Draw/Popularpost';
import Savedpost from '../screen/Draw/Savedpost';
import Newpost from '../screen/Home/publishPost/newPost';
import createPage from '../screen/Draw/Mypages/Createpage';
import updatePagemedia from '../screen/Draw/Mypages/UpdatepageImage';
import showpagedetails from '../screen/Draw/Mypages/showpage/index';
import Pagepost from '../screen/Draw/Mypages/Pagepost/index';
import pageList from '../screen/Draw/Mypages/pageList';
import suggestion from '../screen/Home/Suggestion';
import Videoscreen  from '../screen/Home/Videoscreen';
const Stack = createStackNavigator();
const Stacks=()=>{
return (
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{headerShown:false}} />
        <Stack.Screen name="Signin" component={Signin} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>
        <Stack.Screen name ="Bottom" component={Bottomtab} options={{headerShown:false}}/>
        <Stack.Screen name="Home_screen" component={Home_screen} options={{headerShown:false}} />
        <Stack.Screen name="Others_Profile" component={Others_Profile} options={{headerShown:false}}/>
        <Stack.Screen name="Message_screen" component={Message_screen} options={{headerShown:false}}/>
        <Stack.Screen name="Notification_Screen" component={Notification_Screen} options={{headerShown:false}} />
        <Stack.Screen name="Profile_screen" component={Profile_screen} options={{headerShown:false}}/>
        <Stack.Screen name ="Profile_cover" component ={Profile_Cover} options={{headerShown:false}}/>
        <Stack.Screen name ="ProfileGeneralSetting" component={Profile_General_Setting} options={{headerShown:false}}/>
        <Stack.Screen name ="ProfileActivity" component={Profile_Activity} options={{headerShown:false}}/>
        <Stack.Screen name ="ProfileWallet" component ={Profile_Wallet} options={{headerShown:false}}/>
        <Stack.Screen name ="ProfilePoints" component ={Profile_Points} options={{headerShown:false}}/>
        <Stack.Screen name ="ProfilePokes" component ={Profile_Pokes} options={{headerShown:false}}/>
        <Stack.Screen name ="ProfilePrivacySetting" component ={Profile_Privacy_setting} options={{headerShown:false}}/>
        <Stack.Screen name ="CreateStatus" component={CreateStatus} options={{headerShown:false}}/>
        <Stack.Screen name="publishPost" component={publishPost} options={{headerShown:false}}/>
        <Stack.Screen name ="Albumn" component={Albumn} options={{headerShown:false}}/>

        <Stack.Screen name="Drawerbg" component={Drawerbg} options={{headerShown:false}}/>
        <Stack.Screen name ="drawer" component ={drawer} options={{headerShown:false}}/>
        <Stack.Screen name ="Newsfeed" component={Newsfeed} options={{headerShown:false
        }}/>
        <Stack.Screen name ="Event" component ={Event} options={{headerShown:false}}/>
        <Stack.Screen name ="Mygroups" component ={Mygroups} options={{headerShown:false}}/>

        <Stack.Screen name ="Popularpost" component ={Popularpost} options={{headerShown:false}}/>

        <Stack.Screen name ="Mypages" component ={Mypages} options={{headerShown:false}}/>

        <Stack.Screen name ="Savedpost" component ={Savedpost} options={{headerShown:false}}/>
        <Stack.Screen name ="Newpost" component={Newpost} options={{headerShown:false}}/>
        <Stack.Screen name ="createPage" component={createPage} options={{headerShown:false}}/>
        <Stack.Screen name="updatepagemedia" component={updatePagemedia} options={{headerShown:false}}/>
        <Stack.Screen name="showpagedetails" component={showpagedetails} options={{headerShown:false}}/>
        <Stack.Screen name="pagepost" component={Pagepost} options={{headerShown:false}}/>
        <Stack.Screen name ="pagelist" component={pageList} options={{headerShown:false}}/>
        <Stack.Screen name ="suggestion" component ={suggestion} options={{headerShown:false}}/>
        <Stack.Screen name ="videoscreen" component={Videoscreen} options={{headerShown:false}}/>
      </Stack.Navigator>
  );
}
export default Stacks;