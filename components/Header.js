import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Divider } from "@rneui/themed";
import { router } from "expo-router";
import tw from "twrnc";
import * as SecureStore from "expo-secure-store";
import { useContext } from "react";
import { AuthContext } from "../context";

const Header = ({ title }) => {
  const { setUser } = useContext(AuthContext);

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("user");
    setUser({});
    router.replace("/login");
  };
  return (
    <>
      <View style={tw`flex-row p-3 justify-between items-center`}>
        <Text style={tw`font-bold text-xl`}>{title}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <Divider />
    </>
  );
};

export default Header;
