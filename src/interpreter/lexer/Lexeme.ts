export enum LexemeType {
  NUMBER = 'number',
  STRING = 'string',
  BOOLEAN = 'boolean',
  SYMBOL = 'symbol',
  LPAREN = 'lparen',
  RPAREN = 'rparen',
  QUOTE = 'quote',
  DOT = 'dot',
  EOF = 'eof',
}

/**
 * A lexeme is a word with a type. The type is determined by the word contents.
 */
export class Lexeme {
  constructor(
    public value: string,
    public type: LexemeType,
  ) {}

  public toString(): string {
    return `Lexeme(${this.type}, ${this.value})`;
  }

  public equals(lexeme: Lexeme): boolean {
    return this.value === lexeme.value && this.type === lexeme.type;
  }
}
