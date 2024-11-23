import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import Button from "@/components/Button";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const onCreate = () => {
    console.warn("Creating Product", name, price);

    //after successfully saving values to the DB. reset feilds
    resetFields();
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter here.."
        style={styles.input}
      />

      <Text style={styles.label}>Price (PKR)</Text>
      <TextInput
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
        placeholder="Enter amount in PKR"
        style={styles.input}
      />

      <Button text="Create" onPress={onCreate} />
    </View>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  label: {
    color: "gray",
    fontSize: 16,
    paddingHorizontal: 5,
  },
});
