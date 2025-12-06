// app/(tabs)/search/index.tsx
import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Dimensions,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Tipe data untuk buku
interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  rating: number;
  pages: number;
  publishedYear: number;
  image: string;
  isAvailable?: boolean;
  isFeatured?: boolean;
}

// Data buku lengkap
const allBooks: Book[] = [
  {
    id: '1',
    title: 'The Amazing World Of Gumball',
    author: 'Ben Bocquelet',
    category: 'Fiction',
    rating: 4.7,
    pages: 320,
    publishedYear: 2015,
    image: 'https://i.pinimg.com/736x/e6/7f/ba/e67fba11790309a2cfef13a4a3d2bfd6.jpg',
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Journal 3',
    author: 'Rob Renzetti',
    category: 'Journal',
    rating: 5.0,
    pages: 280,
    publishedYear: 2018,
    image: 'https://i.pinimg.com/1200x/34/d9/1a/34d91a03a5c8c8a683b53b7ffb1ae9b4.jpg',
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Book Of Bill',
    author: 'Alex Hirsch',
    category: 'Fiction',
    rating: 4.7,
    pages: 356,
    publishedYear: 2016,
    image: 'https://i.pinimg.com/736x/ae/cd/25/aecd250504c8812d912d742dd9156325.jpg',
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    category: 'Technology',
    rating: 4.8,
    pages: 176,
    publishedYear: 2008,
    image: 'https://m.media-amazon.com/images/I/51gdVAEfPUL._SX379_.jpg',
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: '5',
    title: 'React Native Essentials',
    author: 'Ethan James',
    category: 'Technology',
    rating: 4.6,
    pages: 420,
    publishedYear: 2022,
    image: 'https://m.media-amazon.com/images/I/41as+WafrFL._SX377_.jpg',
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: '6',
    title: 'Modern Web Design',
    author: 'Sarah Johnson',
    category: 'Technology',
    rating: 4.5,
    pages: 310,
    publishedYear: 2023,
    image: 'https://i.pinimg.com/736x/1b/35/0a/1b350a004666a6159610d0718cd1012b.jpg',
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: '7',
    title: 'Digital Art Mastery',
    author: 'Michael Chen',
    category: 'Art',
    rating: 4.9,
    pages: 240,
    publishedYear: 2021,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    isAvailable: false,
    isFeatured: true,
  },
  {
    id: '8',
    title: 'Machine Learning Basics',
    author: 'David Wilson',
    category: 'Technology',
    rating: 4.4,
    pages: 380,
    publishedYear: 2020,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w-400',
    isAvailable: true,
    isFeatured: false,
  },
];

// Data kategori untuk filter
const categories = [
  { id: 'all', name: 'All', icon: 'grid' },
  { id: 'fiction', name: 'Fiction', icon: 'book' },
  { id: 'technology', name: 'Technology', icon: 'code' },
  { id: 'journal', name: 'Journal', icon: 'journal' },
  { id: 'art', name: 'Art', icon: 'color-palette' },
];

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(['Gumball', 'JavaScript', 'React']);

  // Filter buku berdasarkan pencarian dan kategori
  const filteredBooks = useMemo(() => {
    setIsSearching(true);
    
    let filtered = allBooks;
    
    // Filter berdasarkan kategori
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(book => 
        book.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }
    
    // Filter berdasarkan pencarian
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.category.toLowerCase().includes(query)
      );
    }
    
    // Simulasi loading
    setTimeout(() => setIsSearching(false), 300);
    
    return filtered;
  }, [searchQuery, selectedCategory]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim() && !recentSearches.includes(query)) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
  }, [recentSearches]);

  // Clear search
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    Keyboard.dismiss();
  }, []);

  // Remove recent search
  const handleRemoveRecentSearch = useCallback((search: string) => {
    setRecentSearches(prev => prev.filter(s => s !== search));
  }, []);

  // Clear all recent searches
  const handleClearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, []);

  // Navigate to book detail
  const navigateToBookDetail = useCallback((bookId: string) => {
    router.push(`/book/${bookId}`);
  }, [router]);

  // Render item buku
  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={styles.bookCard}
      onPress={() => navigateToBookDetail(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.bookImage} />
      <View style={styles.bookInfo}>
        <Text style={styles.bookTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.bookAuthor}>{item.author}</Text>
        <View style={styles.bookMeta}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{item.category}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFB800" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.bookFooter}>
          <Text style={styles.pagesText}>{item.pages} pages</Text>
          {!item.isAvailable && (
            <View style={styles.unavailableBadge}>
              <Text style={styles.unavailableText}>Borrowed</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render recent search item
  const renderRecentSearch = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.recentSearchItem}
      onPress={() => handleSearch(item)}
    >
      <Ionicons name="time-outline" size={16} color="#7f8c8d" />
      <Text style={styles.recentSearchText}>{item}</Text>
      <TouchableOpacity
        onPress={() => handleRemoveRecentSearch(item)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="close" size={16} color="#bdc3c7" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Render kategori filter
  const renderCategory = (category: typeof categories[0]) => (
    <TouchableOpacity
      key={category.id}
      style={[
        styles.categoryButton,
        selectedCategory === category.id && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Ionicons
        name={category.icon as any}
        size={18}
        color={selectedCategory === category.id ? '#3498db' : '#7f8c8d'}
      />
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category.id && styles.categoryButtonTextActive,
        ]}
      >
        {category.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Search Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Search Books</Text>
        <Text style={styles.headerSubtitle}>Find your next favorite book</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={22} color="#7f8c8d" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search books, authors, categories..."
            placeholderTextColor="#95a5a6"
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
            onSubmitEditing={() => Keyboard.dismiss()}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#95a5a6" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filters */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map(renderCategory)}
        </ScrollView>
      </View>

      {/* Content */}
      {searchQuery.trim() || selectedCategory !== 'all' ? (
        // Search Results
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={styles.resultsTitle}>
              {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
            </Text>
            <Text style={styles.resultsSubtitle}>
              {selectedCategory !== 'all' ? `in ${selectedCategory}` : 'in all categories'}
            </Text>
          </View>

          {isSearching ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#3498db" />
              <Text style={styles.loadingText}>Searching books...</Text>
            </View>
          ) : filteredBooks.length > 0 ? (
            <FlatList
              data={filteredBooks}
              renderItem={renderBookItem}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.booksList}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={80} color="#ddd" />
              <Text style={styles.emptyTitle}>No books found</Text>
              <Text style={styles.emptyText}>
                Try a different search term or category
              </Text>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
              >
                <Text style={styles.resetButtonText}>Reset Search</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        // Recent Searches & Recommendations
        <View style={styles.initialContainer}>
          {recentSearches.length > 0 && (
            <View style={styles.recentSearchesContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                <TouchableOpacity onPress={handleClearRecentSearches}>
                  <Text style={styles.clearAllText}>Clear all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={recentSearches}
                renderItem={renderRecentSearch}
                keyExtractor={(item, index) => index.toString()}
                scrollEnabled={false}
              />
            </View>
          )}

          {/* Popular Searches */}
          <View style={styles.recommendationsContainer}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
            <View style={styles.popularTags}>
              {['JavaScript', 'React Native', 'Fiction', 'Design', 'Art'].map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={styles.popularTag}
                  onPress={() => handleSearch(tag)}
                >
                  <Ionicons name="trending-up" size={14} color="#3498db" />
                  <Text style={styles.popularTagText}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Featured Books */}
          <View style={styles.featuredContainer}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Featured Books</Text>
              <TouchableOpacity onPress={() => router.push('/(tabs)/collection' as any)}>
                <Text style={styles.seeAllText}>See all</Text>
              </TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {allBooks
                .filter(book => book.isFeatured)
                .map(book => (
                  <TouchableOpacity
                    key={book.id}
                    style={styles.featuredBookCard}
                    onPress={() => navigateToBookDetail(book.id)}
                  >
                    <Image source={{ uri: book.image }} style={styles.featuredBookImage} />
                    <Text style={styles.featuredBookTitle} numberOfLines={2}>
                      {book.title}
                    </Text>
                    <Text style={styles.featuredBookAuthor}>{book.author}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

// ScrollView komponen
import { ScrollView } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2C3E50',
  },
  clearButton: {
    padding: 4,
  },
  categoriesContainer: {
    paddingVertical: 10,
  },
  categoriesScrollContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#3498db',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7f8c8d',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  resultsContainer: {
    flex: 1,
  },
  resultsHeader: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
    backgroundColor: '#fff',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2C3E50',
  },
  resultsSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#7f8c8d',
  },
  booksList: {
    padding: 20,
    paddingBottom: 30,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  bookImage: {
    width: 80,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  bookInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  bookMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryTag: {
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryTagText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pagesText: {
    fontSize: 12,
    color: '#95a5a6',
  },
  unavailableBadge: {
    backgroundColor: '#FDEDED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  unavailableText: {
    fontSize: 10,
    color: '#e74c3c',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#7f8c8d',
    marginTop: 20,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#bdc3c7',
    textAlign: 'center',
    marginBottom: 20,
  },
  resetButton: {
    backgroundColor: '#3498db',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  initialContainer: {
    flex: 1,
    paddingBottom: 30,
  },
  recentSearchesContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
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
    color: '#2C3E50',
  },
  clearAllText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    gap: 12,
  },
  recentSearchText: {
    flex: 1,
    fontSize: 16,
    color: '#34495e',
  },
  recommendationsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  popularTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  popularTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  popularTagText: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '500',
  },
  featuredContainer: {
    padding: 20,
    backgroundColor: '#fff',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  featuredBookCard: {
    width: 140,
    marginRight: 15,
  },
  featuredBookImage: {
    width: 140,
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  featuredBookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
    lineHeight: 18,
  },
  featuredBookAuthor: {
    fontSize: 12,
    color: '#7f8c8d',
  },
});