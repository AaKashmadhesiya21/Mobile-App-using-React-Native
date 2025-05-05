import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const QuizScreen = () => {
  const questions = [
    { questionText: 'It was Sunday on Jan 1, 2006. What was the day of the week Jan 1, 2010?', answerOptions: ['A. Sunday', 'B. Saturday', 'C. Friday', 'D. Friday'], correctAnswer: 'C. Friday' },
    { questionText: 'It was Sunday on Jan 1, 2006. What was the day of the week Jan 1, 2010?', answerOptions: ['A. Sunday', 'B. Saturday', 'C. Friday', 'D. Friday'], correctAnswer: 'C. Friday' },
    { questionText: 'It was Sunday on Jan 1, 2006. What was the day of the week Jan 1, 2010?', answerOptions: ['A. Sunday', 'B. Saturday', 'C. Friday', 'D. Friday'], correctAnswer: 'C. Friday' },
    { questionText: 'It was Sunday on Jan 1, 2006. What was the day of the week Jan 1, 2010?', answerOptions: ['A. Sunday', 'B. Saturday', 'C. Friday', 'D. Friday'], correctAnswer: 'C. Friday' },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (answer) => {
    const correctAnswer = questions[currentQuestion].correctAnswer;
    if (answer === correctAnswer) {
      setScore(score + 1);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        Alert.alert('Quiz Completed', `You have completed the quiz! Your score is ${score + 1}`);
      }
    } else {
      Alert.alert('Incorrect Answer', 'Try Again!');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Question {currentQuestion + 1} of {questions.length}</Text>
        <Text style={styles.progressText}>Score: {score}</Text>
      </View>
      <Text style={styles.questionText}>  { questions[currentQuestion].questionText}</Text>
      {questions[currentQuestion].answerOptions.map((answerOption, index) => (
        <TouchableOpacity key={index} style={styles.answerButton} onPress={() => handleAnswerOptionClick(answerOption)}>
          <Text style={styles.answerText}>{answerOption}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  progressText: {
    fontSize: 16,
  },
  questionText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  answerText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default QuizScreen;
