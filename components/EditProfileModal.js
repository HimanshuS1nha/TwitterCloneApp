import React, { useContext, useState } from "react";
import { Input, Button } from "@rneui/themed";
import tw from "twrnc";
import { AuthContext } from "../context";
import { View, Text, Modal } from "react-native";
import HeaderWithBack from "./HeaderWithBack";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { router } from "expo-router";

const EditProfileModal = ({ isVisible, setIsVisible }) => {
  const { user, setUser } = useContext(AuthContext);

  const [name, setName] = useState(user?.name);
  const [username, setUsername] = useState(user?.username);
  const [bio, setBio] = useState(user?.bio);

  const { mutate: handleEdit, isPending } = useMutation({
    mutationKey: ["edit"],
    mutationFn: async () => {
      if (
        name === user?.name &&
        username === user?.username &&
        bio === user?.bio
      ) {
        return null;
      }
      const { data } = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/edit`,
        { name, username, bio, email: user?.email }
      );
      return data;
    },
    onSuccess: (data) => {
      setUser(data?.user);
      setIsVisible(false);
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        alert(error?.data?.response?.error);
        if (error?.response?.status === 401) {
          router.replace("/login");
        }
      } else {
        alert("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <Modal visible={isVisible} animationType="slide">
      <HeaderWithBack setIsVisible={setIsVisible} title={""} />
      <View style={tw`flex-1 justify-center`}>
        <Text style={tw`text-4xl text-blue-950 font-bold mb-6 text-center`}>
          Edit Profile
        </Text>
        <View style={tw`gap-y-1`}>
          <Text style={tw`font-semibold ml-5`}>Enter name:</Text>
          <Input
            placeholder="Enter name"
            inputStyle={tw`border border-black bg-white px-4 py-2 rounded-full`}
            inputContainerStyle={tw`border-transparent`}
            defaultValue={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={tw`gap-y-2`}>
          <Text style={tw`font-semibold ml-5`}>Enter username:</Text>
          <Input
            placeholder="Enter your username"
            inputStyle={tw`border border-black bg-white px-4 py-2 rounded-full`}
            inputContainerStyle={tw`border-transparent`}
            defaultValue={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={tw`gap-y-2`}>
          <Text style={tw`font-semibold ml-5`}>Enter Bio:</Text>
          <Input
            placeholder="Enter your bio"
            inputStyle={tw`border border-black bg-white px-4 py-2 rounded-full`}
            inputContainerStyle={tw`border-transparent`}
            defaultValue={bio}
            onChangeText={(text) => setBio(text)}
          />
        </View>
        <Button
          title={"Edit Profile"}
          containerStyle={tw`w-[90%] rounded-full mx-auto`}
          onPress={handleEdit}
          disabled={isPending}
        />
      </View>
    </Modal>
  );
};

export default EditProfileModal;
