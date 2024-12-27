import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet, Easing } from "react-native";

interface SplashScreenProps {
  onFinish: () => void;
  delay?: number; // Optional delay to control splash screen duration
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  delay = 3000,
}) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.elastic(1)),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(onFinish, delay); // Use the configurable delay
    });
  }, [onFinish, delay]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("./logo.png")}
        style={[
          styles.logo,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
        accessibilityLabel="Digital Lunch Logo"
      />

      <Text style={styles.text}>
        Order your cravings from anywhere at any time
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d2042d",
    paddingHorizontal: 20, // Spacing for small devices
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: -10,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: "#000000", // White for better contrast
    textAlign: "center", // Center-align the text
    fontFamily: "Cursive", // Adds an interesting font style
    letterSpacing: 2,
  },
});


export default SplashScreen;
