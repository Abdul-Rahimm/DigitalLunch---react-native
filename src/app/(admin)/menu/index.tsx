import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductListItem from "@components/ProductListItem";
import { useFetchProductList } from "@/api/products";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

// keep structure and style seperate

export default function MenuScreen() {
  const { data: products, error, isLoading } = useFetchProductList();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch Products</Text>;
  return (
    <ScrollView>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductListItem product={item} />}
        numColumns={2}
        contentContainerStyle={{
          gap: 10,
          padding: 10,
          backgroundColor: "red",
        }}
        columnWrapperStyle={{ gap: 10 }}
      />
      <Button text="Sign Out" onPress={() => supabase.auth.signOut()} />
      <Button
        onPress={() => {
          console.log("Creating new product");
          router.navigate("/(admin)/menu/create");
        }}
        text="Create New Product"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
