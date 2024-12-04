import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductListItem from "@components/ProductListItem";
import { useFetchProductList } from "@/api/products";
import Button from "@/components/Button";
import { supabase } from "@/lib/supabase";

// keep structure and style seperate

export default function MenuScreen() {
  const { data: products, error, isLoading } = useFetchProductList();

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch Products</Text>;
  return (
    <View>
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
    </View>
  );
}

const styles = StyleSheet.create({});
