import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import tw from "twrnc";
import { Divider } from "@rneui/themed";
import { AuthContext } from "../context";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const HeaderWithBack = ({ setIsVisible, title }) => {
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("user");
    setUser({});
    router.replace("/login");
  };
  return (
    <>
      <View style={tw`flex-row p-3 justify-between items-center`}>
        <View style={tw`flex-row gap-x-2 items-center`}>
          <TouchableOpacity
            style={tw`mt-1`}
            onPress={() => setIsVisible(false)}
          >
            <Ionicons name="arrow-back" size={24} color="blue" />
          </TouchableOpacity>
          <Text style={tw`font-bold text-xl`}>{title}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <Divider />
    </>
  );
};

export default HeaderWithBack;
