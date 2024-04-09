import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useState} from  "react";

export default function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  function handleAnswer(selectedAnswer) {
    const answer = quizData[currentQuestion].answer;
    if(answer === selectedAnswer){
      setScore((prevScore)=> prevScore + 1);
    }

    const nextQuestion = currentQuestion + 1;

    //Check if we've reached the end of the questions
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else{
      //Game is over, show score
      setShowScore(true);
    }
  }

  const handleRestart = () =>{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  }

  const quizData = [
    {
      question: 'What is the capital of Brasil?',
      options: ['Brasília','Rio de Janeiro', 'São Paulo', 'Mogi Guaçu'],
      answer: 'Brasília'
    },
    {
      question: 'Largest animal in the world',
      options: ['Giraffe','Hippopotamus', 'Blue Whale', 'Elephant'],
      answer: 'Blue Whale'
    },
    {
      question: 'Which planet has the most moons?',
      options: ['Venus','Saturn', 'Uranus', 'Neptune'],
      answer: 'Saturn'
    },
    {
      question: "The only bird that can fly backwards is a what?",
      options: ["Hummingbird","Kite", 'Ostrich', 'Crane'],
      answer: "Hummingbird"
    }
  ]

  return (
    <View style={styles.container}>
      {showScore ? <View>
        <Text style={{...styles.scoreText, color: score > 0 ? 'green' : 'black'}}>{score}</Text>
        <TouchableOpacity style = {styles.optionContainer} onPress = {handleRestart}>
          <Text style = {styles.resetBtnText}>Reset</Text>
        </TouchableOpacity>
      </View> :
      <View style = {styles.questionContainer}>
       <Text style = {styles.questionText}>{quizData[currentQuestion].question}</Text>
    {quizData[currentQuestion].options.map((item) => {
      return(
        <TouchableOpacity onPress={()=> handleAnswer(item)} style = {styles.optionContainer}>
          <Text style = {styles.optionStyle}>{item}</Text>
        </TouchableOpacity>
      )
    })}
      </View>
}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'green'
  },
  questionContainer: {
    bordercol: '#DDDDDD',
    padding: 10,
    margin: 10,
    borderRadius: 5
  },
  optionStyle: {
    color: 'green',
    padding: 5,
    alignSelf: 'center',
    fontSize: 18,
  },
  optionContainer: {
    borderColor: 'black',
    borderWidth: 2,
    marginTop: 15
  },
  questionText: {
    fontSize: 24,
  },
  resetBtnText: {
    textAlign:'center',
    fontSize: 18,
    paddingHorizontal: 10,
  },
});
