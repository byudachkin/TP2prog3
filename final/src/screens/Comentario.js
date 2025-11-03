import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from "react-native";
import { db, auth } from "../firebase/config";

class Nuevopost extends Component {
      constructor(props) {
        super(props);
        this.state = {
           
        }
    }

     render() {
    return (
      <View>
        <Text >Comentarios</Text>
      </View>
    );
  }
}