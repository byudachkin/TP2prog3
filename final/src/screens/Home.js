
import { View, Text, StyleSheet, FlatList } from "react-native";
import React, { Component } from "react";
import { db, auth } from "../firebase/config";
import HomeMenu from "../components/HomeMenu"
import Post from "../components/Post";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posteos: [],
    };
  }
componentDidMount() {
  db.collection("posts").orderBy("createdAt", "desc").onSnapshot(docs => {
    let posts = [];
    docs.forEach(doc => {
      posts.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    this.setState({ posteos: posts }); 
  });
}

navegar(id){
  console.log(this.props.navigation)
  this.props.navigation.navigate("NavegacionComentarios" , {screen: "Comentario" , params:{id: id}} )
}

  render() {
    return (
      <View>
        <Text style={styles.texto}>HOME</Text>
        <FlatList
          data={this.state.posteos}
          keyExtractor={ item => item.id}
          renderItem={({ item }) =>  <Post data={item} navegar={(id) => this.navegar(id)}/>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    texto: {
         fontWeight: "bold"
    },
})

export default Home