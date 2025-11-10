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
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Comentarios</Text>
        {this.state.loadingPosteo ? null :
          <View >
            <Text >{this.state.posteo.email}</Text>
            <Text>{this.state.posteo.descripcion}</Text>
            {<Text> likes:{this.state.posteo.likes.length}</Text>}

            <FlatList style={styles.cadaComentario} data={this.state.posteo.comentarios} keyExtractor={item => Math.random()} renderItem={({ item }) => {
              console.log(item)
              return (
                <View style={styles.comentar}>
                  <Text> {item.email} </Text>
                  <Text> {item.comentario} </Text>
                </View>
              )

            }} />
          </View>
        }

        <TextInput style={styles.field}
          placeholder="Comenta aquí tu post..."
          value={this.state.textoinput}
          onChangeText={text => this.setState({ textoinput: text })}
        />
        <Pressable style={styles.boton} onPress={() => this.crearComentario()}>
          <Text style={styles.texto} > Publicar comentario </Text>
        </Pressable>
        <Pressable style={styles.botonHome} onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={styles.texto} > Volver a home  </Text>
        </Pressable>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenedor: {
    paddingHorizontal: 10,
    marginTop: 20,
  },
  cadaComentario: {
    paddingHorizontal: 10,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  field: {
    height: 20,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderColor: "#ccc",
    borderStyle: "solid",
    borderWidth: 1,
    marginVertical: 10
  },
  boton: {
    backgroundColor: "#e286efff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745"
  },
  botonHome: {
    backgroundColor: "pink",
    paddingHorizontal: 10,
    paddingVertical: 6,
    textAlign: "center",
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#28a745",
    marginTop: 10
  },
  texto: {
    color: "#fff"
  },
  titulo: {
    fontWeight: "bold",
  },
  comentar: {
    borderWidth: 1,
    borderColor: "grey",
    margin: 4,
    borderRadius: 8,
    backgroundColor: "#e6e2e2ff"
  }
})

export default Comentario;