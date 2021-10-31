import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Image,
  StatusBar
} from "react-native"

import HTML from 'react-native-render-html';
import SnackBar from 'react-native-snackbar-component'

export default class ContentPage extends React.Component {

  UNSAFE_componentWillMount() {
    this.SeeMessageText()
  }

  SeeMessage = () => {
    this.props.navigation.navigate("Terms")
    this.setState({ visiblity: false })
  }

  SeeMessageText = () => {
    fetch("https://www.1secmail.com/api/v1/?action=readMessage&login=" + this.state.email_name + "&domain=" + this.state.email_domain + "&id=" + this.state.id)
      .then((response) => response.json())
      .then((json) => {
        this.setState({ isLoading: true })
        this.setState({ data: json["textBody"] })
        this.setState({ visible: false })
      })
      .catch((error) => console.error(error))
      .finally(() => this.setState({ isLoading: false }))
  }

  constructor(props) {
    super(props);
    this.state = {
      data: "",
      isLoading: true,
      email_name: this.props.route.params.email_name,
      email_domain: this.props.route.params.email_domain,
      id: this.props.route.params.email_id,
      visiblity: true
    }
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor="#1A1A1F" barStyle="light-content" />
        <ScrollView style={styles.container} >
          {this.state.isLoading ? <ActivityIndicator style={styles.ActivityIndicator_Style} color="#FFF" /> : (
            <View style={styles.text_container}>
              <Text selectable={true} style={styles.text}>{this.state.data}</Text>
            </View>
          )}
        </ScrollView>
        <SnackBar
          visible={this.state.visiblity}
          textMessage="Only Text Will Be Shown " actionHandler={this.SeeMessage} actionText="Know More"
          backgroundColor="#121212" messageColor="#FFF" accentColor="#FFF" autoHidingTime={3000}
        />
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1F",
    height: "90%",
    width: "100%",
  },
  ActivityIndicator_Style: {
    marginTop: "20%"
  },
  text_container: {
    height: "90%",
    width: "90%",
    marginLeft: "8%",
    marginTop: "10%"
  },
  text: {
    color: "#FFF"
  }
})

