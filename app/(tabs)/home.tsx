// app/(tabs)/home/index.tsx
import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Tipe data untuk buku
interface Book {
  id: string;
  title: string;
  author: string;
  rating: number;
  coverImage: any;
  isFavorite?: boolean;
}

// Data contoh buku dengan gambar
const availableBooks: Book[] = [
  { 
    id: '1', 
    title: 'The Amazing World Of Gumball', 
    author: 'Ben Bocquelet', 
    rating: 4.7,
    coverImage: { uri: 'https://i.pinimg.com/736x/e6/7f/ba/e67fba11790309a2cfef13a4a3d2bfd6.jpg' }
  },
  { 
    id: '2', 
    title: 'Journal 3', 
    author: 'Rob Renzetti', 
    rating: 5.0,
    coverImage: { uri: 'https://i.pinimg.com/1200x/34/d9/1a/34d91a03a5c8c8a683b53b7ffb1ae9b4.jpg' }
  },
  { 
    id: '3', 
    title: 'Book Of Bill', 
    author: 'Alex Hirsch', 
    rating: 4.7,
    coverImage: { uri: 'https://i.pinimg.com/736x/ae/cd/25/aecd250504c8812d912d742dd9156325.jpg' }
  },
  { 
    id: '4', 
    title: 'Javascript: The Good Parts', 
    author: 'Douglas Crockford', 
    rating: 4.8,
    coverImage: { uri: 'https://m.media-amazon.com/images/I/51gdVAEfPUL._SX379_.jpg' }
  },
];

// Data buku favorit
const favoriteBooks: Book[] = [
  { 
    id: 'f1', 
    title: 'The Amazing World Of Gumball', 
    author: 'Ben Bocquelet', 
    rating: 4.7,
    coverImage: { uri: 'https://i.pinimg.com/736x/e6/7f/ba/e67fba11790309a2cfef13a4a3d2bfd6.jpg' },
    isFavorite: true 
  },
];

export default function HomePage() {
  const userName = "abigailb";
  const router = useRouter();
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome, {userName}!</Text>
          <Text style={styles.subtitle}>Continue your book borrowing activities today</Text>
        </View>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.avatarContainer}>
            <Text style={styles.avatarText}>AB</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Section: Books That Can Be Borrowed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Books That Can Be Borrowed</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/collection' as any)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
            contentContainerStyle={styles.horizontalScrollContent}
          >
            {availableBooks.map((book) => (
              <TouchableOpacity 
                key={book.id} 
                style={styles.bookCardHorizontal}
                activeOpacity={0.7}
                onPress={() => router.push(`/book/${book.id}`)}
              >
                <Image 
                  source={book.coverImage} 
                  style={styles.bookCover}
                  resizeMode="cover"
                />
                <View style={styles.bookInfo}>
                  <Text style={styles.bookTitle} numberOfLines={2}>
                    {book.title}
                  </Text>
                  <Text style={styles.bookAuthor}>{book.author}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{book.rating}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Section: Favorite */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Favorite</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/collection' as any)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.favoriteContainer}>
            {favoriteBooks.map((book) => (
              <TouchableOpacity 
                key={book.id} 
                style={styles.favoriteCard}
                activeOpacity={0.7}
                onPress={() => router.push(`/book/${book.id}`)}
              >
                <Image 
                  source={book.coverImage} 
                  style={styles.favoriteCover}
                  resizeMode="cover"
                />
                <View style={styles.favoriteInfo}>
                  <Text style={styles.favoriteTitle} numberOfLines={2}>
                    {book.title}
                  </Text>
                  <Text style={styles.favoriteAuthor}>{book.author}</Text>
                  <View style={styles.favoriteRatingContainer}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{book.rating}</Text>
                    <TouchableOpacity style={styles.favoriteIcon}>
                      <Ionicons name="heart" size={16} color="#e74c3c" />
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Section: Available Books */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Books</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/collection' as any)}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.booksGrid}>
            {availableBooks.map((book) => (
              <TouchableOpacity 
                key={book.id} 
                style={styles.bookCard}
                activeOpacity={0.7}
                onPress={() => router.push(`/book/${book.id}`)}
              >
                <Image 
                  source={book.coverImage} 
                  style={styles.bookCoverVertical}
                  resizeMode="cover"
                />
                <View style={styles.bookDetails}>
                  <Text style={styles.bookTitleVertical} numberOfLines={2}>
                    {book.title}
                  </Text>
                  <Text style={styles.bookAuthorVertical}>{book.author}</Text>
                  <View style={styles.bookFooter}>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{book.rating}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.detailButton}
                      onPress={() => router.push(`/book/${book.id}`)}
                    >
                      <Text style={styles.detailButtonText}>See Detail</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom Spacer untuk Tab Navigation */}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginRight: 16,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20, // Padding untuk tab navigation
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3498db',
  },
  horizontalScroll: {
    marginHorizontal: -16,
  },
  horizontalScrollContent: {
    paddingHorizontal: 16,
  },
  bookCardHorizontal: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCover: {
    width: '100%',
    height: 120,
  },
  bookInfo: {
    padding: 12,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  favoriteContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  favoriteCard: {
    flexDirection: 'row',
  },
  favoriteCover: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  favoriteInfo: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  favoriteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  favoriteAuthor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  favoriteRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  favoriteIcon: {
    marginLeft: 'auto',
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookCoverVertical: {
    width: '100%',
    height: 140,
  },
  bookDetails: {
    padding: 12,
  },
  bookTitleVertical: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  bookAuthorVertical: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 80, // Space untuk tab navigation
  },
});