import {Lexeme, LexemeType} from './Lexeme';

export default class Lexer {
  public lex(input: string): Lexeme[] {
    const wordList = this.convertStringToSpacedWords(input);
    return wordList.map((word: string) => {
      return this.convertWordToLexeme(word);
    });
  }

  /**
   * Essentially, this function takes a string and converts it into an array of words. In this context, a word is
   * basically any string that is seperated by a space. This function also takes into account parentheses and quotes.
   */
  private convertStringToSpacedWords(input: string): string[] {
    const regex = /"[^"]*"|\(|\)|[^\s()]+/g;
    return input.match(regex) || [];
  }

  /**
   * Convert our words into lexemes. A lexeme is essentially a word with a type. The type is determined by the
   * word contents.
   */
  private convertWordToLexeme(input: string): Lexeme {
    if (input === '(') {
      return new Lexeme(input, LexemeType.LPAREN);
    } else if (input === ')') {
      return new Lexeme(input, LexemeType.RPAREN);
    } else if (!isNaN(Number(input))) {
      return new Lexeme(input, LexemeType.NUMBER);
    } else if (input === 'true' || input === 'false') {
      return new Lexeme(input, LexemeType.BOOLEAN);
    } else if (input.startsWith('"') && input.endsWith('"')) {
      return new Lexeme(input, LexemeType.STRING);
    } else if (input === "'") {
      return new Lexeme(input, LexemeType.QUOTE);
    } else if (input === '.') {
      return new Lexeme(input, LexemeType.DOT);
    } else {
      return new Lexeme(input, LexemeType.SYMBOL);
    }
  }
}
