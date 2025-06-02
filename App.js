import { Text, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, StatusBar, View } from 'react-native';
import { useState } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

const screen = Dimensions.get('window');
const buttonWidth = screen.width / 4 - 10;


export default function App() {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);

  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue,setOperatorValue] = useState(0);
  const [isComputing, setIsComputing] = useState(false);
  const [calcMode, setCalcMode] = useState(true);
  const [displayValue, setDisplayValue] = useState(0);

  const buttonHeight = screen.width / 5 - 10;
  const sciButtonHeight = screen.width / 7 - 10;

  function switchMode(){
    setCalcMode(!calcMode);
     console.log(calcMode);
  }

  function handleNumber(value) {
  if (readyToReplace) {
    setReadyToReplace(false);
    return value;
  } else {
    return answerValue + value;
  }
}

  function calculateEquals() {
    const previous = parseFloat(memoryValue);
    var current;

    if (answerValue === "π"){
      current = parseFloat(3.14159265);
    }
    else current = parseFloat(answerValue);

    if(operatorValue){
      switch(operatorValue) {
        case "+": 
          return previous + current;
        case "-":
          return previous - current;
        case "*": 
          return previous * current;
        case "/":
          return previous / current;
      }
    }
    else {
      return current;
    }
  }

  function buttonPressed(value) {
  
  setIsComputing(true);  

  if (!isNaN(value) || value === "." || value === "π") {
    setAnswerValue(handleNumber(value));
    return;
  }


  if (value === 'C') {
    if(operatorValue === 0){
      setAnswerValue("0");
    }
    setIsComputing(false);
    setAnswerValue(memoryValue);
    setMemoryValue(0);
    setOperatorValue(0);
    setReadyToReplace(true);
    return;
  }

  if (isNaN(value) && value != "." && value != "^" && value != "√"  && value != "log" && value != "ln" ) {
    if (operatorValue !== 0){
      const temp = calculateEquals();
      setAnswerValue(temp);
      setMemoryValue(temp);
    } else {
      setMemoryValue(answerValue);
    }
    setReadyToReplace(true);
    setOperatorValue(value);
  }


  if (value === "=") {
    const result = calculateEquals();
    setAnswerValue(result % 1 === 0 ? result : result.toFixed(5));
    setMemoryValue(0);
    setReadyToReplace(true);
    setOperatorValue(0);
    setIsComputing(false);
  }

  if (value === "+/-") {
    setAnswerValue(answerValue*-1);
  }

  if (value === "%") {
    setAnswerValue(answerValue*0.01);
  }

  if (value ==="^") {
    setAnswerValue(answerValue*answerValue);
  }

  if (value === "log") {
    const result = Math.log10(parseFloat(answerValue));
    setAnswerValue(result % 1 === 0 ? result : result.toFixed(5));
    setReadyToReplace(true);
    return;
  }

  if (value === "ln") {
    const result = Math.log(parseFloat(answerValue));
    setAnswerValue(result % 1 === 0 ? result : result.toFixed(5));
    setReadyToReplace(true);
    return;
  }

  if (value === "√") {
    const result = Math.sqrt(answerValue);
    setAnswerValue(result % 1 === 0 ? result : result.toFixed(5));
    setReadyToReplace(true);
    return;
  }

  if (value === "sin") {
    const result = Math.sin(answerValue);
    setAnswerValue(result % 1 === 0 ? result : result.toFixed(5));
    setReadyToReplace(true);
    return;
  }

  if (value === "cos") {
    const result = Math.cos(answerValue);
    setAnswerValue(result % 1 === 0 ? result : result.toFixed(5));
    setReadyToReplace(true);
    return;
  }

  if (value === "tan") {
    const result = Math.tan(answerValue);
    setAnswerValue(result % 1 === 0 ? result : result.toFixed(5));
    setReadyToReplace(true);
    return;
  }

}


return (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="light-content" />
    <View style={styles.resultsContainer}>
      <Text style={styles.resultText}>{answerValue}</Text>
    </View>

    {/* Sci row 1 */}
    
      {!calcMode && (
        <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.sciButton, {height: sciButtonHeight}]} onPress={() => buttonPressed("sin")}>
          <Text style={styles.lightButtonText}>sin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.sciButton, {height: sciButtonHeight}]} onPress={() => buttonPressed("cos")}>
          <Text style={styles.lightButtonText}>cos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.sciButton, {height: sciButtonHeight}]} onPress={() => buttonPressed("tan")}>
          <Text style={styles.lightButtonText}>tan</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.sciButton, {height: sciButtonHeight}]} onPress={() => buttonPressed("π")}>
          <Text style={styles.lightButtonText}>π</Text>
        </TouchableOpacity>
      </View>
      )}

       {/* Sci row 2 */}

{!calcMode && (
        <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.sciButton, {height: sciButtonHeight}]} onPress={() => buttonPressed("√")}>
          <Text style={styles.lightButtonText}>√</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.sciButton, {height: sciButtonHeight}]} onPress={() => buttonPressed("^")}>
          <Text style={styles.lightButtonText}>x²</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.sciButton, {height: sciButtonHeight}]} onPress={() => buttonPressed("log")}>
          <Text style={styles.lightButtonText}>log</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.sciButton, {height: sciButtonHeight}]} onPress={() => buttonPressed("ln")}>
          <Text style={styles.lightButtonText}>ln</Text>
        </TouchableOpacity>
      </View>
      )}

      {/* Row 1 */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, styles.lightButton, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("C")}>
          <Text style={styles.buttonText}>{isComputing === true? "C": "AC"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.lightButton, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("+/-")}>
          <Text style={styles.buttonText}>+/-</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.lightButton, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("%")}>
          <Text style={styles.buttonText}>%</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.blueButton, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("/")}>
          <Text style={styles.lightButtonText}>/</Text>
        </TouchableOpacity>
      </View>

      {/* Row 2 */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("7")}>
          <Text style={styles.lightButtonText}>7</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("8")}>
          <Text style={styles.lightButtonText}>8</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("9")}>
          <Text style={styles.lightButtonText}>9</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.blueButton, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("*")}>
          <Text style={styles.lightButtonText}>x</Text>
        </TouchableOpacity>
      </View>

      {/* Row 3 */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("4")}>
          <Text style={styles.lightButtonText}>4</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("5")}>
          <Text style={styles.lightButtonText}>5</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("6")}>
          <Text style={styles.lightButtonText}>6</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.blueButton, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("-")}>
          <Text style={styles.lightButtonText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* Row 4 */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("1")}>
          <Text style={styles.lightButtonText}>1</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("2")}>
          <Text style={styles.lightButtonText}>2</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("3")}>
          <Text style={styles.lightButtonText}>3</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.blueButton, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("+")}>
          <Text style={styles.lightButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Row 5 */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => switchMode()}>
          <Text style={styles.lightButtonText}>{calcMode === true? "Sci": "Bas"}</Text> {/* to change from scientific to basic */}
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("0")}>
          <Text style={styles.lightButtonText}>0</Text>
        </TouchableOpacity>


        <TouchableOpacity style={[styles.button, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed(".")}>
          <Text style={styles.lightButtonText}>.</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.button, styles.blueButton, !calcMode ? { height: buttonHeight } : null]} onPress={() => buttonPressed("=")}>
          <Text style={styles.lightButtonText}>=</Text>
        </TouchableOpacity>
      </View>
    

  </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'flex-end',
  backgroundColor: 'black',
  paddingBottom: 10,
},
resultsContainer: {
  backgroundColor: 'black',
  padding: 40,
},
resultText: {
  color: 'white',
  textAlign: 'right',
  fontSize: 64,
},  
row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginHorizontal: 10,
  marginBottom: 10,
},
button: {
  backgroundColor: '#3b3b3b',
  width: buttonWidth,
  height: buttonWidth,
  borderRadius: buttonWidth/2,
  justifyContent: 'center',
  alignItems: 'center',
},
lightButton: {
  backgroundColor: '#eeeeee',
},
blueButton: {
  backgroundColor: '#2476ff',
},
bigButton: {
  backgroundColor: '#3b3b3b',
  width: buttonWidth*2,
  height: buttonWidth,
  borderRadius: buttonWidth/2,
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingLeft: 38,
  marginLeft: 2,
},
buttonText: {
  fontSize: 30,
},
lightButtonText: {
  fontSize: 30,
  color: 'white',
},
sciButton: {
  backgroundColor: "orange",
},
});
