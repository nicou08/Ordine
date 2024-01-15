import { View, Text, TextInput } from "react-native";

export default function HomeSearchHeader({ title }: { title: string }) {
  return (
    <View
      style={{
        height: 170,
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
      <Text>Hello {title}</Text>
    </View>
  );
}
