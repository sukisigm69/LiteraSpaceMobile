// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Custom header component untuk mendukung dark mode
function CustomHeader() {
  const { darkMode } = useTheme();
  
  return null; // Component ini hanya untuk mengakses theme context
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StackWithTheme />
    </ThemeProvider>
  );
}

function StackWithTheme() {
  const { darkMode } = useTheme();
  
  return (
    <>
      <CustomHeader />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: darkMode ? '#1e1e1e' : '#fff',
          },
          headerTintColor: darkMode ? '#fff' : '#2C3E50',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: darkMode ? '#fff' : '#2C3E50',
          },
          headerBackTitle: 'Kembali',
          headerShadowVisible: false,
          contentStyle: {
            backgroundColor: darkMode ? '#121212' : '#f8f9fa',
          },
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="book/[id]" 
          options={{ 
            title: 'Detail Buku',
            headerShown: true,
          }} 
        />
        <Stack.Screen 
          name="login" 
          options={{ 
            title: 'Login',
            headerShown: true,
          }} 
        />
        {/* Tambahkan screen lainnya di sini */}
      </Stack>
      <StatusBar style={darkMode ? "light" : "dark"} />
    </>
  );
}