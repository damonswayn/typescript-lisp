import Lexer from '../../src/interpreter/lexer/Lexer';
import Interpreter from '../../src/interpreter/Interpreter';
import Parser from '../../src/interpreter/parser/Parser';

describe('Interpreter', () => {
  const lexer = new Lexer();
  const parser = new Parser();
  const interpreter = new Interpreter(lexer, parser);

  it('should be valid', () => {
    expect(interpreter.isValid('(+ 1 2)')).toBe(true);
  });

  it('should be invalid', () => {
    expect(interpreter.isValid('(+ 1 2')).toBe(false);
  });
});
