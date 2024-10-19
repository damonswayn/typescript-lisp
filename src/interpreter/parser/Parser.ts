import {Lexeme, LexemeType} from '../lexer/Lexeme';
import {ConsCell, Datum} from '../../lang/ConsCell';
import {makeAtom} from '../../lang/Atom';

/**
 * The parser is responsible for taking a list of lexemes and converting them into our
 * language constructs (atoms and cons cells).
 */
export default class Parser {
  public parse(lexemes: Lexeme[]): Datum {
    // early escape if there are no lexemes
    if (lexemes.length === 0) {
      throw new Error('Unexpected end of input');
    }

    // account for the case where the input is an empty list
    if (
      lexemes.length === 2 &&
      lexemes[0].type === LexemeType.LPAREN &&
      lexemes[1].type === LexemeType.RPAREN
    ) {
      return new ConsCell(makeAtom(null), makeAtom(null));
    }

    const lexeme = lexemes.shift()!;
    if (lexeme.type === LexemeType.LPAREN) {
      return this.parseList(lexemes);
    } else if (lexeme.type === LexemeType.RPAREN) {
      throw new Error('Unexpected )');
    } else {
      return makeAtom(lexeme.value);
    }
  }

  private parseList(lexemes: Lexeme[]): ConsCell {
    if (lexemes.length === 0) {
      throw new Error('Unexpected end of input');
    }

    const car = this.parse(lexemes);
    if (lexemes.length === 0) {
      throw new Error('Unexpected end of input');
    }

    const nextLexeme = lexemes[0];
    if (nextLexeme.type === LexemeType.RPAREN) {
      lexemes.shift(); // consume the RPAREN
      return new ConsCell(car, makeAtom(null));
    } else {
      const cdr = this.parseList(lexemes);
      return new ConsCell(car, cdr);
    }
  }
}
