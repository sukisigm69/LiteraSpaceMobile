import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Type definitions matching Collection
type Book = {
  id: string;
  title: string;
  author: string;
  image: string;
  category: string;
  rating: number;
  description: string;
  pages: number;
  publishedYear: number;
  isAvailable?: boolean;
};

// Get screen dimensions
const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size: number) => {
  const baseWidth = 375;
  return Math.round((SCREEN_WIDTH / baseWidth) * size);
};

const scaleFont = (size: number) => {
  const baseWidth = 375;
  const scaledSize = (SCREEN_WIDTH / baseWidth) * size;
  
  if (SCREEN_WIDTH < 350) return Math.max(10, Math.round(scaledSize * 0.9));
  if (SCREEN_WIDTH > 450) return Math.min(24, Math.round(scaledSize * 1.1));
  
  return Math.round(scaledSize);
};

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState<Book[]>([
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      image: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&h=300&fit=crop',
      category: 'Classic',
      rating: 4.5,
      description: 'A classic novel of the Jazz Age, telling the story of the mysterious millionaire Jay Gatsby and his obsession with the beautiful Daisy Buchanan.',
      pages: 218,
      publishedYear: 1925,
      isAvailable: true,
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
      category: 'Fiction',
      rating: 4.8,
      description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
      pages: 324,
      publishedYear: 1960,
      isAvailable: true,
    },
    {
      id: '3',
      title: '1984',
      author: 'George Orwell',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
      category: 'Dystopian',
      rating: 4.7,
      description: 'A dystopian social science fiction novel about totalitarian regime and thought control.',
      pages: 328,
      publishedYear: 1949,
      isAvailable: false,
    },
    {
      id: '4',
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop',
      category: 'Romance',
      rating: 4.6,
      description: 'A romantic novel that charts the emotional development of protagonist Elizabeth Bennet.',
      pages: 432,
      publishedYear: 1813,
      isAvailable: true,
    },
    {
      id: '5',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=300&fit=crop',
      category: 'Fantasy',
      rating: 4.8,
      description: 'A fantasy novel about the adventures of hobbit Bilbo Baggins.',
      pages: 310,
      publishedYear: 1937,
      isAvailable: true,
    },
    {
      id: '6',
      title: 'Harry Potter and the Philosopher\'s Stone',
      author: 'J.K. Rowling',
      image: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400&h=300&fit=crop',
      category: 'Fantasy',
      rating: 4.9,
      description: 'The first novel in the Harry Potter series about a young wizard.',
      pages: 320,
      publishedYear: 1997,
      isAvailable: true,
    },
  ]);

  const removeFromFavorite = (id: string) => {
    Alert.alert(
      'Hapus Favorite',
      'Apakah Anda yakin ingin menghapus buku ini dari favorite?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            setFavorites(favorites.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  const handleBookPress = (bookId: string) => {
    router.push({
      pathname: '/book/[id]',
      params: { id: bookId }
    } as any);
  };

  const handleReadSample = (bookId: string) => {
    router.push({
      pathname: '/read-sample',
      params: { bookId }
    } as any);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/' as any);
    }
  };

  const renderFavoriteItem = ({ item }: { item: Book }) => (
    <View style={styles.bookCard}>
      {/* Book Content - Tap untuk ke detail */}
      <TouchableOpacity 
        style={styles.bookContent}
        onPress={() => handleBookPress(item.id)}
      >
        <View style={styles.bookImageContainer}>
          <Image 
            source={{ uri: item.image }} 
            style={styles.bookImage}
            resizeMode="cover"
            onError={(e) => {
              console.log('Error loading image:', e.nativeEvent.error);
              // Fallback ke gambar default jika error
            }}
          />
          {!item.isAvailable && (
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Dipinjam</Text>
            </View>
          )}
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={scale(12)} color="#FFD700" />
            <Text style={styles.ratingBadgeText}>{item.rating}</Text>
          </View>
        </View>
        
        <View style={styles.bookInfo}>
          <Text style={styles.bookTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.bookAuthor} numberOfLines={1}>{item.author}</Text>
          
          <View style={styles.bookMeta}>
            <View style={styles.categoryTag}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            <Text style={styles.bookYear}>{item.publishedYear}</Text>
          </View>
          
          <Text style={styles.bookDescription} numberOfLines={2}>
            {item.description}
          </Text>
          
          <View style={styles.bookStats}>
            <View style={styles.stat}>
              <Ionicons name="book-outline" size={scale(14)} color="#666" />
              <Text style={styles.statText}>{item.pages} halaman</Text>
            </View>
            <View style={styles.availability}>
              <Ionicons 
                name={item.isAvailable ? "checkmark-circle" : "time"} 
                size={scale(14)} 
                color={item.isAvailable ? "#34C759" : "#FF9500"} 
              />
              <Text style={[
                styles.availabilityText,
                { color: item.isAvailable ? "#34C759" : "#FF9500" }
              ]}>
                {item.isAvailable ? "Tersedia" : "Dipinjam"}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      
      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={styles.readSampleButton}
          onPress={() => handleReadSample(item.id)}
        >
          <Ionicons name="play-circle-outline" size={scale(16)} color="#007AFF" />
          <Text style={styles.readSampleText}>Baca Sample</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeFromFavorite(item.id)}
        >
          <Ionicons name="heart" size={scale(20)} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={scale(24)} color="#333" />
        </TouchableOpacity>
        
        <View style={styles.headerTitle}>
          <Text style={styles.headerTitleText}>Buku Favorite</Text>
          <Text style={styles.headerSubtitle}>{favorites.length} buku disimpan</Text>
        </View>
        
        <View style={styles.headerRight} />
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={scale(64)} color="#ccc" />
          <Text style={styles.emptyStateTitle}>Belum ada favorite</Text>
          <Text style={styles.emptyStateText}>
            Tambahkan buku ke favorite untuk melihatnya di sini
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.push('/collection' as any)}
          >
            <Text style={styles.browseButtonText}>Jelajahi Koleksi</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    paddingTop: scale(60),
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  backButton: {
    padding: scale(8),
    marginRight: scale(8),
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  headerSubtitle: {
    fontSize: scaleFont(12),
    color: '#666',
    marginTop: scale(2),
  },
  headerRight: {
    width: scale(40),
  },
  listContent: {
    padding: scale(16),
  },
  bookCard: {
    backgroundColor: '#fff',
    borderRadius: scale(12),
    marginBottom: scale(12),
    borderWidth: 1,
    borderColor: '#e9ecef',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookContent: {
    padding: scale(16),
  },
  bookImageContainer: {
    height: scale(160),
    backgroundColor: '#f8f9fa',
    borderRadius: scale(8),
    marginBottom: scale(12),
    position: 'relative',
    overflow: 'hidden',
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: scaleFont(12),
    fontWeight: '600',
  },
  ratingBadge: {
    position: 'absolute',
    top: scale(8),
    right: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: scale(6),
    paddingVertical: scale(2),
    borderRadius: scale(8),
    gap: scale(2),
  },
  ratingBadgeText: {
    fontSize: scaleFont(10),
    fontWeight: '600',
    color: '#1a1a1a',
  },
  bookInfo: {
    flex: 1,
  },
  bookTitle: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: scale(4),
    lineHeight: scale(20),
  },
  bookAuthor: {
    fontSize: scaleFont(14),
    color: '#666',
    marginBottom: scale(8),
    fontWeight: '500',
  },
  bookMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  categoryTag: {
    backgroundColor: '#007AFF10',
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(6),
  },
  categoryText: {
    fontSize: scaleFont(10),
    color: '#007AFF',
    fontWeight: '500',
  },
  bookYear: {
    fontSize: scaleFont(10),
    color: '#666',
  },
  bookDescription: {
    fontSize: scaleFont(12),
    color: '#666',
    lineHeight: scale(16),
    marginBottom: scale(12),
  },
  bookStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  statText: {
    fontSize: scaleFont(10),
    color: '#666',
  },
  availability: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  availabilityText: {
    fontSize: scaleFont(10),
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  readSampleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
    paddingVertical: scale(12),
    gap: scale(6),
  },
  readSampleText: {
    fontSize: scaleFont(12),
    color: '#007AFF',
    fontWeight: '600',
  },
  removeButton: {
    paddingHorizontal: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderLeftWidth: 1,
    borderLeftColor: '#f0f0f0',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(40),
  },
  emptyStateTitle: {
    fontSize: scaleFont(18),
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: scale(16),
    marginBottom: scale(8),
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: scaleFont(14),
    color: '#666',
    textAlign: 'center',
    marginBottom: scale(24),
    lineHeight: scale(20),
  },
  browseButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    borderRadius: scale(8),
  },
  browseButtonText: {
    color: '#fff',
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
});