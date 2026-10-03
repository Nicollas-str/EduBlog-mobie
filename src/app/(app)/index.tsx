import { Pressable, StyleSheet, Text, View } from "react-native";

import { useAuth } from "../../context/AuthContext";

export default function HomeScreen() {
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EduBlog</Text>

      <Text style={styles.text}>Usuário autenticado.</Text>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
  },

  text: {
    marginTop: 8,
    fontSize: 16,
    color: "#64748b",
  },

  button: {
    marginTop: 24,
    minWidth: 140,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#dc2626",
    borderRadius: 10,
    paddingHorizontal: 24,
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
});
