import Button from "@/components/Button";
import ProductListItem, {
  defaultPizzaImage,
} from "@/components/ProductListItem";
import { CartItem, PizzaSize } from "@/types";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useCart } from "@/providers/CartProvider"; //this gives you access to the addItem function
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useColorScheme } from "@components/useColorScheme";
import Colors from "@/constants/Colors";
import { useFetchProduct } from "@/api/products";
import RemoteImage from "@/components/RemoteImage";
const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailsScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useFetchProduct(id);

  const { addItem } = useCart();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const addToCart = () => {
    if (!product) return;

    addItem(product, selectedSize);
    router.push("/cart");
  };

  if (isLoading) return <ActivityIndicator />;

  if (error || !product) return <Text>Failed to Fetch Products</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Menu",
          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <RemoteImage
        path={product?.image}
        fallback={defaultPizzaImage}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>PKR {product.price}</Text>

      <Button
        onPress={() => {
          console.log("editing product");
          router.navigate(`/(admin)/menu/create?id=${id}`);
        }}
        text="Edit Product"
      />
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
