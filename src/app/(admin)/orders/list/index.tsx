import { ActivityIndicator, FlatList, Text } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useFetchAdminOrderList } from "@/api/orders";

export default function OrderScreen() {
  const { data: orders, isLoading, error } = useFetchAdminOrderList();

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
