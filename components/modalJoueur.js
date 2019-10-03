import React, { Component } from "react"
import { Text, View, Button } from "react-native"
import Modal from "react-native-modal"

export default class ModalJoueur extends Component {
  constructor(props) {
    super(props)
  }
  handleSetModalVisible(visible) {
    this.props.setModalVisible(visible)
  }
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        isVisible={this.props.modalVisible}
      >
        <View style={{ flex: 1 }}>
          <Text>Hello World!</Text>

          <Button
            title="close"
            onPress={() => {
              this.handleSetModalVisible(!this.props.modalVisible)
            }}
          />
        </View>
      </Modal>
    )
  }
}
