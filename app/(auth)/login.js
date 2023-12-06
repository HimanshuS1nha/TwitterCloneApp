import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import tw from "twrnc";
import { Input, Button } from "@rneui/themed";
import { router } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { AuthContext } from "../../context";
import * as Linking from "expo-linking";

const Login = () => {
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: async () => {
      if (!email || !password || !email.includes("@")) {
        alert("Invalid Values");
        return null;
      }
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/login`,
        { email, password }
      );
      return data;
    },
    onSuccess: async (data) => {
      setUser(data.data);
      await SecureStore.setItemAsync("user", JSON.stringify(data.data));
      router.replace("/home");
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(error.response.data.error);
      } else {
        alert("Some error occured. Please try again later!");
      }
    },
  });

  return (
    <View style={tw`flex-1 bg-blue-600 pt-32 items-center`}>
      <Image source={require("../../assets/logo.png")} style={tw`w-12 h-12`} />
      <View style={tw`pt-32 flex-1 w-full items-center px-4`}>
        <Text style={tw`text-2xl text-white font-semibold mb-5`}>
          Login to Twitter
        </Text>
        <Input
          placeholder="Enter email"
          inputStyle={tw`border border-white bg-white px-4 py-2 rounded-full`}
          inputContainerStyle={tw`border-transparent`}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Enter Password"
          inputStyle={tw`border border-white bg-white px-4 py-2 rounded-full`}
          inputContainerStyle={tw`border-transparent`}
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button
          title={"Login"}
          buttonStyle={tw`bg-white text-blue-500 rounded-full`}
          titleStyle={tw`text-blue-600 font-semibold`}
          containerStyle={tw`w-40`}
          onPress={handleLogin}
          disabled={isPending}
        />
        <View style={tw`flex-row gap-x-2 justify-center mt-3`}>
          <Text style={tw`text-white pb-7`}>Don&apos;t have an account?</Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(process.env.EXPO_PUBLIC_WEB_URL)}
          >
            <Text style={tw`text-white font-semibold`}>Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
