import findLetters from "./wordle";
import { describe, expect, it } from '@jest/globals';


// för att köra ett första, enkelt test:
describe('feedback()', () => {
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

   
      // eftersom att det fungerar att få correct som svar ska jag nu testa att det fungerar att få incorrect.
      it('should return incorrect when the letters dont match at the same index', () => {
        const output = findLetters('cycla', 'cykla');
        expect(output).toEqual([
          { letter: 'C', result: 'correct' },
          { letter: 'Y', result: 'correct' },
          { letter: 'C', result: 'incorrect' },
          { letter: 'L', result: 'correct' },
          { letter: 'A', result: 'correct' }
        ]);
      });


      /* Den ska även kunna visa när en bokstav är på fel plats */
      it('should return misplaced if a letter exists in the answer word but is not in right index and incorrect if it already exists same letter', () => {
        const output = findLetters('ckyll', 'cykla');
        expect(output).toEqual([
          { letter: 'C', result: 'correct' },
          { letter: 'K', result: 'misplaced' },
          { letter: 'Y', result: 'misplaced' },
          { letter: 'L', result: 'correct' },
          { letter: 'L', result: 'incorrect' }
        ]);
      });
    });