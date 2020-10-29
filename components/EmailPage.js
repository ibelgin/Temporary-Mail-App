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
  AsyncStorage
} from "react-native"


const Dev_Height = Dimensions.get('window').height
const Dev_Width = Dimensions.get('window').width

import Icon from "react-native-vector-icons/AntDesign"

const colors = ["#55E552","#FF8A00","#572CE8"]

const generate=()=>{
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    return date+"-"+month+"-"+year
}

function getRndInteger(min, max) {
  return  Math.floor(Math.random() * (max - min) ) + min;
}


export default class LoginPage extends React.Component{

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
    console.log(this.state.data)
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
        "time":generate(),
        "color":colors[getRndInteger(0,3)]
  }
    this.state.data.push(test)
    this.setState({ data : this.state.data})
    this.setState({ isLoading: false });
    this.setObjectValue()
    this.getMyObject()
  }

  onPressProps=(props)=>{
    this.props.navigation.navigate("EmailNow",{
      "email":props
    })
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
    <TouchableOpacity style={{height:90,width:"100%",alignItems:"center"}} onPress={()=> this.onPressProps(item.email)}>
      <View style={{backgroundColor:"#222228",height:"100%",width:"93%",flexDirection:"row",borderRadius:10}}>
        <View style={{height:"100%",width:"3%",backgroundColor:item.color,borderRadius:45}}/>
        <View style={{height:"100%",width:"80%",justifyContent:"center",marginLeft:"10%"}}>
          <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{fontSize:15,color:'#FFF'}}>{item.email}</Text>
          <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{fontSize:13,color:"gray",marginTop:"5%"}}>{item.time}</Text>
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
          <Image source={require("../assets/hi.png")} resizeMode="contain" style={{height:"80%",width:"40%"}} />
          <View style={{height:"100%",width:"50%",justifyContent:"center",alignItems:"center"}}>
            <Text style={{fontSize:18,color:"white",marginLeft:"10%"}}>Hi Belgin !</Text>
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
            <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
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
