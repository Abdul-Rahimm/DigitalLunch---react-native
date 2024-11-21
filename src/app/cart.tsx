import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { useCart } from "@/providers/CartProvider";
import { FlatList } from "react-native";
import CartListItem from "@/components/CartListItem";

const CartScreen = () => {
  const { items } = useCart();

  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
      />

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
