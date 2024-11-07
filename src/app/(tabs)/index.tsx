import { FlatList, StyleSheet, View } from "react-native";
import products from "@assets/data/products";
import ProductListItem from "@components/ProductListItem";

// keep structure and style seperate

export default function MenuScreen() {
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
