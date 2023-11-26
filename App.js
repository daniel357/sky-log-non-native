import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ImageBackground } from "react-native";
import { Image, View } from "react-native";

import UpdateJumpScreen from "./app/screens/UpdateJumpScreen";
import AddJumpScreen from "./app/screens/AddJumpScreen";
import ViewJumpsScreen from "./app/screens/ViewJumpsScreen";

const RootStack = createStackNavigator();

const backgroundImage = require("./app/shred/skydive_background.jpeg");

const App = () => {
  const BackgroundImage = ({ children }) => (
    <View style={{ flex: 1 }}>
      <Image
        source={backgroundImage}
        style={{
          flex: 1,
          resizeMode: "cover",
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: 0.6,
        }}
      />
      {children}
    </View>
  );

  const renderBackground = (Component) => (props) =>
    (
      <BackgroundImage>
        <Component {...props} />
      </BackgroundImage>
    );
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="ViewJumps"
          component={renderBackground(ViewJumpsScreen)}
          options={{
            title: "SkyLog",
            headerStyle: {
              backgroundColor: "#ADD8E6",
            },
            headerTitleStyle: {
              color: "#8A2BE2",
              fontSize: 26,
              alignSelf: "center",
            },
          }}
        />
        <RootStack.Screen
          name="AddJump"
          component={renderBackground(AddJumpScreen)}
          options={{
            title: "New Jump",
            headerStyle: {
              backgroundColor: "#ADD8E6",
            },
            headerTitleStyle: {
              color: "#8A2BE2",
              fontSize: 24,
            },
          }}
        />
        <RootStack.Screen
          name="UpdateJump"
          component={renderBackground(UpdateJumpScreen)}
          options={{
            title: "Update Jump",
            headerStyle: {
              backgroundColor: "#ADD8E6",
            },
            headerTitleStyle: {
              color: "#8A2BE2",
              fontSize: 24,
            },
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
