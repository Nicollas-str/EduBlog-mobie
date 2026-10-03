import { ILoadingDotsProps } from "@/interfaces/ui/IUiLoading";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

export function LoadingDots({ text = "Carregando" }: ILoadingDotsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>

      <ActivityIndicator size="small" color="#ffffff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  text: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
  },
});
