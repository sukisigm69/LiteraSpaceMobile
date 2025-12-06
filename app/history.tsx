import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { router } from 'expo-router';

interface HistoryItem {
  id: string;
  title: string;
  instructor: string;
  price: string;
  rating: number;
  students: number;
  image: string;
  category?: string;
  watchDate: string;
  progress: number;
  duration: string;
}

export default function HistoryScreen() {
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      title: 'Web Development Bootcamp',
      instructor: 'John Doe',
      price: 'Rp 299.000',
      rating: 4.8,
      students: 1250,
      image: 'https://via.placeholder.com/100x60/4A90E2/FFFFFF?text=Web+Dev',
      category: 'Programming',
      watchDate: '2024-01-15',
      progress: 75,
      duration: '12 jam',
    },
    {
      id: '2',
      title: 'Mobile App dengan React Native',
      instructor: 'Jane Smith',
      price: 'Rp 399.000',
      rating: 4.9,
      students: 890,
      image: 'https://via.placeholder.com/100x60/50C878/FFFFFF?text=React+Native',
      category: 'Mobile Development',
      watchDate: '2024-01-14',
      progress: 100,
      duration: '15 jam',
    },
  ]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getProgressColor = (progress: number): string => {
    if (progress === 100) return '#50C878';
    if (progress >= 50) return '#4A90E2';
    return '#FF6B6B';
  };

  const handleCoursePress = (courseId: string) => {
    router.push({
      pathname: '/course-detail',
      params: { id: courseId }
    } as any);
  };

  const renderHistoryItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.historyItem}>
      <TouchableOpacity 
        style={styles.courseContent}
        onPress={() => handleCoursePress(item.id)}
      >
        <Image source={{ uri: item.image }} style={styles.courseImage} />
        <View style={styles.courseInfo}>
          <View style={styles.courseHeader}>
            <Text style={styles.courseTitle}>{item.title}</Text>
            <Text style={styles.watchDate}>{formatDate(item.watchDate)}</Text>
          </View>
          <Text style={styles.courseInstructor}>{item.instructor}</Text>
          <Text style={styles.courseCategory}>{item.category}</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>Progress: {item.progress}%</Text>
              <Text style={styles.durationText}>{item.duration}</Text>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${item.progress}%`,
                    backgroundColor: getProgressColor(item.progress)
                  }
                ]} 
              />
            </View>
          </View>

          {item.progress === 100 && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>✅ Selesai</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  const completedCourses = history.filter(item => item.progress === 100);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Riwayat Belajar</Text>
        <Text style={styles.subtitle}>
          {history.length} kursus diikuti • {completedCourses.length} selesai
        </Text>
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateEmoji}>📚</Text>
          <Text style={styles.emptyStateTitle}>Belum ada riwayat</Text>
          <Text style={styles.emptyStateText}>
            Mulai belajar kursus untuk melihat riwayat di sini
          </Text>
          <TouchableOpacity 
            style={styles.browseButton}
            onPress={() => router.push('/' as any)}
          >
            <Text style={styles.browseButtonText}>Jelajahi Kursus</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={history}
          renderItem={renderHistoryItem}
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
    padding: 16,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
  historyItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  courseContent: {
    padding: 16,
  },
  courseImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 12,
  },
  courseInfo: {
    flex: 1,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 8,
  },
  watchDate: {
    fontSize: 12,
    color: '#888',
  },
  courseInstructor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  courseCategory: {
    fontSize: 12,
    color: '#888',
    marginBottom: 12,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  durationText: {
    fontSize: 12,
    color: '#666',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  completedBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  completedText: {
    fontSize: 12,
    color: '#50C878',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyStateEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  browseButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});