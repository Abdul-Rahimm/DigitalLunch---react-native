import ProductListItem from "@/components/ProductListItem";
import products from "@assets/data/products";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const index = Number(id);

  return (
    <View>
      <Stack.Screen options={{ title: "Details: " + id }} />
      <Text>{products[index - 1].name}</Text>
    </View>
  );
};

export default ProductDetailsScreen;
