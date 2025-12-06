// app/book/[id].tsx
import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Share,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Update interface Book untuk menambahkan isFeatured
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
  isFeatured?: boolean; // Tambahkan ini
};

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Data buku yang sesuai dengan koleksi
const books: Book[] = [
  {
    id: '1',
    title: 'The Amazing World Of Gumball',
    author: 'Ben Bocquelet',
    image: 'https://i.pinimg.com/736x/e6/7f/ba/e67fba11790309a2cfef13a4a3d2bfd6.jpg',
    category: 'Fiction',
    rating: 4.7,
    description: 'Dive into the incredible universe created by Ben Bocquelet, filled with imaginative characters and captivating stories. This book explores the creative process behind some of the most beloved animated characters in modern television, offering insights into character development, storytelling, and the animation industry.',
    pages: 320,
    publishedYear: 2015,
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Journal 3',
    author: 'Rob Renzetti',
    image: 'https://i.pinimg.com/1200x/34/d9/1a/34d91a03a5c8c8a683b53b7ffb1ae9b4.jpg',
    category: 'Journal',
    rating: 5.0,
    description: 'A comprehensive journal exploring the intricate details of animation history and techniques. This volume delves deep into the world of modern animation, featuring exclusive artwork, behind-the-scenes stories, and technical insights from industry professionals.',
    pages: 280,
    publishedYear: 2018,
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: '3',
    title: 'Book Of Bill',
    author: 'Alex Hirsch',
    image: 'https://i.pinimg.com/736x/ae/cd/25/aecd250504c8812d912d742dd9156325.jpg',
    category: 'Fiction',
    rating: 4.7,
    description: 'An extraordinary collection of stories and adventures featuring the enigmatic character Bill. This book combines humor, mystery, and fantasy in a unique blend that has captivated readers worldwide. Includes exclusive character sketches and concept art.',
    pages: 356,
    publishedYear: 2016,
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: '4',
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    image: 'https://m.media-amazon.com/images/I/51gdVAEfPUL._SX379_.jpg',
    category: 'Technology',
    rating: 4.8,
    description: 'Most programming languages contain good and bad parts, but JavaScript has more than its share of the bad. This authoritative book scrapes away these bad features to reveal a subset of JavaScript that is more reliable, readable, and maintainable.',
    pages: 176,
    publishedYear: 2008,
    isAvailable: true,
    isFeatured: false,
  },
  {
    id: '5',
    title: 'React Native Essentials',
    author: 'Ethan James',
    image: 'https://m.media-amazon.com/images/I/41as+WafrFL._SX377_.jpg',
    category: 'Technology',
    rating: 4.6,
    description: 'A comprehensive guide to building mobile applications using React Native. This book covers everything from basic concepts to advanced techniques, including state management, navigation, performance optimization, and deploying to app stores.',
    pages: 420,
    publishedYear: 2022,
    isAvailable: true,
    isFeatured: true,
  },
  {
    id: '6',
    title: 'Modern Web Design',
    author: 'Sarah Johnson',
    image: 'https://i.pinimg.com/736x/1b/35/0a/1b350a004666a6159610d0718cd1012b.jpg',
    category: 'Technology',
    rating: 4.5,
    description: 'Explore the latest trends and techniques in modern web design. This book covers responsive design, accessibility, performance optimization, and user experience principles that every web designer should know in the modern era.',
    pages: 310,
    publishedYear: 2023,
    isAvailable: true,
    isFeatured: false,
  },
];

export default function BookDetailScreen() {
  const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(() => {
    return books.find(b => b.id === id) || null;
  });

  if (!currentBook) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Ionicons name="book-outline" size={80} color="#ccc" />
          <Text style={styles.errorTitle}>Buku Tidak Ditemukan</Text>
          <Text style={styles.errorText}>Buku yang Anda cari tidak tersedia dalam koleksi</Text>
          <TouchableOpacity 
            style={styles.goBackButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#fff" />
            <Text style={styles.goBackButtonText}>Kembali ke Koleksi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleBorrow = useCallback(() => {
    if (currentBook.isAvailable) {
      Alert.alert(
        '📚 Pinjam Buku',
        `Apakah Anda yakin ingin meminjam buku:\n\n"${currentBook.title}"\noleh ${currentBook.author}\n\nAnda dapat meminjam buku ini selama 14 hari.`,
        [
          { 
            text: 'Batal', 
            style: 'cancel' 
          },
          { 
            text: 'Ya, Pinjam', 
            style: 'default',
            onPress: async () => {
              setLoading(true);
              
              // Simulasi proses peminjaman
              await new Promise(resolve => setTimeout(resolve, 1000));
              
              // Update status buku menjadi dipinjam
              setCurrentBook(prev => prev ? { ...prev, isAvailable: false } : null);
              
              // Hitung tanggal pengembalian
              const dueDate = new Date();
              dueDate.setDate(dueDate.getDate() + 14);
              const formattedDueDate = dueDate.toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              });
              
              setLoading(false);
              
              Alert.alert(
                '✅ Berhasil Dipinjam!',
                `Buku "${currentBook.title}" berhasil dipinjam.\n\n📅 Tanggal Pengembalian: ${formattedDueDate}\n\nSilakan ambil buku di meja perpustakaan dalam 24 jam.`,
                [
                  { 
                    text: 'Mengerti', 
                    onPress: () => {
                      console.log('Buku berhasil dipinjam:', currentBook.title);
                    }
                  }
                ]
              );
            }
          },
        ]
      );
    } else {
      Alert.alert(
        '⏳ Sedang Dipinjam',
        `Maaf, buku "${currentBook.title}" sedang dipinjam oleh anggota lain.\n\n📅 Perkiraan tersedia: 2 hari lagi\n\nSilakan coba lagi nanti atau cari buku lainnya.`,
        [
          { 
            text: 'Cari Buku Lain', 
            onPress: () => router.push('/(tabs)/collection' as any)
          },
          { 
            text: 'OK', 
            style: 'default' 
          }
        ]
      );
    }
  }, [currentBook]);

  const handleReturn = useCallback(() => {
    Alert.alert(
      '📖 Kembalikan Buku',
      `Apakah Anda ingin mengembalikan buku:\n\n"${currentBook.title}"\noleh ${currentBook.author}?`,
      [
        { 
          text: 'Batal', 
          style: 'cancel' 
        },
        { 
          text: 'Ya, Kembalikan', 
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            
            // Simulasi proses pengembalian
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Update status buku menjadi tersedia
            setCurrentBook(prev => prev ? { ...prev, isAvailable: true } : null);
            
            setLoading(false);
            
            Alert.alert(
              '✅ Buku Dikembalikan',
              `Terima kasih! Buku "${currentBook.title}" telah berhasil dikembalikan.\n\n📚 Buku sekarang tersedia untuk dipinjam oleh anggota lain.`,
              [
                { 
                  text: 'OK', 
                  onPress: () => {
                    console.log('Buku berhasil dikembalikan:', currentBook.title);
                  }
                }
              ]
            );
          }
        },
      ]
    );
  }, [currentBook]);

  const handleReadSample = useCallback(() => {
    Alert.alert(
      '🔖 Baca Sample',
      'Membuka sample 10 halaman pertama...',
      [
        { text: 'Batal', style: 'cancel' },
        { 
          text: 'Buka', 
          onPress: () => {
            router.push({
              pathname: '/collection/read-sample',
              params: { bookId: currentBook.id }
            } as any);
          }
        }
      ]
    );
  }, [currentBook.id]);

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        message: `📚 ${currentBook.title} oleh ${currentBook.author}\n\n⭐ Rating: ${currentBook.rating}/5\n📖 ${currentBook.pages} halaman | ${currentBook.category}\n\n${currentBook.description.substring(0, 120)}...\n\nTemukan lebih banyak buku di LiteraSpace!`,
        title: `${currentBook.title} - LiteraSpace`
      });
    } catch (error) {
      Alert.alert('Oops!', 'Gagal membagikan buku');
    }
  }, [currentBook]);

  const handleAddToWishlist = useCallback(() => {
    setIsFavorite(!isFavorite);
    Alert.alert(
      isFavorite ? '❤️ Dihapus dari Favorit' : '⭐ Ditambahkan ke Favorit',
      isFavorite 
        ? `"${currentBook.title}" telah dihapus dari daftar favorit Anda.`
        : `"${currentBook.title}" telah ditambahkan ke daftar favorit Anda.`
    );
  }, [isFavorite, currentBook.title]);

  const renderStarRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Ionicons key={`star-${i}`} name="star" size={18} color="#FFB800" />);
    }

    if (hasHalfStar) {
      stars.push(<Ionicons key="star-half" name="star-half" size={18} color="#FFB800" />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Ionicons key={`star-empty-${i}`} name="star-outline" size={18} color="#FFB800" />);
    }

    return (
      <View style={styles.starContainer}>
        {stars}
        <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C3E50" />
      
      {/* Header - HILANGKAN TOMBOL BACK DI SINI, HANYA MENAMPILKAN TITLE */}
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Detail Buku
        </Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={handleShare}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="share-social-outline" size={22} color="#fff" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.headerButton} 
            onPress={handleAddToWishlist}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons 
              name={isFavorite ? "heart" : "heart-outline"} 
              size={22} 
              color={isFavorite ? "#FF4757" : "#fff"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cover & Info Section */}
        <View style={styles.heroSection}>
          <View style={styles.bookCoverWrapper}>
            <Image 
              source={{ uri: currentBook.image }} 
              style={styles.bookCover}
              resizeMode="cover"
            />
            {!currentBook.isAvailable && (
              <View style={styles.borrowedBadge}>
                <Ionicons name="time-outline" size={16} color="#fff" />
                <Text style={styles.borrowedText}>DIPINJAM</Text>
              </View>
            )}
            
            {currentBook.isFeatured && (
              <View style={styles.featuredBadge}>
                <Ionicons name="flame" size={14} color="#fff" />
                <Text style={styles.featuredText}>POPULER</Text>
              </View>
            )}
          </View>
          
          <View style={styles.bookBasicInfo}>
            <Text style={styles.bookTitle}>{currentBook.title}</Text>
            <Text style={styles.bookAuthor}>oleh {currentBook.author}</Text>
            
            <View style={styles.bookMeta}>
              {renderStarRating(currentBook.rating)}
              <View style={styles.metaDivider} />
              <View style={styles.categoryChip}>
                <Ionicons name="bookmark-outline" size={14} color="#3498db" />
                <Text style={styles.categoryText}>{currentBook.category}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsContainer}>
          {currentBook.isAvailable ? (
            <TouchableOpacity 
              style={[styles.primaryButton, loading && styles.buttonDisabled]} 
              onPress={handleBorrow}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons name="book-outline" size={22} color="#fff" />
                  <Text style={styles.primaryButtonText}>PINJAM SEKARANG</Text>
                </>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity 
              style={[styles.secondaryButton, loading && styles.buttonDisabled]} 
              onPress={handleReturn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <>
                  <Ionicons name="return-up-back" size={22} color="#fff" />
                  <Text style={styles.secondaryButtonText}>KEMBALIKAN</Text>
                </>
              )}
            </TouchableOpacity>
          )}
          
          <TouchableOpacity 
            style={styles.outlineButton}
            onPress={handleReadSample}
          >
            <Ionicons name="eye-outline" size={20} color="#3498db" />
            <Text style={styles.outlineButtonText}>BACA SAMPLE</Text>
          </TouchableOpacity>
        </View>

        {/* Book Details Grid */}
        <View style={styles.detailsSection}>
          <Text style={styles.sectionTitle}>📋 Informasi Buku</Text>
          
          <View style={styles.detailsGrid}>
            <View style={styles.detailCard}>
              <Ionicons name="calendar-outline" size={22} color="#3498db" />
              <Text style={styles.detailLabel}>Tahun Terbit</Text>
              <Text style={styles.detailValue}>{currentBook.publishedYear}</Text>
            </View>
            
            <View style={styles.detailCard}>
              <Ionicons name="document-text-outline" size={22} color="#3498db" />
              <Text style={styles.detailLabel}>Jumlah Halaman</Text>
              <Text style={styles.detailValue}>{currentBook.pages}</Text>
            </View>
            
            <View style={styles.detailCard}>
              <Ionicons name="star-outline" size={22} color="#3498db" />
              <Text style={styles.detailLabel}>Rating</Text>
              <Text style={styles.detailValue}>{currentBook.rating}/5</Text>
            </View>
            
            <View style={styles.detailCard}>
              <Ionicons name="checkmark-circle-outline" size={22} color="#3498db" />
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={[
                styles.detailValue,
                currentBook.isAvailable ? styles.statusAvailableText : styles.statusUnavailableText
              ]}>
                {currentBook.isAvailable ? 'Tersedia' : 'Dipinjam'}
              </Text>
            </View>
          </View>
        </View>

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle-outline" size={22} color="#2C3E50" />
            <Text style={styles.sectionTitle}>📖 Sinopsis</Text>
          </View>
          <Text style={styles.description}>{currentBook.description}</Text>
        </View>

        {/* Related Books */}
        <View style={styles.relatedSection}>
          <View style={styles.sectionHeader}>
            <Ionicons name="library-outline" size={22} color="#2C3E50" />
            <Text style={styles.sectionTitle}>📚 Buku Terkait</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.relatedScroll}>
            {books
              .filter(book => book.id !== currentBook.id && book.category === currentBook.category)
              .slice(0, 3)
              .map(book => (
                <TouchableOpacity 
                  key={book.id}
                  style={styles.relatedBookCard}
                  onPress={() => router.push(`/book/${book.id}`)}
                >
                  <Image source={{ uri: book.image }} style={styles.relatedBookImage} />
                  <Text style={styles.relatedBookTitle} numberOfLines={2}>{book.title}</Text>
                  <Text style={styles.relatedBookAuthor}>{book.author}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        {/* Bottom Spacer */}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#f8f9fa',
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 20,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  goBackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3498db',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  goBackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#2C3E50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
    position: 'absolute',
    right: 16,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  heroSection: {
    backgroundColor: '#fff',
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  bookCoverWrapper: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    marginBottom: 20,
  },
  bookCover: {
    width: 180,
    height: 250,
    borderRadius: 12,
    backgroundColor: '#ecf0f1',
  },
  borrowedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(231, 76, 60, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  borrowedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  featuredBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(230, 126, 34, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 4,
  },
  featuredText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bookBasicInfo: {
    alignItems: 'center',
    width: '100%',
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 30,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 16,
    textAlign: 'center',
  },
  bookMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 16,
    marginTop: 8,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginLeft: 4,
  },
  metaDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#ddd',
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EBF5FB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  categoryText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  actionButtonsContainer: {
    padding: 24,
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ecc71',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 10,
    shadowColor: '#2ecc71',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  outlineButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3498db',
    gap: 10,
  },
  outlineButtonText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  detailsSection: {
    padding: 24,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  detailCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ecf0f1',
  },
  detailLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginTop: 8,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  statusAvailableText: {
    color: '#2ecc71',
  },
  statusUnavailableText: {
    color: '#e74c3c',
  },
  descriptionSection: {
    padding: 24,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  description: {
    fontSize: 15,
    color: '#34495e',
    lineHeight: 24,
    textAlign: 'justify',
  },
  relatedSection: {
    padding: 24,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  relatedScroll: {
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  relatedBookCard: {
    width: 120,
    marginRight: 16,
  },
  relatedBookImage: {
    width: 120,
    height: 160,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
    marginBottom: 8,
  },
  relatedBookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
    lineHeight: 18,
  },
  relatedBookAuthor: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  bottomSpacer: {
    height: 40,
  },
});