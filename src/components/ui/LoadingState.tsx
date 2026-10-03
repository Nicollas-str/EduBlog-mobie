import { StyleSheet, Text, View } from "react-native";

import type { ILoadingStateProps } from "../../interfaces/ui/IUiLoading";

export default function LoadingState({ message }: ILoadingStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    paddingHorizontal: 32,
    paddingVertical: 24,
    elevation: 3,
    shadowColor: "#0f172a",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 24,
  },

  message: {
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b",
  },
});
