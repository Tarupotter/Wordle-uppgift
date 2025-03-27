/* Jag har  valt att börja om helt från början för att det jag gjorde först var inte heltäckande. 
    jag vill loopa igenom gissningen för att jämföra den med svarsordet, men först måste jag separera alla bokstäver så jag 
    kan jämföra indexplats mot indexplats och säger att orden alltid ska vara i uppercase.
    
Exempel på hur det ska se ut:

 C - H  = INCORRECT
 Y - A  = MISPLACED
 K - L  = INCORRECT
 L - L  = CORRECT
 A - Å  = INCORRECT
 
 OM BOKSTAVEN ÄR RÄTT SKA DEN FÅ CORRECT
 OM BOKSTAVEN INTE STÄMMER SKA DEN FÅ INCORRECT
 OM DEN ÄR FELPLACERAD SKA DEN FÅ MISPLACED
*/


 export default function feedback(guess, answer) {
  const guessedWord = guess.toUpperCase().split("");
  const correctWord = answer.toUpperCase().split("");
  
  
  const result = [];
  
 
  guessedWord.forEach((letter, i) => {
    if (letter === correctWord[i]) {
      result.push({ letter: letter, result: "correct" });
      correctWord[i] = null; 
    } else {
      result.push({ letter: letter, result: "incorrect" });
    }
  });

  
  result.forEach((item, i) => {
    if (item.result === "incorrect") {
      
      if (correctWord.includes(guessedWord[i])) {
       
        item.result = "misplaced";
        correctWord[correctWord.indexOf(guessedWord[i])] = null; 
      }
    }
  });
  
  return result;
}
