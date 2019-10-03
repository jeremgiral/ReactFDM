import React, { Component } from "react"
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground
} from "react-native"

export default class Cage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shoots: []
    }
  }
  handleMouseMove = e => {
    console.log(e)
    console.log({
      type: "Arrêt",
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY,
      date: new Date()
    })
    let shoots = this.state.shoots
    shoots.push({
      type: "Arrêt",
      x: e.nativeEvent.locationX,
      y: e.nativeEvent.locationY,
      date: new Date()
    })
    this.setState({ shoots: shoots })
  }

  render() {
    return (
      <TouchableOpacity
        onPressOut={e => this.handleMouseMove(e)}
        style={styles.container}
      >
        <View>
          <Image
            source={require("../assets/cage.jpg")}
            style={{ flex: 1, width: "70%", height: "70%" }}
          />
          {this.state.shoots.map(shoot => {
            return (
              <Tir x={shoot.x} y={shoot.y} type={shoot.type} key={shoot.date} />
            )
          })}
        </View>
      </TouchableOpacity>
    )
  }
}
let styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover" // or 'stretch'
  },
  container: {
    flex: 1,
    justifyContent: "center"
  }
})

class Tir extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const styles = {
      top: this.props.y,
      left: this.props.y,
      height: 42,
      width: 42
    }
    if (this.props.type == "Arrêt") {
      return <Image source={require("../assets/ball.jpg")} style={styles} />
    } else {
      return <Image source={require("../assets/ball.jpg")} style={styles} />
    }
  }
}
