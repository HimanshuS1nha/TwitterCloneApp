import React from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import tw from "twrnc";

const SafeView = ({ children }) => {
  return (
    <SafeAreaView
      style={[
        tw`bg-white flex-1`,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default SafeView;
