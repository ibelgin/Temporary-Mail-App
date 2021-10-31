import React from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView, Image } from 'react-native';

const text = `TmpMail person applications square measure provided on associate degree "as is" basis and with none guarantee whatever. , procured primarily from third party sources. we have a tendency to create no warranties of any kind regarding our content and services (such as token swap functionalities), together with however not restricted to accuracy, security. No part of the content and services that we offer constitutes a monetary recommendation, legal recommendation, or the other variety of recommendation meant for your specific reliance for any purpose, nor any dealing in (or promotion of) securities that a license is needed from the Financial Authority of India. 

Any use or reliance on our content and services is entirely at your own risk and discretion. you must conduct your own analysis, review, analyze and verify our content and services before looking forward to or mistreatment them. commercialism might even be an extremely risky activity that may cause major losses, please, therefore, consult your monetary consultant before creating any call. No content on our website is meant to be a solicitation or provide. Our goal is to serve each of your and community interests, therefore if you've got a drag or dispute, you go with raise it and verify to resolve it with us. informally. you'll contact us with feedback and issues here or by emailing the Us at coinskite@gmail.com.
`


export default class Disclaimer extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: "15%", width: "100%", marginTop: "5%" }}>
          <Image source={require("../assets/logo.png")} resizeMode="contain" style={{ height: "100%", width: "100%" }} />
        </View>
        <View style={{ height: "80%", width: "93%", alignItems: "center" }}>
          <Text adjustsFontSizeToFit={true} style={{ fontSize: 19, fontWeight: "bold", color: "#FFF" }}>{`\nDisclaimer \n\n`}</Text>
          <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <Text style={{ color: "#fff" }}>{text}</Text>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#191A1F"
  },
});