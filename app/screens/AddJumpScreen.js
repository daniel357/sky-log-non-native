import React from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import Slider from "@react-native-community/slider";
import validate from "../utils/validator";
import styles from "../shred/stylesheet";

export default class AddJumpScreen extends React.Component {
  state = {
    title: "",
    canopy: "",
    plane: "",
    dropzone: "",
    datetime: "",
    altitude: 10000,
    description: "",
  };

  CustomSlider = () => {
    return (
      <View>
        <Slider
          style={{ width: 400, height: 40 }}
          minimumValue={1000}
          step={500}
          onValueChange={(value) => this.setState({ altitude: value })}
          value={this.state.altitude}
          maximumValue={25000}
          minimumTrackTintColor="#000000"
          maximumTrackTintColor="#0000FF"
        />
        <Text style={{ fontSize: 20, alignSelf: "center" }}>
          Altitude: {this.state.altitude} ft
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Title:</Text>
          <TextInput
            editable
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ title: value })}
            value={this.state.title}
          />
        </View>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Canopy:</Text>
          <TextInput
            editable
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ canopy: value })}
            value={this.state.canopy}
          />
        </View>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Plane:</Text>
          <TextInput
            editable
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ plane: value })}
            value={this.state.plane}
          />
        </View>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Dropzone:</Text>
          <TextInput
            editable
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ dropzone: value })}
            value={this.state.dropzone}
          />
        </View>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Date & Time:</Text>
          <TextInput
            editable
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ datetime: value })}
            value={this.state.datetime}
          />
        </View>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Description:</Text>
          <TextInput
            editable
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ description: value })}
            value={this.state.description}
          />
        </View>
        <View>{this.CustomSlider()}</View>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            if (
              validate(
                this.state.title,
                this.state.canopy,
                this.state.plane,
                this.state.dropzone,
                this.state.datetime,
                this.state.description
              )
            ) {
              this.props.navigation.navigate("ViewJumps", {
                adding: true,
                updating: false,
                title: this.state.title,
                canopy: this.state.canopy,
                plane: this.state.plane,
                dropzone: this.state.dropzone,
                datetime: this.state.datetime,
                altitude: this.state.altitude,
                description: this.state.description,
              });
            } else {
              Alert.alert("Invalid Data", "Please fill all fields!");
            }
          }}
        >
          <Text style={{ fontSize: 36, color: "#000000" }}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
