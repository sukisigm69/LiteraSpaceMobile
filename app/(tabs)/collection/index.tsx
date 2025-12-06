// app/(tabs)/collection/index.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  TextInput,
  FlatList,
  Dimensions,
  Image,
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
  coverImage: any;
  isFeatured?: boolean;
}

// Data kategori
const categories = [
  { id: '1', name: 'All Books', count: 1243 },
  { id: '2', name: 'Fiction', count: 342 },
  { id: '3', name: 'Non-Fiction', count: 256 },
  { id: '4', name: 'Science', count: 189 },
  { id: '5', name: 'Technology', count: 156 },
  { id: '6', name: 'Biography', count: 98 },
  { id: '7', name: 'History', count: 134 },
];

// Data buku
const books: Book[] = [
  {
    id: '1',
    title: 'The Amazing World Of Ben Bocquelet',
    author: 'Ben Bocquelet',
    category: 'Fiction',
    rating: 4.7,
    pages: 320,
    coverImage: { uri: 'https://i.pinimg.com/736x/e6/7f/ba/e67fba11790309a2cfef13a4a3d2bfd6.jpg' },
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Journal 3',
    author: 'Rob Renzetti',
    category: 'Journal',
    rating: 5.0,
    pages: 280,
    coverImage: { uri: 'https://i.pinimg.com/1200x/34/d9/1a/34d91a03a5c8c8a683b53b7ffb1ae9b4.jpg' },
  },
  {
    id: '3',
    title: 'Book Of Bill',
    author: 'Alex Hirsch',
    category: 'Fiction',
    rating: 4.7,
    pages: 356,
    coverImage: { uri: 'https://i.pinimg.com/736x/ae/cd/25/aecd250504c8812d912d742dd9156325.jpg' },
  },
  {
    id: '4',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    category: 'Technology',
    rating: 4.8,
    pages: 176,
    coverImage: { uri: 'https://m.media-amazon.com/images/I/51gdVAEfPUL._SX379_.jpg' },
  },
  {
    id: '5',
    title: 'React Native Essentials',
    author: 'Ethan James',
    category: 'Technology',
    rating: 4.6,
    pages: 420,
    coverImage: { uri: 'https://m.media-amazon.com/images/I/41as+WafrFL._SX377_.jpg' },
  },
  {
    id: '6',
    title: 'Modern Web Design',
    author: 'Sarah Johnson',
    category: 'Technology',
    rating: 4.5,
    pages: 310,
    coverImage: { uri: 'https://i.pinimg.com/736x/1b/35/0a/1b350a004666a6159610d0718cd1012b.jpg' },
  },
  {
    id: '7',
    title: 'Atomic Habits',
    author: 'James Clear',
    category: 'Non-Fiction',
    rating: 4.9,
    pages: 320,
    coverImage: { uri: 'https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg' },
  },
  {
    id: '8',
    title: 'The Silent Patient',
    author: 'Alex Michaelides',
    category: 'Fiction',
    rating: 4.5,
    pages: 325,
    coverImage: { uri: 'https://images-na.ssl-images-amazon.com/images/I/71hT4AwcZPL.jpg' },
  },
];

export default function CollectionPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const router = useRouter();

  // Filter buku berdasarkan kategori dan pencarian
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === '1' ||
      categories.find((cat) => cat.id === selectedCategory)?.name === book.category;
    
    const matchesSearch =
      searchQuery === '' ||
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  // Render item buku
  const renderBookItem = ({ item }: { item: Book }) => (
    <TouchableOpacity
      style={viewMode === 'grid' ? styles.bookCardGrid : styles.bookCardList}
      activeOpacity={0.7}
      onPress={() => router.push(`/book/${item.id}`)}
    >
      <Image source={item.coverImage} style={styles.bookCover} resizeMode="cover" />
      
      <View style={styles.bookInfo}>
        <View style={styles.bookHeader}>
          <Text style={styles.bookTitle} numberOfLines={2}>
            {item.title}
          </Text>
          {item.isFeatured && (
            <View style={styles.featuredBadge}>
              <Text style={styles.featuredText}>Featured</Text>
            </View>
          )}
        </View>
        
        <Text style={styles.bookAuthor} numberOfLines={1}>
          {item.author}
        </Text>
        
        <View style={styles.bookMeta}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          </View>
        </View>
        
        <View style={styles.bookFooter}>
          <View style={styles.pagesInfo}>
            <Ionicons name="document-text-outline" size={14} color="#666" />
            <Text style={styles.pagesText}>{item.pages} pages</Text>
          </View>
          
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={18} color="#666" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Render kategori
  const renderCategory = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.categoryItemActive,
      ]}
      onPress={() => setSelectedCategory(item.id)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.categoryName,
          selectedCategory === item.id && styles.categoryNameActive,
        ]}
      >
        {item.name}
      </Text>
      <Text
        style={[
          styles.categoryCount,
          selectedCategory === item.id && styles.categoryCountActive,
        ]}
      >
        {item.count}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Digital Collection</Text>
          <Text style={styles.subtitle}>{books.length} books available</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'list' && styles.viewModeActive]}
            onPress={() => setViewMode('list')}
          >
            <Ionicons 
              name="list-outline" 
              size={20} 
              color={viewMode === 'list' ? '#FFFFFF' : '#666'} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.viewModeButton, viewMode === 'grid' && styles.viewModeActive]}
            onPress={() => setViewMode('grid')}
          >
            <Ionicons 
              name="grid-outline" 
              size={20} 
              color={viewMode === 'grid' ? '#FFFFFF' : '#666'} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search books, authors..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Book Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>
          Showing {filteredBooks.length} of {books.length} books
        </Text>
      </View>

      {/* Books Collection */}
      <FlatList
        data={filteredBooks}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
        key={viewMode}
        numColumns={viewMode === 'grid' ? 2 : 1}
        contentContainerStyle={[
          styles.booksList,
          filteredBooks.length === 0 && styles.emptyList,
        ]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color="#DDD" />
            <Text style={styles.emptyTitle}>No books found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filter
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  viewModeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModeActive: {
    backgroundColor: '#3498DB',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  categoryItemActive: {
    backgroundColor: '#3498DB',
    borderColor: '#2980B9',
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  categoryNameActive: {
    color: '#FFFFFF',
  },
  categoryCount: {
    fontSize: 11,
    color: '#999999',
    marginTop: 2,
  },
  categoryCountActive: {
    color: '#E3F2FD',
  },
  countContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  countText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  booksList: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyList: {
    flexGrow: 1,
  },
  bookCardGrid: {
    width: (width - 48) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: CARD_MARGIN,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bookCardList: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bookCover: {
    width: '100%',
    height: 180,
  },
  bookInfo: {
    padding: 16,
    flex: 1,
  },
  bookHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
    marginRight: 8,
    lineHeight: 20,
  },
  bookAuthor: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 12,
  },
  bookMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTag: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#3498DB',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: '600',
    color: '#333333',
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pagesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pagesText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#666666',
  },
  featuredBadge: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  moreButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#999999',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#BBBBBB',
    textAlign: 'center',
  },
});