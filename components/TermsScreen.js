import React from "react"
import {
  SafeAreaView,
  Text,
  View,
  Dimensions,
  StyleSheet
} from "react-native"

const Dev_Height = Dimensions.get('window').height
const Dev_Width = Dimensions.get('window').width

export default class TermsScreen extends React.Component{
  render(){
    return(
      <SafeAreaView style={styles.container}>
        <Text> Hi I am Belgin </Text>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:Dev_Height,
    width:Dev_Width
  }
})
