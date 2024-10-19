export type AtomValue = string | number | boolean | null | undefined;
export type AtomType = 'string' | 'number' | 'boolean' | 'null' | 'undefined';
export enum AtomTypes {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  NULL = 'null',
  UNDEFINED = 'undefined',
}

// convenience function for creating an Atom with type inference
export const makeAtom = (value: AtomValue): Atom => {
  return new Atom(value, Atom.inferType(value));
};

// an Atom is a simple value with a type
export class Atom {
  constructor(
    public _value: AtomValue,
    public _type: AtomType,
  ) {}

  /**
   * Returns the value of the Atom by inspecting its type and returning the value in the correct type.
   *
   * If the Atom is null, returns null. If the Atom is undefined, returns undefined.
   */
  get value(): AtomValue {
    if (this._value === null) {
      return null;
    }

    if (this._value === undefined) {
      return undefined;
    }

    if (this._type === AtomTypes.NUMBER) {
      return Number(this._value);
    }

    if (this._type === AtomTypes.BOOLEAN) {
      return this._value === 'true';
    }

    return this._value;
  }

  get type(): AtomType {
    return this._type;
  }

  /**
   * Generic hackery to allow TypeScript to infer the type of the Atom value.
   */
  public asValue<T extends AtomValue>(): T {
    return this.value as T;
  }

  /**
   * Infers the type of the Atom value by inspecting the value.
   */
  public static inferType(value: AtomValue): AtomType {
    if (value === null) {
      return 'null';
    } else if (value === undefined) {
      return 'undefined';
    } else if (value === 'true' || value === 'false') {
      return 'boolean';
    } else if (!isNaN(Number(value))) {
      return 'number';
    } else {
      return typeof value as AtomType;
    }
  }

  public isNil(): boolean {
    return this._value === null;
  }

  /**
   * Returns true if the Atom is a symbol. A symbol is a string that does not start or end with a double quote.
   */
  public isSymbol(): boolean {
    if (this._type === 'string') {
      const strValue = this._value as string;
      return (
        strValue.length > 0 &&
        !strValue.startsWith('"') &&
        !strValue.endsWith('"')
      );
    }

    return false;
  }

  public toString(): string {
    if (this._value === null) {
      return 'nil';
    } else if (this._value === undefined) {
      return 'undefined';
    } else {
      return this._value.toString();
    }
  }

  public equals(atom: Atom): boolean {
    return this._value === atom.value && this._type === atom.type;
  }
}
