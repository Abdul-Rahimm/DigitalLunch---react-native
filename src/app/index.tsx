import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import Button from "../components/Button";
import { Link, Redirect, router } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
import { supabase } from "@/lib/supabase";
import SplashScreen from "./SplashScreen";
import { useState } from "react";

export const options = {
  headerShown: false,
};

const index = () => {
  const { session, loading } = useAuth();
  const [showSplash, setShowSplash] = useState<boolean>(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }
  if (loading) {
    return <ActivityIndicator />;
  }
  if (!session) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 10 }}>
      <Link href={"/(users)"} asChild>
        <Button text="User" />
      </Link>
      <Link href={"/(admin)"} asChild>
        <Button text="Admin" />
      </Link>
      <Link href={"/(auth)/sign-in"} asChild>
        <Button text="Sign-In" />
      </Link>
      <Button onPress={() => supabase.auth.signOut()} text="Sign-Out" />
    </View>
  );
};

export default index;
