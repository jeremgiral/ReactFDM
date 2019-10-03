import React, { Component } from "react"
import { Button, Text, TextInput, View, StyleSheet } from "react-native"

export default class Joueur extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handleonKeyDownNum(e) {
    this.props.onUpdateJoueur(this.props.id, {
      numero: parseInt(e.nativeEvent.text)
    })
  }
  handleonKeyDownNom(e) {
    this.props.onUpdateJoueur(this.props.id, { nom: e.nativeEvent.text })
  }
  handleOnAdd(key) {
    this.props.onAdd(key, this.props.id)
  }

  render() {
    let numero = this.props.numero ? (
      <Text>{this.props.numero}</Text>
    ) : (
      <TextInput
        placeholder="N°"
        name="numero"
        keyboardType="numeric"
        onSubmitEditing={e => this.handleonKeyDownNum(e)}
      />
    )

    let nom = this.props.nom ? (
      <Text
        onPress={e => this.handleOnAdd("onGround")}
        style={{
          backgroundColor: this.props.onGround ? "green" : "white",
          color: this.props.onGround ? "white" : "black",
          borderWidth: 1,
          textAlign: "center",
          borderColor: "white",
          borderRadius: 12
        }}
      >
        {this.props.nom}
      </Text>
    ) : (
      <TextInput
        placeholder="Nom"
        onSubmitEditing={e => this.handleonKeyDownNom(e)}
      />
    )

    return (
      <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
        <View style={{ flex: 1, alignSelf: "stretch" }}>{numero}</View>
        <View style={{ flex: 2, alignSelf: "stretch" }}>{nom}</View>
        <View style={{ flex: 1, alignSelf: "stretch", margin: 1 }}>
          <Button title="D+" onPress={e => this.handleOnAdd("d+")} />
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", margin: 1 }}>
          <Button title="D-" onPress={e => this.handleOnAdd("d-")} />
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", margin: 1 }}>
          <Button title="A+" onPress={e => this.handleOnAdd("a+")} />
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", margin: 1 }}>
          <Button title="A-" onPress={e => this.handleOnAdd("a-")} />
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", margin: 1 }}>
          <Button title="P+" onPress={e => this.handleOnAdd("p+")} />
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", margin: 1 }}>
          <Button title="P-" onPress={e => this.handleOnAdd("p-")} />
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", margin: 1 }}>
          <Button title="+" onPress={e => this.handleOnAdd("+")} />
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", margin: 1 }}>
          <Button title="." onPress={e => this.handleOnAdd(".")} />
        </View>
      </View>
    )
  }
}
