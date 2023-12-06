import { Tabs } from "expo-router";
import { Entypo, FontAwesome } from "@expo/vector-icons";

const RootLayout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }} initialRouteName="home">
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          tabBarLabel: "",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
          tabBarLabel: "",
          title: "Search",
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="bell" size={size} color={color} />
          ),
          tabBarLabel: "",
          title: "Notifications",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          tabBarLabel: "",
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default RootLayout;
