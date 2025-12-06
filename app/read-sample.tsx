import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive scaling functions
const scale = (size: number) => {
  const baseWidth = 375;
  return Math.round((SCREEN_WIDTH / baseWidth) * size);
};

const scaleFont = (size: number) => {
  const baseWidth = 375;
  const scaledSize = (SCREEN_WIDTH / baseWidth) * size;
  
  if (SCREEN_WIDTH < 350) return Math.max(12, Math.round(scaledSize * 0.9));
  if (SCREEN_WIDTH > 450) return Math.min(28, Math.round(scaledSize * 1.1));
  
  return Math.round(scaledSize);
};

// Sample book content dengan type yang lebih aman
type SampleContent = {
  [key: string]: string;
};

const sampleContent: SampleContent = {
  '1': `CHAPTER 1

In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since.

"Whenever you feel like criticizing any one," he told me, "just remember that all the people in this world haven't had the advantages that you've had."

He didn't say any more, but we've always been unusually communicative in a reserved way, and I understood that he meant a great deal more than that. In consequence, I'm inclined to reserve all judgments, a habit that has opened up many curious natures to me and also made me the victim of not a few veteran bores.

The abnormal mind is quick to detect and attach itself to this quality when it appears in a normal person, and so it came about that in college I was unjustly accused of being a politician, because I was privy to the secret griefs of wild, unknown men. Most of the time I was in search of a mere emotional keel, for I was privy to the secret griefs of wild, unknown men.

And so with the sunshine and the great bursts of leaves growing on the trees, just as things grow in fast movies, I had that familiar conviction that life was beginning over again with the summer.

[Sample content ends here. Borrow the book to read the full story!]`,

  '2': `CHAPTER 1

When he was nearly thirteen, my brother Jem got his arm badly broken at the elbow. When it healed, and Jem's fears of never being able to play football were assuaged, he was seldom self-conscious about his injury. His left arm was somewhat shorter than his right; when he stood or walked, the back of his hand was at right angles to his body, his thumb parallel to his thigh.

When enough years had gone by to enable us to look back on them, we sometimes discussed the events leading to his accident. I maintain that the Ewells started it all, but Jem, who was four years my senior, said it started long before that. He said it began the summer Dill came to us, when Dill first gave us the idea of making Boo Radley come out.

I said if he wanted to take a broad view of the thing, it really began with Andrew Jackson. If General Jackson hadn't run the Creeks up the creek, Simon Finch would never have paddled up the Alabama, and where would we be if he hadn't? We were far too old to settle an argument with a fist-fight, so we consulted Atticus. Our father said we were both right.

[Sample content ends here. Borrow the book to read the full story!]`,

  '3': `CHAPTER 1

It was a bright cold day in April, and the clocks were striking thirteen. Winston Smith, his chin nuzzled into his breast in an effort to escape the vile wind, slipped quickly through the glass doors of Victory Mansions, though not quickly enough to prevent a swirl of gritty dust from entering along with him.

The hallway smelt of boiled cabbage and old rag mats. At one end of it a coloured poster, too large for indoor display, had been tacked to the wall. It depicted simply an enormous face, more than a metre wide: the face of a man of about forty-five, with a heavy black moustache and ruggedly handsome features. Winston made for the stairs. It was no use trying the lift. Even at the best of times it was seldom working, and at present the electric current was cut off during daylight hours. It was part of the economy drive in preparation for Hate Week. The flat was seven flights up, and Winston, who was thirty-nine and had a varicose ulcer above his right ankle, went slowly, resting several times on the way.

[Sample content ends here. Borrow the book to read the full story!]`,

  '4': `CHAPTER 1

It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.

However little known the feelings or views of such a man may be on his first entering a neighbourhood, this truth is so well fixed in the minds of the surrounding families, that he is considered the rightful property of some one or other of their daughters.

"My dear Mr. Bennet," said his lady to him one day, "have you heard that Netherfield Park is let at last?"

Mr. Bennet replied that he had not.

"But it is," returned she; "for Mrs. Long has just been here, and she told me all about it."

Mr. Bennet made no answer.

"Do you not want to know who has taken it?" cried his wife impatiently.

"You want to tell me, and I have no objection to hearing it."

This was invitation enough.

[Sample content ends here. Borrow the book to read the full story!]`
};

export default function ReadSampleScreen() {
  const { bookId } = useLocalSearchParams();
  const [fontSize, setFontSize] = useState(16);
  const [isNightMode, setIsNightMode] = useState(false);

  // FIX: Gunakan fallback yang aman
  const content = sampleContent[bookId as string] || sampleContent['1'];

  const handleBack = useCallback(() => {
    router.back();
  }, []);

  const handleBorrow = useCallback(() => {
    Alert.alert(
      'Enjoying the Sample? 📚',
      'Borrow the full book to continue reading this amazing story!',
      [
        { 
          text: 'Not Now', 
          style: 'cancel' 
        },
        { 
          text: 'Borrow Full Book', 
          style: 'default',
          onPress: () => {
            router.back();
            // Navigate back to book detail to complete borrowing
            setTimeout(() => {
              router.push(`/book/${bookId}` as any);
            }, 100);
          }
        },
      ]
    );
  }, [bookId]);

  const increaseFontSize = useCallback(() => {
    setFontSize(prev => Math.min(prev + 2, 24));
  }, []);

  const decreaseFontSize = useCallback(() => {
    setFontSize(prev => Math.max(prev - 2, 12));
  }, []);

  const toggleNightMode = useCallback(() => {
    setIsNightMode(prev => !prev);
  }, []);

  const containerStyle = {
    ...styles.container,
    backgroundColor: isNightMode ? '#1a1a1a' : '#f5f5f5',
  };

  const contentStyle = {
    ...styles.contentContainer,
    backgroundColor: isNightMode ? '#2d2d2d' : '#fff',
  };

  const textStyle = {
    ...styles.contentText,
    fontSize: scaleFont(fontSize),
    color: isNightMode ? '#e0e0e0' : '#333',
    lineHeight: scaleFont(fontSize + 8),
  };

  return (
    <SafeAreaView style={containerStyle}>
      <StatusBar barStyle={isNightMode ? "light-content" : "dark-content"} backgroundColor={isNightMode ? "#1a1a1a" : "#f5f5f5"} />
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={[
            styles.headerButton,
            { backgroundColor: isNightMode ? '#333' : '#fff' }
          ]}
          onPress={handleBack}
        >
          <Ionicons 
            name="arrow-back" 
            size={scale(24)} 
            color={isNightMode ? "#fff" : "#333"} 
          />
        </TouchableOpacity>
        
        <View style={styles.headerTitle}>
          <Text style={[
            styles.headerTitleText,
            { color: isNightMode ? '#fff' : '#333' }
          ]}>
            Reading Sample
          </Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={[
              styles.headerButton,
              { backgroundColor: isNightMode ? '#333' : '#fff' }
            ]}
            onPress={toggleNightMode}
          >
            <Ionicons 
              name={isNightMode ? "sunny" : "moon"} 
              size={scale(20)} 
              color={isNightMode ? "#FFD700" : "#666"} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* READING CONTROLS */}
      <View style={[
        styles.controls,
        { backgroundColor: isNightMode ? '#333' : '#fff' }
      ]}>
        <TouchableOpacity 
          style={styles.controlButton}
          onPress={decreaseFontSize}
          disabled={fontSize <= 12}
        >
          <Ionicons 
            name="remove" 
            size={scale(20)} 
            color={fontSize <= 12 ? '#999' : (isNightMode ? '#fff' : '#333')} 
          />
          <Text style={[
            styles.controlText,
            { color: fontSize <= 12 ? '#999' : (isNightMode ? '#fff' : '#333') }
          ]}>
            A-
          </Text>
        </TouchableOpacity>

        <Text style={[
          styles.fontSizeText,
          { color: isNightMode ? '#fff' : '#333' }
        ]}>
          {fontSize}px
        </Text>

        <TouchableOpacity 
          style={styles.controlButton}
          onPress={increaseFontSize}
          disabled={fontSize >= 24}
        >
          <Ionicons 
            name="add" 
            size={scale(20)} 
            color={fontSize >= 24 ? '#999' : (isNightMode ? '#fff' : '#333')} 
          />
          <Text style={[
            styles.controlText,
            { color: fontSize >= 24 ? '#999' : (isNightMode ? '#fff' : '#333') }
          ]}>
            A+
          </Text>
        </TouchableOpacity>
      </View>

      {/* CONTENT */}
      <ScrollView 
        style={contentStyle}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={textStyle}>
          {content}
        </Text>
      </ScrollView>

      {/* BORROW FOOTER */}
      <View style={[
        styles.footer,
        { backgroundColor: isNightMode ? '#333' : '#fff' }
      ]}>
        <TouchableOpacity 
          style={styles.borrowFooterButton}
          onPress={handleBorrow}
        >
          <Ionicons name="book" size={scale(20)} color="#fff" />
          <Text style={styles.borrowFooterText}>
            Borrow Full Book to Continue Reading
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitleText: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    gap: scale(8),
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(24),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  controlButton: {
    alignItems: 'center',
    padding: scale(8),
    minWidth: scale(60),
  },
  controlText: {
    fontSize: scaleFont(12),
    fontWeight: '500',
    marginTop: scale(4),
  },
  fontSizeText: {
    fontSize: scaleFont(14),
    fontWeight: '600',
  },
  contentContainer: {
    flex: 1,
    margin: scale(16),
    borderRadius: scale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  scrollContent: {
    padding: scale(24),
  },
  contentText: {
    textAlign: 'justify',
  },
  footer: {
    padding: scale(16),
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  borrowFooterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: scale(16),
    borderRadius: scale(12),
    gap: scale(8),
  },
  borrowFooterText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: '600',
  },
});