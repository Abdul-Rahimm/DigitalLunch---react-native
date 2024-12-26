import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "../../../../assets/data/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import OrderListItem from "../../../components/OrderListItem";
import { useOrderDetails } from "@/api/orders";
import { useUpdateOrderSubscription } from "@/api/orders/subscriptions";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  // const order = orders.find((o) => o.id.toString() === id);
  const { data: order, isLoading, error } = useOrderDetails(id);

  //user can see the status update of his order in real time
  useUpdateOrderSubscription(id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error || !order) {
    return <Text>Order not found!</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
