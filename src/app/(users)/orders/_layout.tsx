import React from "react";
import { Stack } from "expo-router";
const Menu = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Orders" }} />
    </Stack>
  );
};

export default Menu;
