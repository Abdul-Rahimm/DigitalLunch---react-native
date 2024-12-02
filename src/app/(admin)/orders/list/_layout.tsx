import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
export default function OrderListNavigator() {
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "white" }}>
      <Tabs>
        <Tabs.Screen name="index" options={{ title: "Active" }} />
        <Tabs.Screen name="archive" options={{ title: "Archive" }} />
      </Tabs>
    </SafeAreaView>
  );
}
