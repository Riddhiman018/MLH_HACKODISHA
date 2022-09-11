import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RadioButtonRN from "radio-buttons-react-native";
import questionsData from "./QuizData";

const data = [
  {
    label: "True",
  },
  {
    label: "False",
  },
];
function Quiz({ navigation }) {
  return (
    <ScrollView>
      <SafeAreaView style={styles.masterContainer}>
        <Text style={styles.headings}>Take Quiz</Text>
        <Text style={styles.information}>Topic : Brain</Text>
        {/* Question Container */}
        <View style={styles.questionContainer}>
          <View style={styles.questionsView}>
            <Text style={styles.question}>
              1. The average human brain is made up of water up to 80% :
            </Text>
            <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} />
          </View>

          <View style={styles.questionsView}>
            <Text style={styles.question}>
              2. Our brain is 9% of your total body weight but uses 35% of your
              body's energy :
            </Text>
            <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} />
          </View>

          <View style={styles.questionsView}>
            <Text style={styles.question}>
              3. The right side of your brain controls the left side of your
              body, while the left side of your brain controls the right side of
              your body :
            </Text>
            <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} />
          </View>
        </View>
        <View style={styles.questionContainer}>
          <View style={styles.questionsView}>
            <Text style={styles.question}>
              4. Your skull is made up of twenty-eight bones :
            </Text>
            <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} />
          </View>

          <View style={styles.questionsView}>
            <Text style={styles.question}>
              5. The brain can stay alive 1-3 minutes without any oxygen :
            </Text>
            <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} />
          </View>

          <View style={styles.questionsView}>
            <Text style={styles.question}>
              6. The right side of your brain controls the left side of your
              body, while the left side of your brain controls the right side of
              your body :
            </Text>
            <RadioButtonRN data={data} selectedBtn={(e) => console.log(e)} />
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <View style={styles.button}>
            <Text style={styles.submitButton}>Submit</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  masterContainer: {
    paddingHorizontal: 10,
  },
  questionContainer: {
    marginVertical: 10,
  },
  headings: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: 20,
    textAlign: "center",
  },
  information: {
    fontSize: 20,
    marginTop: 15,
    textAlign: "center",
  },
  questionsView: {
    marginTop: 20,
  },
  question: {
    fontWeight: "bold",
    fontSize: 15,
  },
  button: {
    height: 45,
    width: "100%",
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: "#00d37f",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  submitButton: {
    color: "white",
    fontSize: 17,
  },
});

export default Quiz;
