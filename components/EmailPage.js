import React from "react"
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  AsyncStorage,
  Alert,
  Clipboard,
  ToastAndroid,
  Modal,
  TouchableHighlight
} from "react-native"

const Dev_Height = Dimensions.get('window').height
const Dev_Width = Dimensions.get('window').width

import Icon from "react-native-vector-icons/AntDesign"
import {SwipeableFlatList} from 'react-native-swipeable-flat-list';
import moment from 'moment';

const colors = ["#55E552","#FF8A00","#572CE8"]


function getRndInteger(min, max) {
  return  Math.floor(Math.random() * (max - min) ) + min;
}

export default class EmailPage extends React.Component{

  OnLongPressEmail= async (test)=>{
      await Clipboard.setString(test);
      ToastAndroid.show("Copied To Clipboard", ToastAndroid.LONG);
    }

  componentDidMount(){
    this.getMyObject()
  }

 constructor(props){
    super(props);
    this.state={
      isLoading: true,
      email:"",
      data:[],
      value:1,
      modalVisible:true
    }
  }

  onPressProps=(email,endtime)=>{
    const currenttime = moment()
    if (moment(endtime).isAfter(currenttime)){
      this.props.navigation.navigate("EmailNow",{
      "email":email
    })
   }
    else{
      Alert.alert("Email Expired","This Email Has Expired. Kindly Delete This By Swiping The Email Card And Clicking On The X Mark")
    }
  }

  deleteItemById = email => () => {
      const filteredData = this.state.data.filter(item => item.email !== email);
      this.setState({ data: filteredData });
      try {
        const jsonValue = JSON.stringify(filteredData)
        AsyncStorage.setItem('Emails', jsonValue)
        this.getMyObject()
        this.setState({ value : this.state.data.length })
      } catch(e) {
         // save error
     }
  }
 

  setObjectValue = async () => {
  try {
    const jsonValue = JSON.stringify(this.state.data)
    await AsyncStorage.setItem('Emails', jsonValue)
    this.setState({ value : this.state.data.length })
    
  } catch(e) {
    // save error
  }
  console.log('Done.')
}


 getMyObject = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Emails');
      if (jsonValue) {
        const data = JSON.parse(jsonValue);
        this.setState({ data: data, value: data.length });
        this.setState({ email: jsonValue[0], isLoading: true });     
      }
    } catch (e) {
    // read error
    }
};

  OnPressNew=()=>{
    fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1')
      .then((response) => response.json())
      .then((json) => {
        this.setState({ email: json[0] });
        this.setState({ isLoading : true })
        this.listformating()
      })
      .catch((error) => console.error(error))
  }

  listformating=()=>{
    const test = {
        "email":this.state.email,
        "time":moment().add(15,'m'),
        "color":colors[getRndInteger(0,3)]
  }
    this.state.data.push(test)
    this.setState({ data : this.state.data})
    this.setState({ isLoading: false });
    this.setObjectValue()
    this.getMyObject()
    this.setState({ value : this.state.data.length })

  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.email_touch} onPress={()=> this.onPressProps(item.email,item.time)} onLongPress={()=>this.OnLongPressEmail(item.email)}>
      <View style={styles.email_main_view}>
        <View style={{height:"100%",width:"3%",backgroundColor:item.color,borderRadius:45}}/>
        <View style={styles.email_container}>
          <Text 
            numberOfLines={1} 
            adjustsFontSizeToFit={true} 
            style={styles.email_text}>
               {item.email}
          </Text>
          <Text 
          numberOfLines={1} 
          adjustsFontSizeToFit={true} 
          style={styles.timestamp_text}>{moment(item.time).format("dddd, MMMM Do YYYY")}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  renderSeparator = () => (
    <View
      style={{
        height: 10,
      }}
    />
  );


  render(){
    return(
      <SafeAreaView style={styles.container}>
      <View style={styles.main_email_box_view}>
        <View style={styles.inside_email_box_view}>
          <Image source={{uri:"https://media-public.canva.com/adoso/MAB3gKadoso/2/tl.png"}} resizeMode="contain" style={styles.image_view} />
          <View style={styles.new_email_text_and_button_View}>
            <Text style={styles.hi_there_text}>Hi There !</Text>
            <TouchableOpacity 
                style={styles.new_email_button} onPress={this.OnPressNew}>
              <Text style={styles.new_email_button_text}>New Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
   {this.state.value != 0 ? 
      <View style={styles.list_main_view}>
          <SwipeableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            renderRight={({ item }) => (
                <TouchableOpacity style={styles.delete_button} onPress={this.deleteItemById(item.email)}>
                  <Icon name="close" size={24} color="#FFF"/>
                </TouchableOpacity>
            )}
            backgroundColor={'#1A1A1F'}
            itemBackgroundColor={'#1A1A1F'}
            ItemSeparatorComponent={this.renderSeparator}
            bounces={true}  
            refreshing={this.state.isLoading}
	          keyExtractor={(item, index) => 'key'+index}
        />
      </View>  : 

      <View style={{...styles.list_main_view,justifyContent:"center",alignItems:"center"}}>
        <Image source={{uri:"https://media-public.canva.com/dl__Y/MADAmQdl__Y/2/tl.png"}} resizeMode="contain" style={{height:"30%",width:"100%"}} />
        <Text style={styles.Intro_Text}> No Mails Found </Text>
      </View>
    }
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
  main_email_box_view:{
    height:"30%",
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
  inside_email_box_view:{
    height:"75%",
    width:"90%",
    backgroundColor:"#222228",
    borderRadius:15,
    alignItems:"center",
    flexDirection:"row",
    justifyContent:"center"
  },
  image_view:{
    height:"80%",
    width:"40%"
  },
  new_email_text_and_button_View:{
    height:"100%",
    width:"50%",
    justifyContent:"center",
    alignItems:"center"
  },
  hi_there_text:{
    fontSize:18,
    color:"white",
    marginLeft:"10%"
  },
  new_email_button:{
    height:"20%",
    width:"75%",
    backgroundColor:"#657EE4",
    marginLeft:"10%",
    borderRadius:10,
    marginTop:"8%",
    justifyContent:"center",
    alignItems:"center"
  },
  new_email_button_text:{
    fontSize:13,
    color:"#FFF"
  },
  list_main_view:{
    height:"70%",
    width:"100%",
    backgroundColor:"#1A1A1F"
  },
  delete_button:{
    width:90,
    height:90,
    justifyContent:"center",
    alignItems:"center"
  },
  email_touch:{
    height:90,
    width:"100%",
    alignItems:"center"
  },
  email_main_view:{
    backgroundColor:"#222228",
    height:"100%",
    width:"93%",
    flexDirection:"row",
    borderRadius:10
  },
  email_container:{
    height:"100%",
    width:"80%",
    justifyContent:"center",
    marginLeft:"10%"
  },
  email_text:{
    fontSize:15,
    color:'#FFF'
  },
  timestamp_text:{
    fontSize:13,
    color:"gray",
    marginTop:"5%"
  },
  Intro_Text:{
    fontSize:15,
    color:"gray",
    marginTop:"15%"
  },
})
