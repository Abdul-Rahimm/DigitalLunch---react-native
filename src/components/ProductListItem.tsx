import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";
import { Product } from "../types";

export const defaultPizzaImage =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png";

type ProductListItemProps = {
  product: Product;
};

export default function ProductListItem({ product }: ProductListItemProps) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
    </View>
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
