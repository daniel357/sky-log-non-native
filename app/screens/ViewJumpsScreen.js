import React from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import styles from "../shred/stylesheet";
import {
  initDB,
  fetchJumps,
  addJump,
  updateJump,
  deleteJump,
  initializeJumps,
} from "../utils/db";

let JUMPS = [
  {
    id: 1,
    title: "first jump",
    canopy: "Stilleto 190",
    plane: "Cessna Caravan",
    dropzone: "TNT brothers",
    datetime: "12.08.2023",
    altitude: 4000,
    description: "nice jump, lets do it again",
  },
  {
    id: 2,
    title: "sunset dive",
    canopy: "Sabre 2 170",
    plane: "De Havilland Canada DHC-6 Twin Otter",
    dropzone: "Sky High Adventures",
    datetime: "09.21.2023",
    altitude: 10000,
    description: "Breathtaking view during sunset, felt like flying!",
  },
  {
    id: 3,
    title: "morning thrill",
    canopy: "Pulse 150",
    plane: "PAC P-750 XSTOL",
    dropzone: "Cloud 9 Skydiving",
    datetime: "06.03.2023",
    altitude: 8000,
    description: "Perfect weather, smooth landing, great start to the day!",
  },
];
let nextId = 4;

export default class ViewJumpsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: JUMPS,
      refreshing: false,
    };
  }

  //if this screen is focused, the jumps are loaded on the screen
  componentDidMount() {
    initDB();
    initializeJumps()
      .then((jumps) => {
        JUMPS = jumps;
        this.setState({ data: JUMPS });
      })
      .catch((error) => console.log("Error initializing jumps: ", error));
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      this.loadJumps();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  getJump(id) {
    for (let item of JUMPS) {
      if (item.id === id) {
        return item;
      }
    }
    return null;
  }

  removeJump(id) {
    JUMPS = JUMPS.filter((item) => item.id !== id);
    deleteJump(id, () => console.log("Jump deleted from database"));
    this.setState({ refreshing: true });
    this.setState({ data: JUMPS });
    this.setState({ refreshing: false });
  }

  removeJumpDialog(id) {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this skydiving experience" +
        this.getJump(id).title +
        "?",
      [
        {
          text: "CANCEL",
          style: "cancel",
        },
        { text: "OK", onPress: () => this.removeJump(id) },
      ],
      { cancelable: false }
    );
  }

  loadJumps() {
    if (!this.props.route.params) {
      this.setState({ refreshing: true });
      this.setState({ data: JUMPS });
      this.setState({ refreshing: false });
    } else {
      if (this.props.route.params.updating) {
        this.setState({ refreshing: true });
        const updatedJump = {
          id: this.props.route.params.id,
          title: this.props.route.params.title,
          canopy: this.props.route.params.canopy,
          plane: this.props.route.params.plane,
          dropzone: this.props.route.params.dropzone,
          datetime: this.props.route.params.datetime,
          altitude: this.props.route.params.altitude,
          description: this.props.route.params.description,
        };

        // Update the local JUMPS array
        JUMPS = JUMPS.map((obj) =>
          obj.id === updatedJump.id ? updatedJump : obj
        );
        this.setState({ data: JUMPS, refreshing: false });

        // Update the database
        updateJump(updatedJump.id, updatedJump, () =>
          console.log("Jump updated in database")
        );

        this.setState({ data: JUMPS });
        this.setState({ refreshing: false });
        this.props.route.params.updating = false;
      } else if (this.props.route.params.adding) {
        this.setState({ refreshing: true });
        const newJump = {
          id: nextId, // Ensure this ID is unique
          title: this.props.route.params.title,
          canopy: this.props.route.params.canopy,
          plane: this.props.route.params.plane,
          dropzone: this.props.route.params.dropzone,
          datetime: this.props.route.params.datetime,
          altitude: this.props.route.params.altitude,
          description: this.props.route.params.description,
        };

        // Add to the local JUMPS array
        JUMPS.push(newJump);
        this.setState({ data: JUMPS, refreshing: false });

        // Add to the database
        addJump(newJump, () => console.log("Jump added to database"));

        nextId++;
        this.setState({ data: JUMPS });
        this.setState({ refreshing: false });
        this.props.route.params.adding = false;
      }
    }
  }

  renderJumpComponent = ({
    id,
    title,
    canopy,
    plane,
    dropzone,
    datetime,
    altitude,
    description,
  }) => {
    return (
      <TouchableOpacity
        onLongPress={() => this.removeJumpDialog(id)}
        onPress={() =>
          this.props.navigation.navigate("UpdateJump", {
            id,
            title,
            canopy,
            plane,
            dropzone,
            datetime,
            altitude,
            description,
          })
        }
      >
        <View style={styles.displayContainer}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.detailsContainer}>
            <Text style={styles.details}>Altitude: {altitude} ft</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.details}>Canopy: {canopy}</Text>
            <Text style={styles.details}>Plane: {plane}</Text>
          </View>

          <View style={styles.detailsContainer}>
            <Text style={styles.details}>Dropzone: {dropzone}</Text>
            <Text style={styles.details}>Date & Time: {datetime}</Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  handleRefresh = () => {
    this.setState({ refreshing: false }, () => {
      this.loadJumps();
    });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <SafeAreaView>
          <FlatList
            data={this.state.data}
            renderItem={(item) => this.renderJumpComponent(item.item)}
            keyExtractor={(item) => item.id.toString()}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          />
        </SafeAreaView>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => this.props.navigation.navigate("AddJump")}
        >
          <Text style={{ fontSize: 36, color: "#8A2BE2" }}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
