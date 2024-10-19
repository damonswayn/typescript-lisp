import Lexer from '../../../src/interpreter/lexer/Lexer';
import Parser from '../../../src/interpreter/parser/Parser';
import Frame from '../../../src/interpreter/env/Frame';
import {Evaluator} from '../../../src/interpreter/evaluator/Evaluator';
import {makeAtom} from '../../../src/lang/Atom';

describe('Evaluator', () => {
  const lexer = new Lexer();
  const parser = new Parser();
  const rootFrame = new Frame();
  const evaluator = new Evaluator(rootFrame);

  it('should evaluate atom', () => {
    const input = '5';
    const lexemes = lexer.lex(input);
    const consCell = parser.parse(lexemes);
    const result = evaluator.eval(consCell);
    expect(result).atomValueMatches(5);
  });

  it('should evaluate empty expression', () => {
    const input = '()';
    const lexemes = lexer.lex(input);
    const consCell = parser.parse(lexemes);
    const result = evaluator.eval(consCell);
    expect(result).atomValueMatches(null);
  });

  it('should evaluate simple expression', () => {
    const input = '(+ 1 2)';
    const lexemes = lexer.lex(input);
    const consCell = parser.parse(lexemes);
    const result = evaluator.eval(consCell);
    expect(result).atomValueMatches(3);
  });

  it('should define a variable', () => {
    const input = '(define x 5)';
    const lexemes = lexer.lex(input);
    const consCell = parser.parse(lexemes);
    const result = evaluator.eval(consCell);
    expect(result).atomValueMatches(5);
    expect(rootFrame.lookup('x')).atomValueMatches(5);
  });

  it('should use a variable in a simple expression', () => {
    const input = '(+ x 2)';
    rootFrame.define('x', makeAtom(5));
    const lexemes = lexer.lex(input);
    const consCell = parser.parse(lexemes);
    const result = evaluator.eval(consCell);
    expect(result).atomValueMatches(7);
  });

  it('should use a variable in a nested expression', () => {
    const input = '(+ x (+ x 2))';
    rootFrame.define('x', makeAtom(5));
    const lexemes = lexer.lex(input);
    const consCell = parser.parse(lexemes);
    const result = evaluator.eval(consCell);
    expect(result).atomValueMatches(12);
  });

  it('should correctly evaluate a nested expression', () => {
    const input = '(* 2 (+ 1 2))';
    const lexemes = lexer.lex(input);
    const consCell = parser.parse(lexemes);
    const result = evaluator.eval(consCell);
    expect(result).atomValueMatches(6);
  });

  it('should correctly evaluate a cons function', () => {
    const input = '(cons 1 2)';
    const lexemes = lexer.lex(input);
    const consCell = parser.parse(lexemes);
    const result = evaluator.eval(consCell);
    expect(result).consCellValueMatches(1, 2);
  });
});
