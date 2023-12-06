import { View } from "react-native";
import React, { useContext } from "react";
import tw from "twrnc";
import { Avatar, Input } from "@rneui/themed";
import { AuthContext } from "../context";
import { FontAwesome } from "@expo/vector-icons";

const SearchHeader = ({ onChange }) => {
  const { user } = useContext(AuthContext);
  return (
    <View style={tw`flex-row mx-3 mt-3`}>
      <Avatar
        size={40}
        rounded
        source={{
          uri: user?.image,
        }}
        containerStyle={tw`mt-1.5`}
      />
      <Input
        placeholder="Search Twitter"
        inputStyle={tw`border px-2 border-white py-2`}
        inputContainerStyle={tw`border-transparent w-80 mt-1 bg-gray-100 rounded-full px-3`}
        leftIcon={<FontAwesome name="search" size={20} color={"gray"} />}
        onChangeText={onChange}
      />
    </View>
  );
};

export default SearchHeader;
