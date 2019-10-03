import React, { Component } from "react"
import { Button, View, StyleSheet } from "react-native"
import App from "../App"

export default class Accueil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isNewMatch: false,
      isOldStats: false
    }
  }
  newMatch = () => {
    this.setState({ isNewMatch: true })
  }
  oldStat = () => {
    this.setState({ isOldStats: true })
  }
  render() {
    let react = (
      <View style={styles.container}>
        <Button
          onPress={e => this.newMatch()}
          title="Nouveau Match"
          style={styles.buttonContainer}
        ></Button>
        <Button
          onClick={e => this.oldStat()}
          title="Anciennes Stats"
          style={styles.buttonContainer}
        ></Button>
      </View>
    )
    if (this.state.isNewMatch) {
      react = <App />
    }
    if (this.state.isOldStats) {
      react = <App />
    }
    return react
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around"
  },
  buttonContainer: {
    flex: 1
  }
})
