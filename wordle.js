export default function findLetters(guess, answer) {
    
    const guessedWord = guess.toUpperCase().split(''); 
    const answerWord = answer.toUpperCase().split(''); 

    const result = [];

    
    guessedWord.forEach((letter, index) => {
        if (letter === answerWord[index]) {
            result.push({ letter, result: 'correct' });
        } else {
            result.push({ letter, result: 'incorrect' });
        }
    });

    guessedWord.forEach((letter, index) => {
        if (result[index].result === 'incorrect') {
           
            const letterInAnswer = answerWord.filter(l => l === letter).length;
            const letterInResult = result.filter(r => r.letter === letter && r.result === 'correct').length;

            if (letterInAnswer > letterInResult) {
                result[index].result = 'misplaced';
            }
        }
    });


 return result;
}
