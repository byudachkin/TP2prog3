import React, { Component } from "react";
import { View, Text, FlatList, Pressable, StyleSheet} from "react-native";
import { auth, db } from "../firebase/config" 

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: true,
      usuario: ""
    };
  }

  componentDidMount() {
    db.collection("posts").where("email", "==", auth.currentUser.email).onSnapshot(
        docs => {
        let posts = [];
        docs.forEach(doc => {
          posts.push({
            id: doc.id,
            data: doc.data()
          });
        });

        this.setState({
          posts: posts,
          loading: false
        });
      });
       db.collection("users").where("email", "==", auth.currentUser.email).onSnapshot(
        docs => {
        let usuarios = [];
        docs.forEach(doc => {
          usuarios.push({
            id: doc.id,
            data: doc.data()
          });
        });

        this.setState({
          usuario: usuarios[0].data,
          loading: false
        });
      });
  }

  logout() {
    auth.signOut()
        .then( r => console.log(r))
        .catch( e => console.log(e))
    this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Mi Perfil</Text>
         <Text>Usuario: {this.state.usuario.name}</Text>
        <Text>Email: {auth.currentUser.email}</Text>
        <Text >Mis publicaciones:</Text>
        <FlatList style={styles.publicacion} data={this.state.posts} keyExtractor={item => item.id.toString()} renderItem={({ item }) => ( <Text>• {item.data.descripcion}</Text>)}/>

         <Pressable style={styles.boton} onPress={() => this.logout()}>
            <Text style={styles.texto}> Cerrar sesion </Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    texto:{
        color: "#fff"
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
    titulo:{
        fontWeight: "bold",
    },
    contenedor: {
        paddingHorizontal: 10,
        marginHorizontal: 16,
        marginTop: 16,
        padding: 14,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
    },
    publicacion: {
        paddingHorizontal: 10,
        marginHorizontal: 16,
        marginTop: 16,
        padding: 14,
        backgroundColor: '#fff',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        marginBottom: 10
    }

})


export default Profile;