import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { supabase } from "../../utils/supabase";

export default function AccountScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={styles.title}>ACCOUNT</Text>
      <View style={styles.separator} />
      <TouchableOpacity
        style={{ marginTop: 100, backgroundColor: "red" }}
        onPress={() => supabase.auth.signOut()}
      >
        <Text>SIGNNN OUTT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
