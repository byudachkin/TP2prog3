
import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { auth } from "../firebase/config";




class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        }
    }

    onSubmit(email, password) {
        if (!email.includes("@")) {
            this.setState({ error: "Email mal formateado" })
        }
        else if (password.length < 6) {
            this.setState({ error: "La password debe tener una longitud mínima de 6 caracteres" })
        }
        else {
            auth.signInWithEmailAndPassword(email, password)
                .then(response => {
                    this.setState({ loggedIn: true });
                    this.props.navigation.navigate("HomeMenu")
                })
                .catch(error => {
                    this.setState({ error: "Credenciales invalidas" })
                })
        }

    };


    render() {
        return (
            <View style={styles.contenedor}>


                <Pressable
                    onPress={() => this.props.navigation.navigate("HomeMenu")}>
                    <Text> Entrar en la App </Text>
                </Pressable>

                <Text style={styles.titulo}> Login</Text>
                <Text> Email</Text>
                <TextInput style={styles.field}
                    keyboardType="email-address"
                    placeholder="ingrese su email"
                    onChangeText={text => this.setState({ email: text })}
                    value={this.state.email} />
                <Text> Contraseña</Text>
                <TextInput style={styles.field}
                    keyboardType="default"
                    placeholder="Ingrese su contraseña"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password} />
                <Pressable style={styles.boton} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
                    <Text> {this.state.error}</Text>
                    <Text style={styles.texto}> Logueate </Text>
                </Pressable>

                <Pressable
                    onPress={() => this.props.navigation.navigate("Register")}>
                    <Text> No tengo cuenta</Text>
                </Pressable>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    contenedor: {
        paddingHorizontal: 10,
        marginTop: 20
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
    texto: {
        color: "#fff"
    },
    titulo: {
        fontWeight: "bold"
    },
    register: {
        fontWeight: "bold"
    },
})



export default Login