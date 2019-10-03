import React, { Component } from "react"
import { Text, View } from "react-native"

class Chrono extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let run = this.props.matchState === "running"
    return (
      <View>
        <Text className="state">{run ? "Running" : "Stop"}</Text>
        <Text>
          {this.props.zeroPad(this.props.minutes)}:
          {this.props.zeroPad(this.props.seconds)}{" "}
        </Text>
      </View>
    )
  }
}
export default Chrono
