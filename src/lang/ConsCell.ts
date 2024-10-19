/* eslint-disable @typescript-eslint/no-this-alias */
import {Atom} from './Atom';

export type Datum = Atom | ConsCell;
export type List = ConsCell | null;

/**
 * a cons cell is just a fancy name for a linked list node. The magic comes from the fact that the cdr can be either
 * another cons cell or an atom. This allows us to represent both proper and improper lists.
 *
 * Essentially, a cons cell that is an atom (value) and a cons cell (next) forms a linked list, which is how we
 * represent lists in our language.
 */
export class ConsCell {
  constructor(
    public car: Datum,
    public cdr: Datum | null = null,
  ) {}

  /**
   * iterates through the cons cell and all of its cdrs to determine if the cons cell is a proper list. A proper list
   * is essentially just a linked list of cons cells where the cdr of the last cons cell is null, or is a nil atom.
   */
  public isProperList(): boolean {
    let current: List = this;

    while (current !== null) {
      if (current.cdr instanceof ConsCell) {
        current = current.cdr;
      } else {
        return current.cdr === null || current.cdr.isNil();
      }
    }

    return false;
  }

  /**
   * returns true if the cons cell has a cdr that is not a cons cell. This is the case when the cdr is an atom.
   */
  public isImproperList(): boolean {
    let current: List = this;

    while (current !== null) {
      if (current.cdr instanceof ConsCell) {
        current = current.cdr;
      } else {
        return current.cdr !== null;
      }
    }

    return false;
  }

  /**
   * returns true if the cons cell has a car that is an atom and a cdr that is an atom.
   */
  public isDottedPair(): boolean {
    return this.car instanceof Atom && this.cdr instanceof Atom;
  }

  /**
   * returns true if the cons cell has a cdr that is a cons cell. Because the cdr can be an atom, we need to check
   * that if it is an atom, it is not a nil atom.
   */
  public hasNext(): boolean {
    const cdrIsNotNaturalNull = this.cdr !== null;
    const cdrIsAtom = this.cdr instanceof Atom;
    const atomIsNull = cdrIsAtom && (this.cdr as Atom).isNil();
    const cdrIsConsCell = this.cdr instanceof ConsCell;
    return cdrIsNotNaturalNull && !atomIsNull && cdrIsConsCell;
  }

  public toString(): string {
    if (this.cdr === null) {
      // in this case, we have a cons cell which is actually just an atom.
      return `(${this.car.toString()})`;
    } else if (this.cdr instanceof Atom) {
      // in this case, we have a cons cell which is a dotted pair of atoms.
      return `(${this.car.toString()} . ${this.cdr.toString()})`;
    } else if (this.isProperList()) {
      // in this case, we have a proper list.
      let current: ConsCell = this;
      let output = `(${current.car.toString()}`;

      while (current.hasNext()) {
        current = current.cdr as ConsCell;
        output += ` ${current.car.toString()}`;
      }

      return `${output})`;
    } else {
      // in this case, we have an improper list.
      return `(${this.car.toString()} ${this.cdr.toString()})`;
    }
  }
}
