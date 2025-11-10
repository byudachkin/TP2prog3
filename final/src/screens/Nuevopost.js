import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, FlatList } from "react-native";
import { db, auth } from "../firebase/config";

class Nuevopost extends Component {
      constructor(props) {
        super(props);
        this.state = {
            posteos: [],
            descripcion: "",
            loading: true
        }
    }

    componentDidMount() {
                db.collection("posts").onSnapshot(
                    docs => {
                        let posts = [];
                        docs.forEach( doc => {
                            posts.push({
                                id: doc.id,
                                data: doc.data()
                            })
                            this.setState({
                                posteos: posts,
                                loading: false
                            })
                        })
                    }
                )
    
            };
            crearPost() {
                db.collection("posts").add({
                            email: auth.currentUser.email,
                            descripcion: this.state.descripcion,
                            createdAt: Date.now(),
                            likes: [],
                            comentarios: [],
                        })
                .then( r => console.log(r)) 
                .catch( e => console.log(e))
            };

            render() {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}> Crear nuevo post </Text>
        <TextInput style={styles.field}
          placeholder="Escribí aqui tu comentario..."
          value={this.state.descripcion}
          onChangeText={ text => this.setState({ descripcion: text })}
        />
        <Pressable style={styles.boton} onPress={() => this.crearPost()}>
            <Text style={styles.texto}> Publicar post </Text>
        </Pressable>
      </View>
    );
  }
}

 const styles = StyleSheet.create({
    contenedor: {
        paddingHorizontal: 10,
        marginTop: 20
    },
    field:{
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10, 
        borderRadius: 6,
        borderColor: "#ccc",
        borderStyle: "solid",
        borderWidth: 1,
        marginVertical: 10
    },
    boton:{
        backgroundColor: "#e286efff",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745"
    },
    texto:{
        color: "#fff"
    }, 
    titulo: {
         fontWeight: "bold"
    },
    register: {
          fontWeight: "bold"
      }, 
})



export default Nuevopost