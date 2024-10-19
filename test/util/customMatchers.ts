import {Atom, AtomValue} from '../../src/lang/Atom';
import {Lexeme} from '../../src/interpreter/lexer/Lexeme';
import {ConsCell} from '../../src/lang/ConsCell';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace jest {
    interface Matchers<R> {
      atomMatches(expected: Atom): R;
      atomValueMatches(expected: AtomValue): R;
      lexemeMatches(expected: Lexeme): R;
      consCellValueMatches(car: AtomValue, cdr: AtomValue): R;
    }
  }
}

expect.extend({
  atomMatches(received: Atom, expected: Atom) {
    const pass = received.equals(expected);
    if (pass) {
      return {
        message: () =>
          `expected ${received.toString()} not to equal ${expected.toString()}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received.toString()} to equal ${expected.toString()}`,
        pass: false,
      };
    }
  },
  atomValueMatches(received: Atom, expected: AtomValue) {
    const pass = received.value === expected;
    if (pass) {
      return {
        message: () =>
          `expected ${received.toString()} not to equal ${expected?.toString()}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received.toString()} to equal ${expected?.toString()}`,
        pass: false,
      };
    }
  },
  lexemeMatches(received: Lexeme, expected: Lexeme) {
    const pass = received.equals(expected);
    if (pass) {
      return {
        message: () =>
          `expected ${received.toString()} not to equal ${expected.toString()}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received.toString()} to equal ${expected.toString()}`,
        pass: false,
      };
    }
  },
  consCellValueMatches(received: ConsCell, car: AtomValue, cdr: AtomValue) {
    const pass =
      received.isDottedPair() &&
      received.car instanceof Atom &&
      received.car.value === car &&
      received.cdr instanceof Atom &&
      received.cdr.value === cdr;

    if (pass) {
      return {
        message: () =>
          `expected ${received.toString()} not to equal (${car} . ${cdr})`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${received.toString()} to equal (${car} . ${cdr})`,
        pass: false,
      };
    }
  },
});
