import Button from "@/components/Button";
import ProductListItem, {
  defaultPizzaImage,
} from "@/components/ProductListItem";
import { CartItem, PizzaSize } from "@/types";
import products from "@assets/data/products";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { useCart } from "@/providers/CartProvider"; //this gives you access to the addItem function

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();

  const index = Number(id);
  const product = products[index - 1];
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const addToCart = () => {
    if (!product) return;

    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>PKR {product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
    marginTop: 10,
  },
  subtitle: {
    marginVertical: 10,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
});

export default ProductDetailsScreen;
