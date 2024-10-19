import Parser from '../../../src/interpreter/parser/Parser';
import Lexer from '../../../src/interpreter/lexer/Lexer';

describe('Parser', () => {
  const lexer = new Lexer();
  const parser = new Parser();

  it('should parse a single atom', () => {
    const lexemes = lexer.lex('5');
    const result = parser.parse(lexemes);
    expect(result.toString()).toBe('5');
  });

  it('should parse a single cons cell', () => {
    const lexemes = lexer.lex('(5)');
    const result = parser.parse(lexemes);
    expect(result.toString()).toBe('(5 . nil)');
  });

  it('should parse a proper list', () => {
    const lexemes = lexer.lex('(1 2 3)');
    const result = parser.parse(lexemes);
    expect(result.toString()).toBe('(1 2 3)');
  });

  it('should parse an improper list', () => {
    const lexemes = lexer.lex('(1 2 . 3)');
    const result = parser.parse(lexemes);
    expect(result.toString()).toBe('(1 2 . 3)');
  });

  it('should parse a nested list', () => {
    const lexemes = lexer.lex('(1 (2 3) 4)');
    const result = parser.parse(lexemes);
    expect(result.toString()).toBe('(1 (2 3) 4)');
  });

  it('should parse a dotted pair', () => {
    const lexemes = lexer.lex('(1 . 2)');
    const result = parser.parse(lexemes);
    expect(result.toString()).toBe('(1 . 2)');
  });

  it('should parse a list with a dotted pair', () => {
    const lexemes = lexer.lex('(1 2 . 3)');
    const result = parser.parse(lexemes);
    expect(result.toString()).toBe('(1 2 . 3)');
  });
});
