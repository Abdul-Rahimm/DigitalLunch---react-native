import { FlatList, StyleSheet, View } from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// keep structure and style seperate

export default function MenuScreen() {
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("products").select("*");
    }

    fetchProducts();
  }, []);

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
