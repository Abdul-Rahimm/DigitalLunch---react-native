import React from "react";
import { Stack } from "expo-router";

import Colors from "@/constants/Colors";
const Menu = () => {

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Orders" }} />
    </Stack>
  );
};

export default Menu;
