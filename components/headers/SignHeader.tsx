import { router } from "expo-router";
//import { Text, View } from "../../components/Themed";
import { AntDesign } from "@expo/vector-icons";
import { View, Text, TouchableOpacity } from "react-native";

export default function SignHeader({ title }: { title: string }) {
  return (
    <View
      style={{
        height: 160,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginBottom: 10,
          marginLeft: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ width: 30, marginBottom: 15 }}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>

        <Text style={{ color: "black", fontSize: 37, fontWeight: "bold" }}>
          {title}
        </Text>
      </View>
    </View>
  );
}
