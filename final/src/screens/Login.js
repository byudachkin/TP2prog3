import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { db, auth } from "../firebase/config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
        }
    }}

export default Login