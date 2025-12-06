import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface AuthFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  username?: string;
  setUsername?: (username: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
  isLogin: boolean;
  switchAuthMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  isLoading,
  onSubmit,
  isLogin,
  switchAuthMode,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogin ? 'Login ke LiteraSpace' : 'Daftar ke LiteraSpace'}
      </Text>
      
      <Text style={styles.subtitle}>
        {isLogin ? 'Masuk ke akun Anda' : 'Buat akun baru'}
      </Text>
      
      {!isLogin && setUsername && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      )}
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>
            {isLogin ? 'Login' : 'Daftar'}
          </Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity onPress={switchAuthMode} style={styles.switchButton}>
        <Text style={styles.switchText}>
          {isLogin 
            ? 'Belum punya akun? Daftar di sini' 
            : 'Sudah punya akun? Login di sini'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  input: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    marginTop: 24,
    alignItems: 'center',
    padding: 12,
  },
  switchText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default AuthForm;