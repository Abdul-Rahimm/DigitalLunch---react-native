import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/Colors";

export default function ProductListItem({ product }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

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
    fontWeight: "bold",
  },
});
