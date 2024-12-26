import { Alert, Image, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import { defaultPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import {
  useInsertProduct,
  useFetchProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/api/products";
import { supabase } from "@/lib/supabase";
import { randomUUID } from "expo-crypto";
import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";

const CreateProductScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState("");
  const [image, setImage] = useState<string | null>(null);

  const router = useRouter();
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const isUpdating = !!id; //will be true when we are updating NOT CREATING

  const { mutate: insertProduct } = useInsertProduct();
  const { mutate: updateProduct } = useUpdateProduct();
  const { data: updatingProduct } = useFetchProduct(id); //fetch details of the product to be updated
  const { mutate: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name);
      setPrice(updatingProduct.price.toString());
      setImage(updatingProduct.image);
    }
  }, [updatingProduct]);

  const onCreate = async () => {
    if (!validateInput()) {
      return;
    }

    const imagePath = await uploadImage();

    insertProduct(
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
    console.warn("Creating Product", name, price);

    //after successfully saving values to the DB. reset feilds
  };

  const onUpdate = () => {
    if (!validateInput()) return;

    updateProduct(
      {
        id,
        name,
        price: parseFloat(price),
        image,
      },
      {
        onSuccess: () => {
          resetFields();
          router.back();
        },
      }
    );
  };

  //actually hits the Delete API call
  const onDelete = () => {
    deleteProduct(id, {
      onSuccess: () => {
        resetFields();
        router.replace("/(admin)/menu");
      },
    });
  };

  //confirm before hitting the APi call
  const confirmDelete = () => {
    Alert.alert("Confirm", "Are you sure to Delete?", [
      {
        text: "Cancel",
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  //whether to create or update
  const onSubmit = () => {
    if (isUpdating) {
      onUpdate();
    } else {
      onCreate();
    }
  };

  const resetFields = () => {
    setName("");
    setPrice("");
  };

  const validateInput = () => {
    setErrors("");
    if (!name) {
      setErrors("Name is required");
      return false;
    }
    if (!price) {
      setErrors("Price is required");
      return false;
    }
    if (isNaN(parseFloat(price))) {
      setErrors("Price is not a number");
      return false;
    }

    return true;
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const uploadImage = async () => {
    if (!image?.startsWith("file://")) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: "base64",
    });

    const filePath = `${randomUUID()}.png`;
    const contentType = "image/png";

    const { data, error } = await supabase.storage
      .from("product-images")
      .upload(filePath, decode(base64), { contentType });

    if (data) {
      return data.path;
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? "Update Product" : "Create Product" }}
      />

      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text onPress={pickImage} style={styles.textButton}>
        Select Image
      </Text>

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

      <Text style={{ color: "red" }}>{errors}</Text>
      <Button text={isUpdating ? "Update" : "Create"} onPress={onSubmit} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
          Delete
        </Text>
      )}
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
  textButton: {
    alignSelf: "center",
    fontWeight: "bold",
    color: Colors.light.tint,
    marginVertical: 10,
  },
  label: {
    color: "gray",
    fontSize: 16,
    paddingHorizontal: 5,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    alignSelf: "center",
  },
});
