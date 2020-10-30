import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
ActivityIndicator
} from "react-native"

import HTML from 'react-native-render-html';

export default class ContentPage extends React.Component{

  UNSAFE_componentWillMount(){
    this.SeeMessage()
  }

  SeeMessage=()=>{
    fetch("https://www.1secmail.com/api/v1/?action=readMessage&login="+this.state.email_name+"&domain="+this.state.email_domain+"&id="+this.state.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ isLoading : true})
        this.setState({ data : json["textBody"]})
      })
      .catch((error) => console.error(error))
      .finally(() => this.setState({isLoading : false}))
  }

  constructor(props){
    super(props);
    this.state={
      data:"",
      isLoading:true,
      email_name:this.props.route.params.email_name,
      email_domain:this.props.route.params.email_domain,
      id:this.props.route.params.email_id
    }
    this.SeeMessage()
  }

  render(){
    return(
      <ScrollView style={{flex:1,backgroundColor:"#1A1A1F",alignItem:"center",height:"100%",width:"100%",alignSelf:"center"}} >
        {this.state.isLoading ? <ActivityIndicator style={{marginTop:"20%"}} color="#FFF" /> : (
          <HTML html={this.state.data}  containerStyle={{height:"90%",width:"90%",alignSelf:"center",marginTop:"10%"}} textSelectable={true} decodeEntities={true} baseFontStyle={{color:"#FFF"}}/>
        )}  
      </ScrollView>
    )
  }
}