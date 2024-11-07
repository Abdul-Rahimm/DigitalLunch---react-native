import React, { useState } from "react";
import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const DropdownExample = () => {
  const [selectedValue, setSelectedValue] = useState("java");

  return (
    <View>
      <Text>Select a language:</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="javascript" />
        <Picker.Item label="Python" value="python" />
      </Picker>
    </View>
  );
};

export default DropdownExample;
