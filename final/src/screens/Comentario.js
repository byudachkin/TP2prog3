import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from "firebase";

class Comentario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteo: {},
      loadingPosteo: true,
      textoinput: "",
    }
  }

  componentDidMount() {
    console.log(this.props.route.params.id)
    db.collection("posts").doc(this.props.route.params.id).onSnapshot(data => {
      console.log(data.data())
      this.setState({ posteo: data.data(), loadingPosteo: false })
    })
  };

  crearComentario() {
    let comentario = { email: auth.currentUser.email, comentario: this.state.textoinput }
    db.collection("posts").doc(this.props.route.params.id).update({ comentarios: firebase.firestore.FieldValue.arrayUnion(comentario) })

      .then(r => console.log(r))
      .catch(e => console.log(e))
  };

  render() {
    return (
      <View>
        <Text >Comentarios</Text>
        {this.state.loadingPosteo ? null :
          <View >
            <Text >{this.state.posteo.email}</Text>
            <Text>{this.state.posteo.descripcion}</Text>
            {<Text> likes:{this.state.posteo.likes.length}</Text>}

            <FlatList data={this.state.posteo.comentarios} keyExtractor={() => Math.random()} renderItem={({ item }) => {
              console.log(item)
              return(
                <View>
                <Text> {item.email} </Text>
                <Text> {item.comentario} </Text>
              </View>
              )
              
            }} />
          </View>
        }

        <TextInput
          placeholder="Escribí aqui tu comnetario..."
          value={this.state.textoinput}
          onChangeText={text => this.setState({ textoinput: text })}
        />
        <Pressable onPress={() => this.crearComentario()}>
          <Text > Publicar post </Text>
        </Pressable>

      </View>
    );
  }
}

export default Comentario;