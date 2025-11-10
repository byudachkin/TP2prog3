import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, Image } from "react-native";
import { db, auth } from "../firebase/config";


class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            error: "",
        }
    }

    componentDidMount(){
        auth.onAuthStateChanged(user => {
            if(user!= null){
                this.props.navigation.navigate("HomeMenu")
            }
        })
    }

      onSubmit(email, password, username) {
        console.log(this.state);
        
    auth.createUserWithEmailAndPassword(email, password)
    .then( response => {
        console.log(response);
        
         this.setState({registered: true});
        db.collection("users").add({
            email: auth.currentUser.email,
            name: this.state.username,
            createdAt: Date.now(),
        })
        .then( r => console.log(r))
        .catch( e => console.log(e))
    this.props.navigation.navigate("Login")
    })
    .catch( error => { 
        console.log(error);
        if (error.message == "The email address is badly formatted.") {
            this.setState({error: "El correo esta mal formateado."})
        }
        else if (error.message == "Password should be at least 6 characters") {
            this.setState({error: "La contraseña debe tener al menos 6 caracteres"})
        }
        else if (error.message == "The email address is already in use by another account.") {
            this.setState({error: "Este email ya esta logueado"})
        }
       })
  };

    render() {
        return (
            <View style={styles.contenedor}>

                <Text style={styles.titulo}> Register</Text>
                 <Image style={styles.image}
                                       source={require("../../assets/logo.png")}
                                       resizeMode="contain"/>
                <Text> Email</Text>
                <TextInput style={styles.field}
                     keyboardType="email-address"
                     placeholder="Ingrese su email"
                     onChangeText={text => this.setState({ email: text })}
                     value={this.state.email} />
                <Text> Nombre de usuario</Text>
                <TextInput style={styles.field}
                     keyboardType="default"
                     placeholder="Ingrese su username"
                     onChangeText={text => this.setState({ username: text })}
                     value={this.state.username}/>     
                <Text> Contraseña</Text>
                <TextInput style={styles.field}
                     keyboardType="default"
                     placeholder="Ingrese su contraseña"
                     secureTextEntry={true}
                     onChangeText={text => this.setState({ password: text })}
                     value={this.state.password}/>
                <Pressable style={styles.boton} onPress={ () => this.onSubmit(this.state.email, this.state.password)}>
                    <Text style={styles.texto}> Registrate </Text>
                </Pressable>
                
                <Text> {this.state.error}</Text>

                <Pressable
                    onPress={() => this.props.navigation.navigate("Login")}>
                    <Text> Ya tengo cuenta </Text>
                </Pressable>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    contenedor: {
        paddingHorizontal: 10,
        marginTop: 20,
              marginTop: 20,
        flex: 1,               
  justifyContent: "center",
  alignItems: "center",   
  backgroundColor: "#F6F7FB", 

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
        image: {
       width: 120,
  height: 120,
  borderRadius: 60,      
  borderWidth: 3,          
  borderColor: '#e286ef',  
  marginBottom: 20,
  backgroundColor: '#fff',
  shadowColor: '#000',    
  shadowOpacity: 0.15,
  shadowOffset: { width: 0, height: 4 },
  shadowRadius: 8,
  elevation: 4,     
    }
})


export default Register