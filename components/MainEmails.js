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
  TouchableHighlight,
  StatusBar
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
      email_id:"",
      value:1
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
    this.setState({ value : this.state.data.length })
  }

   onPressProps=(props)=>{
    this.props.navigation.navigate("Content",{
      "email_id":props,
      "email_domain":this.state.email_domain,
      "email_name":this.state.email_name
    })
  }

  renderItem = ({ item }) => (
    <TouchableOpacity style={styles.emails_main_view} onPress={()=> this.onPressProps(item.id)}>
      <View style={styles.view_background}>
        <View style={styles.dot_view}>
          <Entypo name="dot-single" size={30} color={item.color}/>
              <Text 
              numberOfLines={1} 
              adjustsFontSizeToFit={true} 
              style={{fontSize:15,color:item.color}}> 
                {item.email_from}
              </Text>
            </View>
        <View style={{height:"50%",width:"90%"}}>
          <Text style={styles.email_subject_text} numberOfLines={2} >{item.email_subject}</Text>
          <Text style={styles.email_date_text} numberOfLines={1} adjustsFontSizeToFit={true}>{item.email_date}</Text>
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

  _listEmptyComponent =()=>{
    return(
      <SafeAreaView style={styles.container}>
          <View style={{...styles.flat_list_view,justifyContent:"center",alignItems:"center"}}>
            <Image source={{uri:"https://media-public.canva.com/viKDQ/MADmi1viKDQ/2/tl.png"}} resizeMode="contain" style={styles.image}/>
             <View style={styles.Text_Container}>
               <Text style={styles.text}> No Mails Found </Text>
             </View>
          </View>
      </SafeAreaView>
    )
  }


  render(){
    return(
      <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#1A1A1F" barStyle="light-content"/>
        <View style={styles.main_view}/>
          <View style={styles.flat_list_view}>
              <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                ItemSeparatorComponent={this.renderSeparator}
                bounces={true}  
                onRefresh={this.OnPressNew}
                refreshing={this.state.isLoading}
                keyExtractor={(item, index) => 'key'+index}
                ListEmptyComponent={this._listEmptyComponent}
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
  },
  main_view:{
    height:"3%",
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
  flat_list_view:{
    height:"97%",
    width:"100%"
  },
  emails_main_view:{
    height:120,
    width:"100%",
    alignItems:"center"
  },
  view_background:{
    backgroundColor:"#222228",
    height:"100%",
    width:"93%",
    borderRadius:10
  },
  dot_view:{
    flexDirection:"row",
    alignItems:"center",
    height:"40%",
    width:"100%"
  },
  email_subject_text:{
    fontSize:13,
    color:"white",
    marginLeft:"8%"
  },
  email_date_text:{
    fontSize:13,
    color:"gray",
    marginLeft:"8%",
    marginTop:"4%"
  },
  image:{
    height:"50%",
    width:"90%"
  },
  Text_Container:{
    height:"20%",
    width:"100%",
    alignItems:"center",
    justifyContent:"center"
  },
  text:{
    fontSize:16,
    color:"gray",
  }
})
