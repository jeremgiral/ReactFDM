import React, { Component } from "react"
import { Button, Text, View, StyleSheet } from "react-native"

class Timer extends Component {
  constructor(props) {
    super(props)
  }
  handleStart(e) {
    this.props.startPeriod()
  }
  handlePause(e) {
    this.props.addPause()
  }
  handleResume(e) {
    this.props.addResume()
  }
  handleEnd(e) {
    this.props.endPeriod()
  }
  render() {
    let view
    if (this.props.matchState == "noStarted") {
      view = (
        <View style={styles.container}>
          <Button title="Début Match" onPress={e => this.handleStart(e)} />
        </View>
      )
    }
    if (this.props.matchState === "running") {
      view = (
        <View style={styles.container}>
          <Button title="Pause" onPress={e => this.handlePause(e)} />
        </View>
      )
    }
    if (this.props.matchState === "half") {
      view = (
        <View style={styles.container}>
          <Button
            title="Début 2ème Mi-Temps"
            onPress={e => this.handleStart(e)}
          />
        </View>
      )
    }
    if (this.props.matchState === "paused") {
      view = (
        <View style={styles.container}>
          <Button title="Reprendre" onPress={e => this.handleStart(e)} />
          <Button title="Fin Mi-temps" onPress={e => this.handleEnd(e)} />
        </View>
      )
    }
    if (this.props.matchState == "end") {
      view = (
        <View style={styles.container}>
          <Text>Match Terminé</Text>
        </View>
      )
    }

    return view
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  }
})
export default Timer
