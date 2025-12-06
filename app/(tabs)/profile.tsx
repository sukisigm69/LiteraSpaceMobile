// app/(tabs)/profile.tsx
import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
  Switch,
  Share,
  Appearance,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Data statistik pengguna
const userStats = {
  booksBorrowed: 24,
  booksReturned: 22,
  readingTime: 156,
  favoriteCategory: 'Fiction',
};

// Data buku yang sedang dipinjam
const borrowedBooks = [
  {
    id: '1',
    title: 'The Amazing World Of Gumball',
    author: 'Ben Bocquelet',
    dueDate: '2024-12-15',
    image: 'https://i.pinimg.com/736x/e6/7f/ba/e67fba11790309a2cfef13a4a3d2bfd6.jpg',
    progress: 65,
  },
  {
    id: '3',
    title: 'Book Of Bill',
    author: 'Alex Hirsch',
    dueDate: '2024-12-20',
    image: 'https://i.pinimg.com/736x/ae/cd/25/aecd250504c8812d912d742dd9156325.jpg',
    progress: 30,
  },
];

// Data menu profil
const profileMenu = [
  {
    id: '1',
    title: 'My Collection',
    icon: 'bookmark',
    color: '#3498db',
    action: 'collection',
  },
  {
    id: '2',
    title: 'Reading History',
    icon: 'time',
    color: '#2ecc71',
    action: 'history',
  },
  {
    id: '3',
    title: 'Wishlist',
    icon: 'heart',
    color: '#e74c3c',
    action: 'wishlist',
  },
  {
    id: '4',
    title: 'Settings',
    icon: 'settings',
    color: '#9b59b6',
    action: 'settings',
  },
  {
    id: '5',
    title: 'Help & Support',
    icon: 'help-circle',
    color: '#f39c12',
    action: 'help',
  },
  {
    id: '6',
    title: 'About',
    icon: 'information-circle',
    color: '#1abc9c',
    action: 'about',
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [autoRenew, setAutoRenew] = useState(true);
  const [readingReminder, setReadingReminder] = useState(false);

  const userName = "abigailb";
  const userEmail = "abigailb@email.com";
  const memberSince = "2023";

  // Apply dark mode when setting changes
  useEffect(() => {
    try {
      console.log('Dark mode:', darkMode ? 'enabled' : 'disabled');
    } catch (error) {
      console.error('Error applying dark mode:', error);
    }
  }, [darkMode]);

  // Handle menu action
  const handleMenuAction = useCallback((action: string) => {
    switch (action) {
      case 'collection':
        router.push('/(tabs)/collection');
        break;
      case 'history':
        Alert.alert('Reading History', 'Your reading history will appear here.');
        break;
      case 'wishlist':
        Alert.alert('Wishlist', 'Your wishlisted books will appear here.');
        break;
      case 'settings':
        Alert.alert('Settings', 'App settings panel.');
        break;
      case 'help':
        Alert.alert('Help & Support', 'Contact support@literaspace.com');
        break;
      case 'about':
        Alert.alert('About LiteraSpace', 'Version 1.0.0\n© 2024 LiteraSpace');
        break;
    }
  }, [router]);

  // Handle edit profile
  const handleEditProfile = useCallback(() => {
    Alert.alert('Edit Profile', 'Profile editing feature coming soon!');
  }, []);

  // Handle share profile
  const handleShareProfile = useCallback(async () => {
    try {
      await Share.share({
        message: `Check out my reading stats on LiteraSpace!\n\n📚 Books Borrowed: ${userStats.booksBorrowed}\n⏰ Reading Time: ${userStats.readingTime} hours\n⭐ Favorite Category: ${userStats.favoriteCategory}\n\nJoin me on LiteraSpace!`,
        title: 'My Reading Stats - LiteraSpace'
      });
    } catch (error) {
      Alert.alert('Oops!', 'Failed to share profile');
    }
  }, [userStats]);

  // Handle logout - REVISED untuk fix navigation issue
  const handleLogout = useCallback(() => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('Logout initiated, navigating to login...');
              
              // Gunakan router.push dengan timeout untuk memastikan Alert ditutup dulu
              setTimeout(() => {
                // Coba beberapa metode navigasi untuk memastikan berhasil
                try {
                  // Metode 1: Gunakan push
                  router.push('/login');
                  console.log('Navigation with push attempted');
                } catch (pushError) {
                  console.error('Push failed:', pushError);
                  
                  // Metode 2: Gunakan replace
                  try {
                    router.replace('/login');
                    console.log('Navigation with replace attempted');
                  } catch (replaceError) {
                    console.error('Replace failed:', replaceError);
                    
                    // Metode 3: Gunakan navigate
                    try {
                      router.navigate('/login');
                      console.log('Navigation with navigate attempted');
                    } catch (navigateError) {
                      console.error('Navigate failed:', navigateError);
                      Alert.alert('Error', 'Failed to navigate to login. Please restart the app.');
                    }
                  }
                }
              }, 100); // Beri sedikit delay untuk memastikan Alert ditutup
              
            } catch (error) {
              console.error('Logout error:', error);
              // Fallback navigation
              setTimeout(() => {
                router.push('/login');
              }, 100);
            }
          }
        }
      ]
    );
  }, [router]);

  // Handle switch toggle
  const handleSwitchToggle = useCallback((setting: string, value: boolean) => {
    switch (setting) {
      case 'notifications':
        setNotifications(value);
        Alert.alert('Notifications', value ? 'Notifications enabled' : 'Notifications disabled');
        break;
      case 'darkMode':
        setDarkMode(value);
        Alert.alert('Dark Mode', value ? 'Dark mode enabled' : 'Dark mode disabled');
        break;
      case 'autoRenew':
        setAutoRenew(value);
        Alert.alert('Auto Renew', value ? 'Auto renew enabled' : 'Auto renew disabled');
        break;
      case 'readingReminder':
        setReadingReminder(value);
        Alert.alert('Reading Reminder', value ? 'Reading reminder enabled' : 'Reading reminder disabled');
        break;
    }
  }, []);

  // Define styles based on dark mode
  const getStyles = () => {
    const isDark = darkMode;
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: isDark ? '#121212' : '#f8f9fa',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 15,
        backgroundColor: isDark ? '#1e1e1e' : '#fff',
        borderBottomWidth: 1,
        borderBottomColor: isDark ? '#333' : '#ecf0f1',
      },
      headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: isDark ? '#fff' : '#2C3E50',
      },
      headerActions: {
        flexDirection: 'row',
        gap: 15,
      },
      headerButton: {
        padding: 8,
      },
      content: {
        flex: 1,
      },
      profileSection: {
        backgroundColor: isDark ? '#1e1e1e' : '#fff',
        padding: 20,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? '#333' : '#ecf0f1',
      },
      profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      },
      avatarContainer: {
        position: 'relative',
        marginRight: 20,
      },
      avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#3498db',
      },
      editAvatarButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#3498db',
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: isDark ? '#1e1e1e' : '#fff',
      },
      profileInfo: {
        flex: 1,
      },
      userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: isDark ? '#fff' : '#2C3E50',
        marginBottom: 4,
      },
      userEmail: {
        fontSize: 14,
        color: isDark ? '#aaa' : '#7f8c8d',
        marginBottom: 8,
      },
      memberSinceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
      },
      memberSinceText: {
        fontSize: 12,
        color: isDark ? '#aaa' : '#7f8c8d',
      },
      statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: isDark ? '#252525' : '#f8f9fa',
        padding: 20,
        borderRadius: 12,
      },
      statItem: {
        alignItems: 'center',
      },
      statIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: isDark ? '#2c3e50' : '#EBF5FB',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
      },
      statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: isDark ? '#fff' : '#2C3E50',
        marginBottom: 4,
      },
      statLabel: {
        fontSize: 12,
        color: isDark ? '#aaa' : '#7f8c8d',
      },
      borrowedSection: {
        backgroundColor: isDark ? '#1e1e1e' : '#fff',
        padding: 20,
        marginBottom: 15,
      },
      sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
      },
      sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: isDark ? '#fff' : '#2C3E50',
      },
      seeAllText: {
        fontSize: 14,
        color: '#3498db',
        fontWeight: '500',
      },
      borrowedBookCard: {
        flexDirection: 'row',
        backgroundColor: isDark ? '#252525' : '#f8f9fa',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
      },
      borrowedBookImage: {
        width: 70,
        height: 90,
        borderRadius: 8,
        marginRight: 15,
      },
      borrowedBookInfo: {
        flex: 1,
        justifyContent: 'space-between',
      },
      borrowedBookTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: isDark ? '#fff' : '#2C3E50',
        marginBottom: 4,
      },
      borrowedBookAuthor: {
        fontSize: 14,
        color: isDark ? '#aaa' : '#7f8c8d',
        marginBottom: 10,
      },
      progressContainer: {
        marginBottom: 10,
      },
      progressBar: {
        height: 6,
        backgroundColor: isDark ? '#333' : '#ecf0f1',
        borderRadius: 3,
        overflow: 'hidden',
        marginBottom: 4,
      },
      progressFill: {
        height: '100%',
        backgroundColor: '#2ecc71',
        borderRadius: 3,
      },
      progressText: {
        fontSize: 12,
        color: isDark ? '#aaa' : '#7f8c8d',
        textAlign: 'right',
      },
      dueDateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
      },
      dueDateText: {
        fontSize: 12,
        color: '#e74c3c',
        fontWeight: '500',
      },
      menuSection: {
        backgroundColor: isDark ? '#1e1e1e' : '#fff',
        padding: 20,
        marginBottom: 15,
      },
      menuGrid: {
        gap: 10,
      },
      menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: isDark ? '#333' : '#f5f5f5',
      },
      menuIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
      },
      menuTitle: {
        flex: 1,
        fontSize: 16,
        color: isDark ? '#fff' : '#2C3E50',
      },
      settingsSection: {
        backgroundColor: isDark ? '#1e1e1e' : '#fff',
        padding: 20,
        marginBottom: 15,
      },
      settingsList: {
        gap: 15,
      },
      settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
      },
      settingIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isDark ? '#252525' : '#f8f9fa',
      },
      settingTitle: {
        fontSize: 16,
        color: isDark ? '#fff' : '#2C3E50',
      },
      logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDark ? '#252525' : '#fff',
        marginHorizontal: 20,
        marginBottom: 15,
        paddingVertical: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: isDark ? '#333' : '#FDEDED',
        gap: 10,
      },
      logoutButtonText: {
        fontSize: 16,
        color: '#e74c3c',
        fontWeight: '600',
      },
      versionContainer: {
        alignItems: 'center',
        paddingVertical: 20,
      },
      versionText: {
        fontSize: 12,
        color: isDark ? '#666' : '#bdc3c7',
      },
      bottomSpacer: {
        height: 40,
      },
    });
  };

  const styles = getStyles();

  // Render stat item
  const renderStatItem = (icon: string, value: string | number, label: string) => (
    <View style={styles.statItem}>
      <View style={styles.statIconContainer}>
        <Ionicons name={icon as any} size={20} color="#3498db" />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  // Render borrowed book
  const renderBorrowedBook = (book: typeof borrowedBooks[0]) => (
    <TouchableOpacity
      key={book.id}
      style={styles.borrowedBookCard}
      onPress={() => router.push(`/book/${book.id}`)}
    >
      <Image source={{ uri: book.image }} style={styles.borrowedBookImage} />
      <View style={styles.borrowedBookInfo}>
        <Text style={styles.borrowedBookTitle} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.borrowedBookAuthor}>{book.author}</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${book.progress}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>{book.progress}% read</Text>
        </View>
        <View style={styles.dueDateContainer}>
          <Ionicons name="calendar" size={14} color="#e74c3c" />
          <Text style={styles.dueDateText}>Due: {book.dueDate}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render menu item
  const renderMenuItem = (item: typeof profileMenu[0]) => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => handleMenuAction(item.action)}
    >
      <View style={[styles.menuIconContainer, { backgroundColor: `${item.color}${darkMode ? '30' : '15'}` }]}>
        <Ionicons name={item.icon as any} size={22} color={item.color} />
      </View>
      <Text style={styles.menuTitle}>{item.title}</Text>
      <Ionicons name="chevron-forward" size={20} color={darkMode ? '#666' : '#bdc3c7'} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={darkMode ? "light-content" : "dark-content"} backgroundColor={darkMode ? "#121212" : "#f8f9fa"} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={handleShareProfile}>
            <Ionicons name="share-outline" size={22} color={darkMode ? "#fff" : "#2C3E50"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handleEditProfile}>
            <Ionicons name="settings-outline" size={22} color={darkMode ? "#fff" : "#2C3E50"} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://ui-avatars.com/api/?name=AB&background=3498db&color=fff&size=200' }}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.userName}>{userName}</Text>
              <Text style={styles.userEmail}>{userEmail}</Text>
              <View style={styles.memberSinceContainer}>
                <Ionicons name="calendar" size={14} color={darkMode ? "#aaa" : "#7f8c8d"} />
                <Text style={styles.memberSinceText}>Member since {memberSince}</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsContainer}>
            {renderStatItem('book', userStats.booksBorrowed, 'Borrowed')}
            {renderStatItem('checkmark-circle', userStats.booksReturned, 'Returned')}
            {renderStatItem('time', `${userStats.readingTime}h`, 'Reading')}
            {renderStatItem('star', userStats.favoriteCategory, 'Favorite')}
          </View>
        </View>

        {borrowedBooks.length > 0 && (
          <View style={styles.borrowedSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Currently Borrowed</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/collection')}>
                <Text style={styles.seeAllText}>View All</Text>
              </TouchableOpacity>
            </View>
            {borrowedBooks.map(renderBorrowedBook)}
          </View>
        )}

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <View style={styles.menuGrid}>
            {profileMenu.map(renderMenuItem)}
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconContainer}>
                  <Ionicons name="notifications" size={20} color={darkMode ? "#aaa" : "#7f8c8d"} />
                </View>
                <Text style={styles.settingTitle}>Push Notifications</Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={(value) => handleSwitchToggle('notifications', value)}
                trackColor={{ false: '#ecf0f1', true: '#3498db' }}
                thumbColor="#fff"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconContainer}>
                  <Ionicons name="moon" size={20} color={darkMode ? "#aaa" : "#7f8c8d"} />
                </View>
                <Text style={styles.settingTitle}>Dark Mode</Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={(value) => handleSwitchToggle('darkMode', value)}
                trackColor={{ false: '#ecf0f1', true: '#3498db' }}
                thumbColor="#fff"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconContainer}>
                  <Ionicons name="refresh" size={20} color={darkMode ? "#aaa" : "#7f8c8d"} />
                </View>
                <Text style={styles.settingTitle}>Auto Renew</Text>
              </View>
              <Switch
                value={autoRenew}
                onValueChange={(value) => handleSwitchToggle('autoRenew', value)}
                trackColor={{ false: '#ecf0f1', true: '#3498db' }}
                thumbColor="#fff"
              />
            </View>
            
            <View style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <View style={styles.settingIconContainer}>
                  <Ionicons name="alarm" size={20} color={darkMode ? "#aaa" : "#7f8c8d"} />
                </View>
                <Text style={styles.settingTitle}>Reading Reminder</Text>
              </View>
              <Switch
                value={readingReminder}
                onValueChange={(value) => handleSwitchToggle('readingReminder', value)}
                trackColor={{ false: '#ecf0f1', true: '#3498db' }}
                thumbColor="#fff"
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={20} color="#e74c3c" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>LiteraSpace v1.0.0</Text>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}