import { ActivityIndicator, FlatList, Text } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useFetchAdminOrderList } from "@/api/orders";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function OrderScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useFetchAdminOrderList({ archived: false });

  useEffect(() => {
    const orders = supabase
      .channel("custom-insert-channel")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "orders" },
        (payload) => {
          console.log("Change received!", payload);
        }
      )
      .subscribe();
  }, []);

  if (isLoading) return <ActivityIndicator />;

  if (error) return <Text>Failed to fetch admin orders all</Text>;

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 5 }}
    />
  );
}
