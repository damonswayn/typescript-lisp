import Lexer from '../../../src/interpreter/lexer/Lexer';
import {Lexeme, LexemeType} from '../../../src/interpreter/lexer/Lexeme';

describe('Lexer', () => {
  const lexer = new Lexer();

  it('should tokenize a simple expression', () => {
    const tokenList = lexer.lex('(+ 1 2)');
    expect(tokenList).toEqual([
      new Lexeme('(', LexemeType.LPAREN),
      new Lexeme('+', LexemeType.SYMBOL),
      new Lexeme('1', LexemeType.NUMBER),
      new Lexeme('2', LexemeType.NUMBER),
      new Lexeme(')', LexemeType.RPAREN),
    ]);
  });

  it('should tokenize a complex expression', () => {
    const tokenList = lexer.lex('(+ 1 2 (- 3 4))');
    expect(tokenList).toEqual([
      new Lexeme('(', LexemeType.LPAREN),
      new Lexeme('+', LexemeType.SYMBOL),
      new Lexeme('1', LexemeType.NUMBER),
      new Lexeme('2', LexemeType.NUMBER),
      new Lexeme('(', LexemeType.LPAREN),
      new Lexeme('-', LexemeType.SYMBOL),
      new Lexeme('3', LexemeType.NUMBER),
      new Lexeme('4', LexemeType.NUMBER),
      new Lexeme(')', LexemeType.RPAREN),
      new Lexeme(')', LexemeType.RPAREN),
    ]);
  });

  it('should tokenize a quoted expression', () => {
    const tokenList = lexer.lex("'(+ 1 2)");
    expect(tokenList).toEqual([
      new Lexeme("'", LexemeType.QUOTE),
      new Lexeme('(', LexemeType.LPAREN),
      new Lexeme('+', LexemeType.SYMBOL),
      new Lexeme('1', LexemeType.NUMBER),
      new Lexeme('2', LexemeType.NUMBER),
      new Lexeme(')', LexemeType.RPAREN),
    ]);
  });

  it('should tokenize a dotted pair', () => {
    const tokenList = lexer.lex('(1 . 2)');
    expect(tokenList).toEqual([
      new Lexeme('(', LexemeType.LPAREN),
      new Lexeme('1', LexemeType.NUMBER),
      new Lexeme('.', LexemeType.DOT),
      new Lexeme('2', LexemeType.NUMBER),
      new Lexeme(')', LexemeType.RPAREN),
    ]);
  });

  it('should tokenize a string', () => {
    const tokenList = lexer.lex('"hello"');
    expect(tokenList).toEqual([new Lexeme('"hello"', LexemeType.STRING)]);
  });
});
