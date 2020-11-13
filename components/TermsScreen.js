import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native"

const Dev_Height = Dimensions.get('window').height
const Dev_Width = Dimensions.get('window').width

export default class TermsScreen extends React.Component{
   render(){
    return (
      <SafeAreaView>
       <Text> Hi </Text>
      </SafeAreaView>
    )
  }
}
