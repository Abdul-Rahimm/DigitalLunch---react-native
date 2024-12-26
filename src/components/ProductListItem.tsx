import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { Tables } from "../types";
import { Link } from "expo-router";
import RemoteImage from "./RemoteImage";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Tables<"products">;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Link href={`/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <RemoteImage
          path={product.image}
          fallback={defaultPizzaImage}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>PKR {product.price}</Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    flex: 1, //share space equally with siblings
    maxWidth: "50%", //for odd items
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    aspectRatio: 1, //height calculated based on width
  },
  price: {
    color: Colors.light.tint,
    fontSize: 15,
    fontWeight: "bold",
  },
});
