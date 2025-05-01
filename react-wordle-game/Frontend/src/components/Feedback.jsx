export default function feedback(guess, answer) {
    const guessArr = guess.toUpperCase().split("");
    const answerArr = answer.toUpperCase().split("");
    const result = Array(guessArr.length);
    
    // correct
    guessArr.forEach((letter, i) => {
      if (letter === answerArr[i]) {
        result[i] = { letter, result: "correct" };
        answerArr[i] = null;
      }
    });
  
    // misplaced eller incorrect
    guessArr.forEach((letter, i) => {
      if (result[i]) return; // redan correct
      const index = answerArr.indexOf(letter);
      if (index !== -1) {
        result[i] = { letter, result: "misplaced" };
        answerArr[index] = null;
      } else {
        result[i] = { letter, result: "incorrect" };
      }
    });
  
    return result;
  }
  