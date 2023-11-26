import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Slider from "@react-native-community/slider";
import validate from "../utils/validator";
import styles from "../shred/stylesheet";

export default class UpdateJumpScreen extends React.Component {
  state = {
    id: this.props.route.params.id,
    title: this.props.route.params.title,
    canopy: this.props.route.params.canopy,
    plane: this.props.route.params.plane,
    dropzone: this.props.route.params.dropzone,
    datetime: this.props.route.params.datetime,
    altitude: this.props.route.params.altitude,
    description: this.props.route.params.description,
  };

  CustomSlider = () => {
    return (
      <View>
        <Slider
          style={{ width: 400, height: 40 }}
          minimumValue={0}
          step={500}
          onValueChange={(value) => this.setState({ altitude: value })}
          value={this.state.altitude}
          maximumValue={15000}
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
            defaultValue={this.state.title}
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ title: value })}
            value={this.state.title}
          />
        </View>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Canopy:</Text>
          <TextInput
            editable
            defaultValue={this.state.canopy}
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ canopy: value })}
            value={this.state.canopy}
          />
        </View>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Plane:</Text>
          <TextInput
            editable
            defaultValue={this.state.plane}
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ plane: value })}
            value={this.state.plane}
          />
        </View>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Dropzone:</Text>
          <TextInput
            editable
            defaultValue={this.state.dropzone}
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ dropzone: value })}
            value={this.state.dropzone}
          />
        </View>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Date & Time:</Text>
          <TextInput
            editable
            defaultValue={this.state.datetime}
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ datetime: value })}
            value={this.state.datetime}
          />
        </View>
        <View style={styles.valueField}>
          <Text style={styles.textField}>Description:</Text>
          <TextInput
            editable
            defaultValue={this.state.description}
            style={styles.inputContainer}
            onChangeText={(value) => this.setState({ description: value })}
            value={this.state.description}
          />
        </View>
        <View>{this.CustomSlider()}</View>
        <TouchableOpacity
          style={styles.updateBttn}
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
                adding: false,
                updating: true,
                id: this.state.id,
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
          <Text style={{ fontSize: 22, color: "#000000" }}>Update</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  updateBttn: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: 120,
    height: 35,
    marginTop: 20,
    backgroundColor: "#fc7c41",
    borderRadius: 12,
  },
});
