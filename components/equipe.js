import React, { Component } from "react"
import { TextInput, View } from "react-native"

class Equipe extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <View>
        <TextInput
          style={{ height: 40 }}
          placeholder={`Nom de l'équipe ${this.props.name}`}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
        />
      </View>
    )
  }
}
export default Equipe
