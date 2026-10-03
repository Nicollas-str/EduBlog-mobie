import { Stack } from "expo-router";

import { AuthProvider, useAuth } from "../context/AuthContext";
import { ToastProvider, useToast } from "../context/ToastContext";

import LoadingState from "../components/ui/LoadingState";
import ToastContainer from "../components/ui/ToastContainer";

function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  const { toasts, removeToast } = useToast();

  if (isLoading) {
    return <LoadingState message="Carregando..." />;
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Protected guard={isAuthenticated}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>

        <Stack.Protected guard={!isAuthenticated}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ToastProvider>
        <RootNavigator />
      </ToastProvider>
    </AuthProvider>
  );
}
