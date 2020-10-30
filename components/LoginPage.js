import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet,
  Image,
  StatusBar
} from "react-native"

import Icon from "react-native-vector-icons/AntDesign"
import RBSheet from "react-native-raw-bottom-sheet";
import SwipeRender from "react-native-swipe-render";

const Dev_Height = Dimensions.get('window').height
const Dev_Width = Dimensions.get('window').width



export default class LoginPage extends React.Component{

  OnSignIn=()=>{
    this.props.navigation.navigate("Email")
  }

  onPressLogo=()=>{
    this.RBSheet.open()
  }

  componentDidMount=()=>{
    this.RBSheet.open()
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1A1A1A" barStyle="light-content"/>
      <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          closeOnPressBack={true}
          animationType="fade"
          closeOnDragDown={false}
          openDuration={300}
          customStyles={{
            container: {
              borderTopLeftRadius:15,
              borderTopRightRadius:15,
              height:"30%",
              backgroundColor:"#1A1A1F"
            }
          }}
        >
            <SwipeRender
              index={0} // default 0
              loop={false} // default false
              loadMinimal={true} // default false
              loadMinimalSize={2}
              autoplay={false} // default false
              horizontal={true} // default true
              showsPagination={true}
              autoplayTimeout={3}
              bounces={true}
          >
            <View style={{height:"80%",width:"100%",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
              <Image resizeMode="contain" source={{uri:"https://media-public.canva.com/MADpjvqNf0I/1/thumbnail_large.png"}} style={{height:"40%",width:"30%"}}/>
	      <View style={{justifyContent:"center",alignItems:"center",height:"100%",width:"50%"}}>
                <Text style={{color:"#F1F1F1",fontSize:17,textAlign: 'center'}}> Protect Your Privacy ! </Text>
                <Text style={{color:"gray",fontSize:15,marginTop:"5%",textAlign: 'center'}}>Protect Yourself From Hacker's. Survive long enough to be at potential risk to be hacked. </Text>
	      </View>
            </View>

            <View style={{height:"80%",width:"100%",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
              <Image resizeMode="contain" source={{uri:"https://media-public.canva.com/MADr0Rcb_yI/1/thumbnail_large.png"}} style={{height:"40%",width:"30%"}}/>
	      <View style={{justifyContent:"center",alignItems:"center",height:"100%",width:"50%"}}>
                <Text style={{color:"#F1F1F1",fontSize:17,textAlign: 'center'}}> Say No To Spam ! </Text>
                <Text style={{color:"gray",fontSize:15,marginTop:"5%",textAlign: 'center'}}>The Throwaway ID Is Your Safe Heaven From Spam And Junk Emails Filling Up Your Inbox.  </Text>
	      </View>
            </View>

            <View style={{height:"80%",width:"100%",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
              <Image resizeMode="contain" source={{uri:"https://media-public.canva.com/iYqdw/MAC-MXiYqdw/2/tl.png"}}style={{height:"40%",width:"30%"}}/>
	      <View style={{justifyContent:"center",alignItems:"center",height:"100%",width:"50%"}}>
                <Text style={{color:"#F1F1F1",fontSize:17}}> You Are Anonymous ! </Text>
                <Text style={{color:"gray",fontSize:15,marginTop:"5%",textAlign: 'center'}}> Since Making A Disposable Email Does Not Require Contact Information, It Keeps Up The Anonymity </Text>
	      </View>
            </View>

	    <View style={{height:"80%",width:"100%",justifyContent:"center",alignItems:"center",flexDirection:"row"}}>
              <Image resizeMode="contain" source={{uri:"https://media-public.canva.com/q72Mg/MACzUDq72Mg/2/tl.png"}}style={{height:"40%",width:"30%"}}/>
	      <View style={{justifyContent:"center",alignItems:"center",height:"100%",width:"60%"}}>
                <Text style={{color:"#F1F1F1",fontSize:17,textAlign: 'center'}}> What Are You Waiting For ? </Text>
                <TouchableOpacity onPress={()=>this.RBSheet.close()} style={{shadowColor: '#1A1A1F',shadowOffset: { width: 0, height: 1 },shadowOpacity: 0.8,shadowRadius: 2,elevation:5,height:"20%",width:"80%",backgroundColor:"#657ee4",borderRadius:10,marginTop:"10%",justifyContent:"center",alignItems:"center"}}>
                  <Text style={{fontSize:16,color:"#FFF"}}> Let's Start </Text>
                </TouchableOpacity>
	      </View>
            </View>
           
          </SwipeRender>
        </RBSheet>

        <TouchableOpacity style={styles.logo_view} onPress={this.onPressLogo}>
          <Image source={require("../assets/logo.png")} style={styles.Image_Style}/>
          <Text style={styles.login_Text}>Login In Into Your TmpMail Account To Begin</Text>
        </TouchableOpacity>

        <View style={styles.google_signin_view}>
          <TouchableOpacity style={styles.google_signin_buttom} onPress={this.OnSignIn}>
            <Icon name="facebook-square" size={24} color="#FFF" />
            <Text style={styles.google_signin_text}> Login With Facebook </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    height:Dev_Height,
    width:Dev_Width,
    backgroundColor:"#1A1A1F"
  },
  logo_view:{
    height:"30%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center"
  },
  login_Text:{
    color:"gray",
    fontSize:14,
    marginTop:"3%"
  },
  Image_Style:{
    height:"30%",
    width:"60%"
  },
  google_signin_view:{
    height:"70%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
  },
  google_signin_buttom:{
    height:"10%",
    width:"80%",
    backgroundColor:"#657ee4",
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
    marginTop:"80%",
    shadowColor: '#1A1A1F',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  google_signin_text:{
    fontSize:14,
    color:"#FFF",
    marginLeft:"5%"
  }
})