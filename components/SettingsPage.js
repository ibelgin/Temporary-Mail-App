import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  Switch,
  Linking,
  ScrollView,
  StatusBar,
  FlatList
} from 'react-native';

const Dev_Height = Dimensions.get("window").height
const Dev_Width = Dimensions.get("window").width

import Icons from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Feather';

export default class SettingScreen extends React.Component {

  state = {
    visible: true,
    NotificationSwitch: false,
  }

  render() {
    return (
      <View style={{ height: Dev_Height, width: Dev_Width, backgroundColor: "#1A1A1E" }}>
        <StatusBar backgroundColor="#1A1A1E" barStyle="light-content" />

        <View style={{ ...styles.settings_text_view, marginTop: "5%" }}>
          <Text style={styles.settings_text_style}>About the App</Text>
        </View>

        <TouchableOpacity style={{ height: "8%", width: "100%", alignItems: "center", flexDirection: "row", marginTop: 10 }}
          onPress={() => this.props.navigation.navigate("Terms")}>
          <Icon name="info" color="#FFF" size={24} style={{ marginLeft: "10%" }} />
          <Text style={{ color: "#FFF", fontSize: 18, marginLeft: "8%" }} >Terms Of Use</Text>
        </TouchableOpacity>


        <TouchableOpacity style={{ height: "8%", width: "100%", alignItems: "center", flexDirection: "row", marginTop: 10 }}
          onPress={() => this.props.navigation.navigate("disclaimer")}>
          <Icon name="italic" color="#FFF" size={24} style={{ marginLeft: "10%" }} />
          <Text style={{ color: "#FFF", fontSize: 18, marginLeft: "8%" }} >Disclaimer</Text>
        </TouchableOpacity>

        <View style={{ ...styles.settings_text_view }}>
          <Text style={styles.settings_text_style}>Support</Text>
        </View>

        <TouchableOpacity style={{ height: "8%", width: "100%", justifyContent: "center" }}
          onPress={() => Linking.openURL("https://forms.gle/bU83vnQj8fBnDKPg7")}>
          <Text style={{ marginLeft: "12%", fontSize: 18, color: "#FFF" }}>Report A Bug</Text>
        </TouchableOpacity>

        <View style={{ height: "8%", width: "100%", alignItems: "center", flexDirection: "row" }}>
          <Text style={{ marginLeft: "12%", fontSize: 18, color: "#FFF" }}>App Version</Text>
          <Text style={{ marginLeft: "30%", fontSize: 18, color: "gray" }}>1.0</Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Dev_Height - "10%",
    width: Dev_Width,
    backgroundColor: "#FFF"
  },
  settings_text_view: {
    height: 60,
    width: "100%",
    justifyContent: "center",
  },
  settings_text_style: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#5D7FEB",
    marginLeft: "10%"
  },
  main_style_box: {
    flexDirection: "row",
    alignItems: "center",
    height: "10%",
    width: "100%",
  }
});