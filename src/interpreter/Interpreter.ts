import Lexer from './lexer/Lexer';
import Parser from './parser/Parser';
import Frame from './env/Frame';
import {Evaluator} from './evaluator/Evaluator';

/**
 * The Interpreter class is responsible for interpreting the input string and returning the result. It is more
 * or less an orchestrator class that uses the Lexer, Parser, and Evaluator classes to tokenize, parse, and evaluate.
 */
export default class Interpreter {
  private lexer: Lexer;
  private parser: Parser;
  private readonly rootFrame: Frame;

  constructor(lexer: Lexer, parser: Parser) {
    this.lexer = lexer;
    this.parser = parser;
    this.rootFrame = new Frame();
  }

  /**
   * This method is more or less the public interface that should be used for the language.
   */
  public interpret(input: string): string {
    if (this.isValid(input)) {
      const lexemes = this.lexer.lex(input);
      const consCell = this.parser.parse(lexemes);
      const evaluator = new Evaluator(this.rootFrame);
      const evaluationResult = evaluator.eval(consCell);
      return evaluationResult.toString();
    } else {
      throw new Error('Invalid input');
    }
  }

  /**
   * This method checks if the input string has balanced parentheses. While this is not a perfect check, it is
   * effective enough for the purposes of this project.
   */
  public isValid(input: string): boolean {
    let parenCount = 0;

    input.split('').forEach(char => {
      if (char === '(') {
        parenCount++;
      } else if (char === ')') {
        parenCount--;
      }
    });

    return parenCount === 0;
  }
}
