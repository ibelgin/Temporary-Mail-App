import React from "react"
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native"

const Dev_Height = Dimensions.get('window').height
const Dev_Width = Dimensions.get('window').width

import Icon from "react-native-vector-icons/AntDesign"

export default class TermsScreen extends React.Component{

  OnBack=()=>{
    this.props.navigation.goBack()
  }

  render(){
    return(
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1A1A1F" barStyle="light-content"/>
        <View style={styles.inside_email_box_view}>
          <Image 
            source={{uri:"https://media-public.canva.com/adoso/MAB3gKadoso/2/tl.png"}} 
            resizeMode="contain" 
            style={styles.image_view} 
          />
        </View>

        <View style={styles.text_main_view}>
          <ScrollView>
            <Text style={styles.text_style}>{'By using our services you agree to our Privacy policy which describes how we store information. \n\n Your temporary e-mail address is completely anonymous. Your email id automatically self-destructs as time elapses.\n\nTmp Mail does not permit the users to add images in the mails due to the following reasons: \n\n 1. Online theft \n 2. Misuse of the the app for other purpose \n 3. The images may contain virus \n\n The temporary email address that you can get at Tmp Mail can serve a great number of purposes. Its main function is to protect your confidentiality when browsing the Internet and Made Only for verification purposes.'}</Text>
          </ScrollView>
        </View>        

        <View style={styles.google_signin_view}>
          <TouchableOpacity style={styles.google_signin_buttom} onPress={this.OnBack}>
            <Icon name="heart" size={20} color="#FFF" style={{marginLeft:"5%"}}/>
            <Text style={styles.google_signin_text}> Ok Take Me Back </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:Dev_Height,
    width:Dev_Width,
    backgroundColor:"#1A1A1F"
  },
  image_view:{
    height:"100%",
    width:"100%"
  },
  inside_email_box_view:{
    height:"20%",
    width:"100%",
    marginTop:"10%"
  },
  text_main_view:{
    height:"50%",
    width:"90%",
    marginLeft:"5%",
    marginTop:"10%",
  },
  text_style:{
    color:"#FFF",
    fontSize:16,
  },
  google_signin_view:{
    height:"20%",
    width:"100%",
    justifyContent:"center",
    alignItems:"center",
  },
  google_signin_buttom:{
    height:"35%",
    width:"80%",
    backgroundColor:"#657ee4",
    borderRadius:10,
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
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
  },
})
