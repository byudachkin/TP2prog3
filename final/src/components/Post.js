import React, { Component } from "react";
import { View, Text, Button, Pressable } from "react-native";
import firebase from "firebase";
import { auth, db } from "../firebase/config";


class Post extends Component {
      constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    likear() {
        db.collection("posts")
            .doc(this.props.data.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then((r) => {
                console.log(r);

                
            })
        }
  


    render(){
        console.log(this.props)
     return (
    <View >
      <Text >{this.props.data.data.email}</Text>
      <Text>{this.props.data.data.descripcion}</Text>
      {<Text> likes:{this.props.data.data.likes.length}</Text> }
      <Pressable onPress={() => this.likear()}>
        <Text > 💗  </Text>
        </Pressable>
    </View>
  );

}
}




export default Post