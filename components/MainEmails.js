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
  PanResponder,
  Animated,
  TouchableHighlight
} from "react-native"

const Dev_Height = Dimensions.get('window').height
const Dev_Width = Dimensions.get('window').width

import Entypo from "react-native-vector-icons/Entypo"

const colors = ["#F26D21","#1496BB","#BB86FC"]

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

  constructor(props){
    super(props);
    this.state={
      data:[],
      isLoading: true,
      email_from:"",
      email_subject:"",
      email_date:"",
      email_name:this.props.route.params.email.split("@")[0],
      email_domain:this.props.route.params.email.split("@")[1],
      email:"",
      email_id:""
    }
    this.OnPressNew()
  }

  OnPressNew=()=>{
    fetch("https://www.1secmail.com/api/v1/?action=getMessages&login="+this.state.email_name+"&domain="+this.state.email_domain)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ isLoading : true })
        this.setState({ data : []})
        for (i in json){
          this.setState({ email_from: json[i]["from"] })
          this.setState({ email_subject: json[i]["subject"] });
          this.setState({ email_date: json[i]["date"] });
          this.setState({ email_id: json[i]["id"] });
          this.listformating()
        }
      })
      .catch((error) => console.error(error))
      .finally(() => this.setState({isLoading : false}))
  }

  listformating=()=>{
    const test = {
        "email_from":this.state.email_from,
        "email_subject":this.state.email_subject,
        "email_date":this.state.email_date,
        "color":colors[getRndInteger(0,3)],
        "id":this.state.email_id
  }
    this.state.data.push(test)
    this.setState({ data : this.state.data})
  }

   onPressProps=(props)=>{
    this.props.navigation.navigate("Content",{
      "email_id":props,
      "email_domain":this.state.email_domain,
      "email_name":this.state.email_name
    })
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={{height:120,width:"100%",alignItems:"center"}} onPress={()=> this.onPressProps(item.id)}>
      <View style={{backgroundColor:"#222228",height:"100%",width:"93%",borderRadius:10}}>
            <View style={{flexDirection:"row",alignItems:"center",height:"40%",width:"100%"}}>
              <Entypo name="dot-single" size={30} color={item.color}/>
              <Text 
              numberOfLines={1} 
              adjustsFontSizeToFit={true} 
              style={{fontSize:15,color:item.color}}> 
                {item.email_from}
              </Text>
            </View>
        <View style={{height:"50%",width:"90%"}}>
          <Text style={{fontSize:13,color:"white",marginLeft:"8%"}} numberOfLines={2} >{item.email_subject}</Text>
          <Text style={{fontSize:13,color:"gray",marginLeft:"8%",marginTop:"4%"}} numberOfLines={1} adjustsFontSizeToFit={true}>{item.email_date}</Text>
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
      <View style={{height:"3%",width:"100%",alignItems:"center",justifyContent:"center"}}/>
      <View style={{height:"97%",width:"100%"}}>
            <FlatList
            data={this.state.data}
            renderItem={this.renderItem}
            ItemSeparatorComponent={this.renderSeparator}
            bounces={true}  
            onRefresh={this.OnPressNew}
            refreshing={this.state.isLoading}
	    keyExtractor={(item, index) => 'key'+index}
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
    backgroundColor:"#1A1A1F",
    
  }
})