import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { Input, Button } from "@rneui/themed";
import { router } from "expo-router";

const Signup = () => {
  return (
    <View style={tw`flex-1 bg-blue-600 pt-32 items-center`}>
      <Image source={require("../../assets/logo.png")} style={tw`w-12 h-12`} />
      <View style={tw`pt-32 flex-1 w-full items-center px-4`}>
        <Text style={tw`text-2xl text-white font-semibold mb-5`}>
          Join Twitter Today
        </Text>
        <Input
          placeholder="Enter email"
          inputStyle={tw`border border-white bg-white px-4 py-2 rounded-full`}
          inputContainerStyle={tw`border-transparent`}
        />
        <Input
          placeholder="Enter Password"
          inputStyle={tw`border border-white bg-white px-4 py-2 rounded-full`}
          inputContainerStyle={tw`border-transparent`}
          secureTextEntry
        />
        <Button
          title={"Signup"}
          buttonStyle={tw`bg-white text-blue-500 rounded-full`}
          titleStyle={tw`text-blue-600 font-semibold w-40`}
        />
        <View style={tw`flex-row gap-x-2 justify-center mt-3`}>
          <Text style={tw`text-white pb-7`}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={tw`text-white font-semibold`}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Signup;
