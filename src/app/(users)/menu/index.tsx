import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import { Text } from "react-native";
import { useProductList } from "@/api/products";

// keep structure and style seperate

export default function MenuScreen() {
  const { data: products, error, isLoading } = useProductList();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch Products</Text>;

  return (
    <View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
