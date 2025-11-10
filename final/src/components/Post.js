import React, { Component } from "react";
import { View, Text, Button, Pressable, StyleSheet } from "react-native";
import firebase from "firebase";
import { auth, db } from "../firebase/config";


class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
        likeado: false

        }
    }

    componentDidMount(){
        console.log(this.props.data.data)
        if (this.props.data.data.likes.includes(auth.currentUser.email)){
            this.setState({likeado:true})
        }
    }

    likear() {
        db.collection("posts")
            .doc(this.props.data.id)
            .update({
                likes: this.state.likeado ? firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email) : firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then((r) => {
                console.log(r);
                if (this.state.likeado){
                    this.setState({likeado:false})
                }
                else{
                    this.setState({likeado:true})
                }

            })
    }



    render() {
        console.log(this.props)
        return (
            <View style={styles.contenedor}>
                <Text >{this.props.data.data.email}</Text>
                <Text>{this.props.data.data.descripcion}</Text>
                {<Text> likes:{this.props.data.data.likes.length}</Text>}
                <Pressable onPress={() => this.likear()}>
                    <Text >  { this.state.likeado ? "💗" : "🖤" } </Text>
                </Pressable>
                <Pressable style={styles.boton} onPress={() => this.props.navegar(this.props.data.id)}>
                    <Text style={styles.texto}> Comentar  </Text>
                </Pressable>
            </View>
        );

    }
}

const styles = StyleSheet.create({
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
    texto: {
        color: "#fff"
    }
})



export default Post