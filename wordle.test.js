import findLetters from "./wordle";
import { describe, expect, it } from '@jest/globals';


// för att köra ett första, enkelt test:
describe('findLetters()', () => {
    it('has two parameters', () => {
        expect(findLetters.length).toBe(2);
    })

// Först ut ska det funka att få correct som svar
    it('should return correct when the letters match at the same index', () => {
        const output = findLetters('cykla', 'cykla');
        expect(output).toEqual([
          { letter: 'C', result: 'correct' },
          { letter: 'Y', result: 'correct' },
          { letter: 'K', result: 'correct' },
          { letter: 'L', result: 'correct' },
          { letter: 'A', result: 'correct' }
        ]);
      });

      // om det finns en bokstav som finns i ordet men är på fel plats så ska den få misplaced som resultat
      it('should return misplaced if a letter exists in the word but in wrong place', () => {
        const output = findLetters('hallå', 'cykla');
        expect(output).toEqual([
          { letter: 'H', result: 'incorrect' },
          { letter: 'A', result: 'misplaced' },
          { letter: 'L', result: 'incorrect' },
          { letter: 'L', result: 'correct' },
          { letter: 'Å', result: 'incorrect' }
        ]);
      });

      //om det finns fler än en av samma bokstav och en redan är på rätt plats så ska alla andra bli incorrect
      it('returns incorrect if there is multiple of the same letter', () => {
        const output = findLetters('banana', 'taru');
        expect(output).toEqual([
          { letter: 'B', result: 'incorrect' },
          { letter: 'A', result: 'correct' },
          { letter: 'N', result: 'incorrect' },
          { letter: 'A', result: 'incorrect' },
          { letter: 'N', result: 'incorrect' },
          { letter: 'A', result: 'incorrect' }
        ]);

        console.log(output);
      });
    });