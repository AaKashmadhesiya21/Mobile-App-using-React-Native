import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import quizData from './quizData.json'; 

const Question = ({ question, options, onAnswer }) => (
  <View style={styles.container}>
    <Text style={styles.question}>{question}</Text>
    {options.map((option, index) => (
      <Button key={index} title={option} onPress={() => onAnswer(option)} />
    ))}
  </View>
);

const VideoPlayer = ({ url, onEnd }) => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: url }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        shouldPlay={true} // Automatically starts playing when loaded
        onPlaybackStatusUpdate={status => {
          setStatus(status);
          if (status.didJustFinish) {
            onEnd();
          }
        }}
      />
    </View>
  );
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (selectedOption) => {
    const currentItem = quizData.quiz[currentIndex];
    if (currentItem.type === 'question' && currentItem.content.answer === selectedOption) {
      setScore(score + 1);
    }
    moveToNext();
  };

  const moveToNext = () => {
    if (currentIndex < quizData.quiz.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert(`Quiz completed! Your score: ${score}`);
    }
  };

  const renderContent = () => {
    const currentItem = quizData.quiz[currentIndex];

    if (currentItem.type === 'question') {
      return (
        <Question
          question={currentItem.content.question}
          options={currentItem.content.options}
          onAnswer={handleAnswer}
        />
      );
    }

    if (currentItem.type === 'video') {
      return (
        <VideoPlayer
          url={currentItem.content.url}
          onEnd={moveToNext}
        />
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ecf0f1',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
  },
  video: {
    width: 320,
    height: 200,
  },
});

export default App;
