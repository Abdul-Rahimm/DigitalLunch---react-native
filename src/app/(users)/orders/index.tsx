import { ActivityIndicator, FlatList, Text } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useFetchMyOrderList } from "@/api/orders";

export default function OrderScreen() {
  const { data: orders, error, isloading } = useFetchMyOrderList();

  if (isloading) return <ActivityIndicator />;
  if (error) return <Text>Failed to fetch customer Order</Text>;

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 5 }}
    />
  );
}
