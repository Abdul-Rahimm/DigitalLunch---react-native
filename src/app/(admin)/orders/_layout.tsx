import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Stack, Tabs } from "expo-router";
import { Pressable } from "react-native";
import { useColorScheme } from "@components/useColorScheme";

import Colors from "@/constants/Colors";
const Menu = () => {
  const colorScheme = useColorScheme();

  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: "Orders" }} /> */}
      <Stack.Screen name="list" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Menu;
