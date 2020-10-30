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
  FlatList,
  AsyncStorage,
Alert
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


export default class LoginPage extends React.Component{


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
      } catch(e) {
         // save error
     }
  }
 
  UNSAFE_componentWillMount(){
    this.getMyObject()
  }

  setObjectValue = async () => {
  try {
    const jsonValue = JSON.stringify(this.state.data)
    await AsyncStorage.setItem('Emails', jsonValue)
  } catch(e) {
    // save error
  }
  console.log('Done.')
}


getMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('Emails')
    this.setState({ data : jsonValue != null ? JSON.parse(jsonValue) : null}) 
  } catch(e) {
    // read error
  }
}

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
  }

  constructor(props){
    super(props);
    this.state={
      isLoading: true,
      email:"",
      data:[]
    }
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={{height:90,width:"100%",alignItems:"center"}} onPress={()=> this.onPressProps(item.email,item.time)}>
      <View style={{backgroundColor:"#222228",height:"100%",width:"93%",flexDirection:"row",borderRadius:10}}>
        <View style={{height:"100%",width:"3%",backgroundColor:item.color,borderRadius:45}}/>
        <View style={{height:"100%",width:"80%",justifyContent:"center",marginLeft:"10%"}}>
          <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{fontSize:15,color:'#FFF'}}>{item.email}</Text>
          <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{fontSize:13,color:"gray",marginTop:"5%"}}>{moment(item.time).format("dddd, MMMM Do YYYY")}</Text>
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
      <View style={{height:"30%",width:"100%",alignItems:"center",justifyContent:"center"}}>
        <View style={{
          height:"80%",width:"90%",backgroundColor:"#222228",borderRadius:15,alignItems:"center",flexDirection:"row",justifyContent:"center"}}>
          <Image source={{uri:"https://media-public.canva.com/1SMvs/MADdd_1SMvs/2/tl.png"}} resizeMode="contain" style={{height:"80%",width:"40%"}} />
          <View style={{height:"100%",width:"50%",justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:18,color:"white",marginLeft:"10%"}}>Hi There !</Text>
            <TouchableOpacity 
                style={{
                  height:"20%",
                  width:"75%",
                  backgroundColor:"#657EE4",
                  marginLeft:"10%",
                  borderRadius:10,
                  marginTop:"8%",
                  justifyContent:"center",
                  alignItems:"center"
                  }} onPress={this.OnPressNew}>
              <Text style={{fontSize:13,color:"#FFF"}}>New Email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <View style={{height:"70%",width:"100%"}}>
          <SwipeableFlatList
            data={this.state.data}
            renderItem={this.renderItem}
            renderRight={({ item }) => (
                <TouchableOpacity style={{width:90,height:90,justifyContent:"center",alignItems:"center"}} onPress={this.deleteItemById(item.email)}>
                  <Icon name="close" size={24} color="#FFF"/>
                </TouchableOpacity>
            )}
            backgroundColor={'#1A1A1F'}
            itemBackgroundColor={'#1A1A1F'}
            ItemSeparatorComponent={this.renderSeparator}
            bounces={true}  
            refreshing={this.state.isLoading}
        />
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
  }
})